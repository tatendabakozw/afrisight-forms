import React, { useState } from "react";
import FieldSection from "@/components/field-section/FieldSection";
import GeneralLayout from "@/layouts/GeneralLayout";
import { field_types } from "@/lib/field_types_data";
import { PlusIcon } from "@heroicons/react/20/solid";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "@/components/sortable-item/SortableItem";

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
  const [currentSectionValue, setCurrentSectionValue] = useState<string>("");

  // Function to add a new section to the state
  const addNewSection = () => {
    const section = all_sections[0];
    if (section) {
      console.log("added new sectiion");
      setSections((prevSections) => [
        ...prevSections,
        { ...section, value: currentSectionValue, id: sections.length + 1 }, // Add a unique ID and some default content
      ]);
      setCurrentSectionValue(""); // Reset section value after adding
    }
    console.log("added new sectiion");
  };

  console.log("all sections: ", sections);

  const handleDeleteSection = (id: number) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const handleSectionTypeChange = (id: number, newType: any) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, type: newType } : section
      )
    );
  };

  const handleSectionValueChange = (id: number, newValue: string) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, value: newValue } : section
      )
    );
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <GeneralLayout>
      <div className="flex flex-col w-full bg-zinc-100 h-full flex-1 px-4 p-8">
        <div className="max-w-2xl mx-auto w-full space-y-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sections.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              {sections.map((section) => (
                <SortableItem key={section.id} id={section.id}>
                  <FieldSection
                    handleDeleteSection={() => handleDeleteSection(section.id)}
                    handleSectionTypeChange={(newType: any) =>
                      handleSectionTypeChange(section.id, newType)
                    }
                    handleSectionValueChange={(newValue: string) =>
                      handleSectionValueChange(section.id, newValue)
                    }
                    sectionValue={section.value}
                  />
                </SortableItem>
              ))}
            </SortableContext>
          </DndContext>

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
