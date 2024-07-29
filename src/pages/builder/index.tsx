import GeneralLayout from "@/layouts/GeneralLayout";
import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs

function Builder() {
  const [sections, setSections] = useState<{ id: string; content: string }[]>(
    []
  );

  const addNewSection = () => {
    setSections((prevSections) => [
      ...prevSections,
      { id: uuidv4(), content: "New Section Content" }, // Add a unique ID and some default content
    ]);
  };

  return (
    <GeneralLayout>
      <div className="flex flex-col w-full bg-zinc-100 h-full flex-1 px-4 p-8">
        <div className="max-w-2xl mx-auto w-full space-y-6">
          {sections.map((item) => (
            <div key={item.id} className="flex">
              {item.content}
            </div>
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

export default Builder;
