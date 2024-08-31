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
import { apiUrl, AUTH_ROUTES } from "../utils/apiUrl";
import { User } from "@/utils/types";
import crypto from "crypto";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Organization = {
  id: string;
  name: string;
}

type EntityMetadata = {
  org_id: string;
  user_id: string;
  invited_by: string | null;
}

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
    const response = await axios.post(`${apiUrl}${AUTH_ROUTES.LOGIN}`, {
      email: username,
      password,
    });
    const { accessToken, refreshToken, ...userInfo } = response.data;

    if (userInfo.role === "CLIENT") {
      setUser(userInfo)
      localStorage.setItem("access_token", accessToken)
      localStorage.setItem("refresh_token", refreshToken)
      router.push("/forms");
    } else {
      throw new Error("You are not a CLIENT")
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
    const response = await axios.post(`${apiUrl}${AUTH_ROUTES.CREATE_USER}`, {
      username,
      password,
      confirm_password, // Include confirm_password in the API request
      email,
      role: "CLIENT"
    });

    const { accessToken, refreshToken, ...userInfo } = response.data;
    localStorage.setItem("access_token", accessToken)
    localStorage.setItem("refresh_token", refreshToken)
    Cookies.set("token", response.data.accessToken, { expires: 1 });
    setUser(userInfo);
    router.push("/forms");
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
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


const createOrganization = () => {
  const org: Organization = {
    id: crypto.randomBytes(16).toString("hex"),
    name: "My Organization",
  }

  return org;
}