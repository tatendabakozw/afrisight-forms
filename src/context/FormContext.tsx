import React, { createContext, useContext, useState, ReactNode } from "react";
import crypto from "crypto";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Form, Section } from "@/utils/types";


export type SectionKey = "short-answer" | "date" | "multiple-choice" | "file-upload" | "text-area" | "paragraph" | "rating";

interface Option {
  name: string;
  _id: string;
}

interface SectionType {
  name: string;
  type_id: string;
}



interface FormContextProps {
  sections: Section[];
  formName: string;
  formDescription: string;
  addSection: (section: Section) => void;
  updateSection: (id: number, newValue: Partial<Section>) => void;
  deleteSection: (id: number) => void;
  stringifyForm: () => void;
  updateSectionOrder: (newSections: Section[]) => void;
  setFormName: (name: string) => void;
  setFormDescription: (name: string) => void;
  hydrateForm: (form: Form) => void
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [formName, setFormName] = useState<string>("");
  const [formDescription, setFormDescription] = useState<string>("");


  const hydrateForm = (form: Form) => {
    setFormName(form.name);
    setFormDescription(form.description);
    setSections(form.sections);
  }

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
        formDescription,
        addSection,
        updateSection,
        deleteSection,
        stringifyForm: saveFormAsJSON,
        updateSectionOrder,
        setFormName,
        setFormDescription,
        hydrateForm
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

export const saveItem = async ({
  formName,
  formDescription,
  sections,
  user,
}: {
  formName: string;
  formDescription: string;
  sections: Section[];
  user: any;
}) => {
  const uniqueId = crypto.randomBytes(16).toString("hex");

  const createdForm = {
    name: formName,
    description: formDescription,
    sections,
    _id: user?._id || "", // Include the user ID
  };
  // remove the Icon in every 1 of createdForm.sections[i].type
  createdForm.sections = createdForm.sections.map((section) => {
    const newSection = { ...section };
    // @ts-ignore
    delete newSection.type.Icon;
    return newSection;
  });


  await setDoc(doc(db, "forms", uniqueId), { ...createdForm });

};