export interface FieldType {
  _id: string;
  name: string;
}

export interface SectionItemProps {
  type: string;
  id: string;
  question: string;
  options?: any;
}
