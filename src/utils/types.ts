export interface UserInfoTypes {
  id: number;
  username: string;
  email: string;
  otp: string | null;
  profilePic: string | null;
  name: string | null;
  role: "ADMIN" | "USER";
  createdAt: string;
  updatedAt: string;
  iat: number | null;
  exp: number | null;
}

export interface DashboardItemProps {
  link: string;
  name: string;
  createdAt: string;
  branch: string;
  status: string;
  Icon?: any;
  _id?: string | number;
  count: number;
}

export interface SectionType {
  id: number;
  options: Array<{ name: string; _id: string }>;
  type: {
    name: string;
    _id: string;
  };
  value: string;
}

export interface DocumentType {
  description: string;
  name: string;
  sections: Array<SectionType>;
}

export interface FormType {
  id: string;
  form: DocumentType;
}

export interface User {
  id: string;
  email: string;
  username: string;
  iat: number | null;
  exp: number | null;
}

// Enum for price type
enum PriceType {
  CASH = "CASH",
  VOUCHER = "VOUCHER", // Add other possible values here
  OTHER = "OTHER",
}
export interface GigType {
  _id: string;
  name: string;
  price?: string;
  difficult: string;
  desc: string;
  category?: string;
  image?: string;
  surveyLink?: string;
  location?: string;
  age?: number;
  priceType: PriceType;
  duration?: string;
  createdAt: Date;
  updatedAt?: Date;
  userGigs: string; // Assuming userGigs references another model
}
