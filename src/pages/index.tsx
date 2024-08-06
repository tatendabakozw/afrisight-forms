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
import { Option } from "@/components/inputs/MultipeChoice";

// Define the structure of a section type
interface SectionType {
  name: string;
  type_id: string;
}

interface Section {
  id: number;
  type: SectionType;
  value: string;
  options: Option[];
}

const initialSectionType: SectionType = {
  name: "Short Answer",
  type_id: "short-answer",
};

const initialOptions: Option[] = [];

const Home: React.FC = () => {
  const {
    sections,
    addSection,
    updateSection,
    deleteSection,
    formName,
    formDescription,
    setFormName,
    setFormDescription,
    updateSectionOrder,
  } = useForm();
  const [currentSectionValue, setCurrentSectionValue] = useState<string>("");

  const addNewSection = () => {
    const newSection: Section = {
      id: sections.length + 1,
      type: initialSectionType,
      value: currentSectionValue,
      options: initialOptions,
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

  const handleOptionsChange = (id: number, newOptions: Option[]) => {
    updateSection(id, { options: newOptions });
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
          <div className="flex flex-col space-y-2">
            <p className="text-zinc-700 font-medium">Form name</p>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="bg-zinc-200 p-3 rounded-xl "
              placeholder="Give your form a name"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-zinc-700 font-medium">Description</p>
            <textarea
              rows={5}
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="bg-zinc-200 p-3 rounded-xl "
              placeholder="Write a small description for your form"
            />
          </div>
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
                    handleOptionsChange={(newOptions: Option[]) =>
                      handleOptionsChange(section.id, newOptions)
                    }
                    sectionValue={section.value}
                    options={section.options}
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
};

export default Home;
