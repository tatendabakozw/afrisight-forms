import { useState, useEffect, useId, useRef } from "react";
import { field_types } from "@/lib/field_types_data";
import ShortAnswer from "../inputs/ShortAnswer";
import Paragraph from "../inputs/Paragraph";
import FieldTypeDropdown from "../field-type-dropdown/FieldTypeDropdown";
import { TrashIcon } from "@heroicons/react/24/outline";
import { FieldType } from "@/lib/types";
import TextArea from "../inputs/TextArea";
import DatePicker from "../inputs/DatePicker";
import MultipleChoice from "../inputs/MultipeChoice";
import FileUpload from "../inputs/FileUpload";
import { Pencil1Icon, TextIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import Switch from "../ui/switch";
import { useToggle } from "@/hooks/useToggle";
import { Input } from "../ui/Input";
import { DragIcon } from "../icons/drag";

type Option = {
  name: string;
  _id: string;
};

interface Props {
  handleDeleteSection: () => void;
  handleSectionTypeChange: (newType: FieldType) => void;
  handleSectionValueChange: (newValue: string) => void;
  handleOptionsChange: (newOptions: Option[]) => void;
  sectionValue: string;
  options: Option[];
}

function FieldSection({
  handleDeleteSection,
  handleSectionTypeChange,
  handleSectionValueChange,
  handleOptionsChange,
  sectionValue,
  options,
}: Props) {
  const [question, setQuestion] = useState(sectionValue)
  const [editing, toggleEditing, setEditing] = useToggle(false);
  const [type, setType] = useState<FieldType>(field_types[0]);

  useEffect(() => {
    handleSectionTypeChange(type);
  }, [type]);

  useEffect(() => {
    setQuestion(sectionValue)
    if (!sectionValue) setEditing(true)
  }, [sectionValue]);

  const showInputArea = () => {
    switch (type._id) {
      case "short-answer":
        return (
          <ShortAnswer
            value={sectionValue}
            setValue={handleSectionValueChange}
          />
        );
      case "date":
        return (
          <DatePicker
            value={sectionValue}
            setValue={handleSectionValueChange}
          />
        );
      case "multiple-choice":
        return (
          <MultipleChoice
            value={sectionValue}
            setValue={handleSectionValueChange}
            options={options}
            setOptions={handleOptionsChange}
          />
        );
      case "file-upload":
        return (
          <FileUpload
            value={sectionValue}
            setValue={handleSectionValueChange}
          />
        );
      case "text-area":
        return (
          <TextArea value={sectionValue} setValue={handleSectionValueChange} />
        );
      case "paragraph":
        return (
          <Paragraph value={sectionValue} setValue={handleSectionValueChange} />
        );
      default:
        return (
          <ShortAnswer
            value={sectionValue}
            setValue={handleSectionValueChange}
          />
        );
    }
  };

  const handleChangeType = (newType: FieldType) => {
    setType(newType);
    handleSectionTypeChange(newType);
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here

    const formQuestion = e.currentTarget.question.value;
    const sectionType = type;
    const required = e.currentTarget.required.checked;

    handleSectionValueChange(formQuestion);
    // handleSectionTypeChange({ ...sectionType, required });
    toggleEditing();
  };



  return (
    <div className="flex-1">
      {!editing && (
        <div className="space-x-4 flex items-start">
          <div className="w-full">
            <div className="inline-flex space-x-2 mb-4 items-baseline">
              <p className="font-bold tetx-zinc-800">
                {sectionValue} {type.required && <span className="text-red-500">*</span>}
              </p>
              <Button onClick={toggleEditing} colorScheme={"ghost"} style={{ height: 24, width: 24, padding: 0, backgroundColor: "white" }}>
                <Pencil1Icon />
              </Button>
            </div>
            {showInputArea()}
          </div>
        </div>
      )}
      {editing && (
        <form onSubmit={onSubmitForm} className="space-y-4">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="h-[24px] aspect-square rounded-md bg-zinc-200 flex items-center justify-center">
                <TextIcon className="w-4 h-4" />
              </p>
              <p className="text-zinc-950 font-semibold">{type.name}</p>
            </div>
            <Switch name={"required"} label={"Required"} />
          </div>
          <div className="p-4 rounded-md bg-zinc-100">
            <div className="w-full gap-4 mb-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor={"question"}>
                  Label
                </label>
                <Input
                  required
                  type="text"
                  name={"question"}
                  autoComplete="off"
                  value={question}
                  autoFocus
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Question"
                  className="bg-zinc-100 border w-full border-zinc-200/50 py-2 px-4 rounded-xl flex-1"
                />
              </div>
            </div>
            <div className="flex">
              <FieldTypeDropdown
                value={type._id} // Pass _id or similar identifier
                setSectionType={handleChangeType}
              />
            </div>
          </div>
          <div className="flex justify-between w-full gap-4">
            <button
              type="button"
              onClick={handleDeleteSection}
              className="bg-red-50 self-end rounded-full p-2 text-red-600"
            >
              <TrashIcon height={20} width={20} />
            </button>
            <Button type="submit" colorScheme={"action"} className="px-6">
              Save
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
export default FieldSection;
