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
import Modal, { useDisclosure } from "@/components/ui/dialog";
import BuilderLayout from "@/layouts/BuilderLayout";

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
  const {
    open: formSettingsOpen,
    onOpen: openFormSettings,
    onClose: closeFormSettings,
  } = useDisclosure();
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
    <BuilderLayout title={formName} description={formDescription} openSettingsModal={openFormSettings}>
      <FormSettingsModal
        formSettingsOpen={formSettingsOpen}
        closeFormSettings={closeFormSettings}
        formName={formName}
        setFormName={setFormName}
        formDescription={formDescription}
        setFormDescription={setFormDescription}
      />

      <div className="relative flex flex-col w-full bg-zinc-100 h-full flex-1 px-4 p-8">
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
            className="bg-zinc-400/10 w-full items-center content-center justify-center transition-all duration-300 hover:shadow flex flex-row space-x-4 p-8 rounded-xl border border-zinc-400/30 shadow-sm hover:bg-white"
          >
            <PlusIcon height={20} width={20} />
            <p>Add section</p>
          </button>
        </div>
      </div>
    </BuilderLayout>
  );
};

export default Builder;

function FormSettingsModal({
  formSettingsOpen,
  closeFormSettings,
  formName,
  setFormName,
  formDescription,
  setFormDescription,
}: {
  formSettingsOpen: boolean;
  closeFormSettings: () => void;
  formName: string;
  setFormName: (name: string) => void;
  formDescription: string;
  setFormDescription: (name: string) => void;
}) {

  const [initialValues,] = useState({
    formName,
    formDescription,
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.currentTarget.formTitle.value;
    const description = e.currentTarget.formDescription.value;
    // Use the title and description as needed

    setFormName(title);
    setFormDescription(description);

    closeFormSettings();
  };

  const onClose = () => {
    if (!formName) {
      setFormName(initialValues.formName);
    }
    if (!formDescription) {
      setFormDescription(initialValues.formDescription);
    }
    closeFormSettings();
  }

  return (
    <Modal
      title="Form settings"
      open={formSettingsOpen}
      onClose={onClose}
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="formTitle" className="text-start">
            Title
          </label>
          <input
            type="text"
            name="formTitle"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="bg-white h-[40px] px-3 rounded-md border border-zinc-400/30 outline-blue-500 outline-offset-1"
            placeholder="Descriptive name of form"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="formDescription"
            className="text-start main-text max-w-2xl"
          >
            Description
          </label>
          <textarea
            name="formDescription"
            rows={3}
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            className="bg-white p-3 rounded-md shadow-sm border border-zinc-400/30 outline-blue-500 outline-offset-1"
            placeholder="Write a small description for your form"
          />
        </div>
        <div className="flex gap-6 mt-8">
          <button
            onClick={onClose}
            type="button"
            className="border border-zinc-400/30 text-zinc-600 rounded-md px-3 h-[40px]"
          >
            Cancel
          </button>
          <button
            type={"submit"}
            className="w-full h-[40px] flex-1 rounded-md bg-blue-600 text-white p-2"
          >
            Save changes
          </button>
        </div>
      </form>
    </Modal>
  );
}
