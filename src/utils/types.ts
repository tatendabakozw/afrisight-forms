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

export type TSectionType = {
  name: string;
  id: string;
  _id?: string;
  type?: string;
};

export interface SectionType {
  id: number;
  options: Array<{ name: string; id: string }>;
  value: string;
  type: TSectionType;
}

export interface DocumentType {
  description: string;
  name: string;
  sections: Array<Section>;
}

export interface FormType {
  id: string;
  form: DocumentType;
}

export interface User {
  _id: string;
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

export interface Option {
  id: string;
  name: string;
}

export interface Section {
  id: number;
  options: Option[];
  type: SectionType;
  value: string;
}

export interface Form {
  _id: string;
  id: string;
  description: string;
  name: string;
  sections: Section[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface FormInput {
  description: string;
  name: string;
  sections: Omit<Section, "id">[];
}

export interface FormUpdateInput {
  description?: string;
  name?: string;
  sections?: Omit<Section, "id">[];
}

export interface FormResponse {
  form: Form;
  message?: string;
}

export interface FormsListResponse {
  forms: Form[];
  total: number;
  page: number;
  limit: number;
}
