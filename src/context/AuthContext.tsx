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
        .catch(() => {
          Cookies.remove("token");
        });
    }
  }, []);

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const response = await axios.post(`${apiUrl}/auth/login`, {
      username,
      password,
    });
    Cookies.set("token", response.data.token, { expires: 1 });
    setUser(response.data.user);
    router.push("/builder");
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
    const response = await axios.post(`${apiUrl}/auth/register`, {
      username,
      password,
      confirm_password, // Include confirm_password in the API request
      email,
    });
    Cookies.set("token", response.data.token, { expires: 1 });
    setUser(response.data.user);
    router.push("/builder");
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
