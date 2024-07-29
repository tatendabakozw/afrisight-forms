import { useState, useEffect } from "react";
import { field_types } from "@/lib/field_types_data";
import ShortAnswer from "../inputs/ShortAnswer";
import Paragraph from "../inputs/Paragraph";
import FieldTypeDropdown from "../field-type-dropdown/FieldTypeDropdown";
import { TrashIcon } from "@heroicons/react/24/outline";
import { FieldType } from "@/lib/types";
import TextArea from "../inputs/TextArea";
import MultipeChoice from "../inputs/MultipeChoice";
import DatePicker from "../inputs/DatePicker";

interface Props {
  handleDeleteSection: () => void;
  handleSectionTypeChange: (newType: FieldType) => void;
  handleSectionValueChange: (newValue: string) => void;
  sectionValue: string;
}

function FieldSection({
  handleDeleteSection,
  handleSectionTypeChange,
  handleSectionValueChange,
  sectionValue,
}: Props) {
  const [type, setType] = useState<FieldType>(field_types[0]);

  useEffect(() => {
    handleSectionTypeChange(type);
  }, [type]);

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
        return <DatePicker />;
      case "multiple-choice":
        return <MultipeChoice />;
      case "text-area":
        return <TextArea />;
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

  return (
    <div className="bg-white rounded-xl p-4 space-y-4">
      <div className="flex flex-row items-center justify-between">
        <p className="text-zinc-950 text-lg font-semibold">{type.name}</p>
        <div className="flex">
          <FieldTypeDropdown
            value={type._id} // Pass _id or similar identifier
            setSectionType={handleChangeType}
          />
        </div>
      </div>
      <div className="w-full gap-4">{showInputArea()}</div>
      <div className="flex self-end w-full gap-4 flex-col">
        <button
          onClick={handleDeleteSection}
          className="bg-zinc-100 self-end rounded-full p-2"
        >
          <TrashIcon height={20} width={20} />
        </button>
      </div>
    </div>
  );
}
export default FieldSection;
