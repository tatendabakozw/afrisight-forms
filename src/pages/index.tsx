import FieldSection from "@/components/field-section/FieldSection";
import FieldTypeDropdown from "@/components/field-type-dropdown/FieldTypeDropdown";
import GeneralLayout from "@/layouts/GeneralLayout";
import { PlusIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";

// Define the structure of a section
interface SectionType {
  type: {
    name: string;
    type_id: string;
  };
  value: string;
  setValue: string;
}

// Define the structure for a section in state
interface Section extends SectionType {
  id: number;
}

const all_sections: SectionType[] = [
  {
    type: {
      name: "Short Answer",
      type_id: "short-answer",
    },
    value: "",
    setValue: "",
  },
];

function Home() {
  const [sections, setSections] = useState<Section[]>([]);
  const [currentSectionType, setCurrentSectionType] =
    useState<string>("short-answer");
  const [currentSectionValue, setCurrentSectionValue] = useState<string>("");

  // Function to add a new section to the state
  const addNewSection = () => {
    const section = all_sections.find(
      (sec) => sec.type.type_id === currentSectionType
    );
    if (section) {
      setSections([
        ...sections,
        { ...section, value: currentSectionValue, id: sections.length + 1 },
      ]);
      setCurrentSectionValue(""); // Reset section value after adding
    }
  };

  const handleDeleteSection = (id: number) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  return (
    <GeneralLayout>
      <div className="flex flex-col w-full bg-zinc-100 h-full flex-1 px-4 p-8">
        <div className="max-w-2xl mx-auto w-full space-y-6">
          {sections.map((section) => (
            <FieldSection
              handleDeleteSection={() => handleDeleteSection(section.id)}
              key={section.id}
            />
          ))}

          <button
            onClick={addNewSection}
            className="bg-brand-original/20 border border-dashed w-full items-center content-center justify-center flex flex-row space-x-4 border-brand-original p-8 rounded-xl"
          >
            <PlusIcon height={20} width={20} />
            <p>Add new section</p>
          </button>
        </div>
      </div>
    </GeneralLayout>
  );
}

export default Home;
