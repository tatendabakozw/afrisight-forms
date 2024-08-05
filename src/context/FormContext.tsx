import React, { createContext, useContext, useState, ReactNode } from "react";

interface SectionType {
  name: string;
  type_id: string;
}

interface Section {
  id: any;
  type: SectionType;
  value: string;
}

interface FormContextProps {
  sections: Section[];
  formName: string;
  formDescription: string;
  addSection: (section: Section) => void;
  updateSection: (id: number, newValue: Partial<Section>) => void;
  deleteSection: (id: number) => void;
  saveFormAsJSON: () => void;
  updateSectionOrder: (newSections: Section[]) => void;
  setFormName: (name: string) => void;
  setFormDescription: (name: string) => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [formName, setFormName] = useState<string>("");
  const [formDescription, setFormDescription] = useState<string>("");

  const addSection = (section: Section) => {
    setSections((prevSections) => [...prevSections, section]);
  };

  const updateSection = (id: number, newValue: Partial<Section>) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, ...newValue } : section
      )
    );
  };

  const deleteSection = (id: number) => {
    setSections((prevSections) =>
      prevSections.filter((section) => section.id !== id)
    );
  };

  const saveFormAsJSON = async () => {
    const formJSON = JSON.stringify({ formName, sections }, null, 2);
    console.log("Form JSON:", formJSON);
  };

  const updateSectionOrder = (newSections: Section[]) => {
    setSections(newSections);
  };

  return (
    <FormContext.Provider
      value={{
        sections,
        formName,
        addSection,
        updateSection,
        deleteSection,
        saveFormAsJSON,
        updateSectionOrder,
        setFormName,
        formDescription,
        setFormDescription,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};
