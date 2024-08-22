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
    const response = await axios.post(`${apiUrl}/auth/login`, {
      username,
      password,
    });
    Cookies.set("token", response.data.token, { expires: 1 });
    console.log(response.data.user._id)
    const userDoc = await getDoc(doc(db, "users", response.data.user._id));
    if (!userDoc.exists()) {
      const org = createOrganization();
      const metaData: EntityMetadata = {
        org_id: org.id,
        user_id: response.data.user._id,
        invited_by: null,
      }
      const orgDoc = doc(db, "organizations", org.id)
      setDoc(orgDoc, org);
      setDoc(doc(db, "users", response.data.user._id), { ...response.data.user, ...metaData });
      setUser({ ...response.data.user, ...metaData });
    } else {
      setUser({ ...response.data.user, ...userDoc.data() });
    }
    router.push("/forms");
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

    const org = createOrganization();
    const metaData: EntityMetadata = {
      org_id: org.id,
      user_id: response.data.user._id,
      invited_by: null,
    }

    const orgDoc = doc(db, "organizations", org.id)
    await setDoc(orgDoc, org);

    const userDoc = doc(db, "users", response.data.user._id)
    await setDoc(userDoc, { ...response.data.user, ...metaData });

    setUser({
      ...response.data.user,
      ...metaData
    });
    router.push("/forms");
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


const createOrganization = () => {
  const org: Organization = {
    id: crypto.randomBytes(16).toString("hex"),
    name: "My Organization",
  }

  return org;
}