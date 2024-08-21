import { ReactNode } from "react";

export interface FieldType {
  _id: string;
  name: string;
  required?: boolean;
  icon?: ReactNode;
}

export interface SectionItemProps {
  type: string;
  id: string;
  question: string;
  options?: any;
}
