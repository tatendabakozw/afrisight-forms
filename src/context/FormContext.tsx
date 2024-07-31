import React, { createContext, useContext, useState, ReactNode } from "react";

interface SectionType {
  name: string;
  type_id: string;
}

interface Section {
  id: number;
  type: SectionType;
  value: string;
}

interface FormContextProps {
  sections: Section[];
  addSection: (section: Section) => void;
  updateSection: (id: number, newValue: Partial<Section>) => void;
  deleteSection: (id: number) => void;
  saveFormAsJSON: () => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sections, setSections] = useState<Section[]>([]);

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

  const saveFormAsJSON = () => {
    const formJSON = JSON.stringify(sections, null, 2);
    console.log("Form JSON:", formJSON);
  };

  return (
    <FormContext.Provider
      value={{
        sections,
        addSection,
        updateSection,
        deleteSection,
        saveFormAsJSON,
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
