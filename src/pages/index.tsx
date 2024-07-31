import React, { useState } from "react";
import FieldSection from "@/components/field-section/FieldSection";
import GeneralLayout from "@/layouts/GeneralLayout";
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
import { useForm } from "@/context/FormContext";

// Define the structure of a section type
interface SectionType {
  name: string;
  type_id: string;
  id: number;
  value: string;
}

const initialSectionType: SectionType = {
  name: "Short Answer",
  type_id: "short-answer",
  id: 0,
  value: "",
};

const Home: React.FC = () => {
  const {
    sections,
    addSection,
    updateSection,
    deleteSection,
    saveFormAsJSON,
    updateSectionOrder,
  } = useForm();
  const [currentSectionValue, setCurrentSectionValue] = useState<string>("");

  const addNewSection = () => {
    const newSection = {
      id: sections.length + 1,
      type: initialSectionType,
      value: currentSectionValue,
    };
    addSection(newSection);
    setCurrentSectionValue(""); // Reset section value after adding
  };

  const handleDeleteSection = (id: number) => {
    deleteSection(id);
  };

  const handleSectionTypeChange = (id: number, newType: SectionType) => {
    updateSection(id, { type: newType });
  };

  const handleSectionValueChange = (id: number, newValue: string) => {
    updateSection(id, { value: newValue });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 16,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((item) => item.id === active.id);
      const newIndex = sections.findIndex((item) => item.id === over.id);
      const newSections = arrayMove(sections, oldIndex, newIndex);
      // Updating state with new sections order
      updateSectionOrder(newSections);
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
              items={sections.map((section) => section.id)}
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
          <button
            onClick={saveFormAsJSON}
            className="bg-brand-original w-full items-center content-center justify-center flex flex-row space-x-4 p-8 rounded-xl mt-4"
          >
            <p>Save Form as JSON</p>
          </button>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default Home;
