import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { apiUrl } from "../utils/apiUrl";
import { User } from "@/utils/types";

interface AuthContextType {
  user: User | null;
  login: (props: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  register: (props: {
    username: string;
    password: string;
    confirm_password: string;
    email: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      axios
        .get(`${apiUrl}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          logout(); // Automatically log out if the token is invalid
        });
    }

    // Axios interceptor to handle automatic logout on 401 errors
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout(); // Log out if the server returns 401 Unauthorized
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        username,
        password,
      });
      Cookies.set("token", response.data.token, { expires: 1 });
      setUser(response.data.user);
      router.push("/forms");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login errors (e.g., invalid credentials)
    }
  };

  const register = async ({
    username,
    password,
    confirm_password,
    email,
  }: {
    username: string;
    password: string;
    confirm_password: string;
    email: string;
  }) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, {
        username,
        password,
        confirm_password,
        email,
      });
      Cookies.set("token", response.data.token, { expires: 5 });
      setUser(response.data.user);
      router.push("/forms");
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration errors (e.g., validation issues)
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
