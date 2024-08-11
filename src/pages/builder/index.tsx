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

const Builder: React.FC = () => {
  const [currentSectionValue, setCurrentSectionValue] = useState<string>("");
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
      <div className="relative flex flex-col w-full bg-zinc-100 h-full flex-1 px-4 p-8">
        <div className="max-w-2xl mx-auto w-full space-y-6">
          <div className="flex flex-col space-y-2">
            <p className="text-start font-bold heading-text text-3xl ">
              {formName ? `Name: ${formName}` : "Form name"}
            </p>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="bg-zinc-200 p-3 rounded-xl text-sm "
              placeholder="Give your form a name"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-start main-text text-sm text-zinc-500 max-w-2xl">
              {formDescription
                ? `Description: ${formDescription}`
                : "Briefly describe what your form is about"}
            </p>
            <textarea
              rows={3}
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="bg-zinc-200 p-3 rounded-xl text-sm "
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
        <div className="fixed flex bottom-20 z-50 w-full">
          <nav className=" max-w-5xl mx-auto w-full py-2 md:px-4">
            <div className="z-50 fixed flex max-w-5xl w-full flex-row items-center justify-between">
              <div className="md:flex hidden logo  h-10 w-10 rounded-full"></div>
              {/* nav links */}
              <div className="bg-white mx-auto border border-zinc-400/50 dark:border-zinc-500/50 md:px-8 px-4 py-3 rounded-full">
                <ul className="flex flex-1  font-medium md:gap-8 gap-4 text-sm text-zinc-700 dark:text-zinc-200">
                  Add Section
                  <div className="border-r border-zinc-400/50 dark:border-zinc-600 "></div>
                  Preview Form
                </ul>
              </div>
              <div className="md:flex hidden h-10 w-10 rounded-full"></div>
            </div>
          </nav>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default Builder;
