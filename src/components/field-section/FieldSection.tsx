import { field_types } from "@/lib/field_types_data";
import { useState } from "react";
import ShortAnswer from "../inputs/ShortAnswer";
import Paragraph from "../inputs/Paragraph";
import FieldTypeDropdown from "../field-type-dropdown/FieldTypeDropdown";
import { TrashIcon } from "@heroicons/react/24/outline";
import { FieldType } from "@/lib/types";

interface Props {
  handleDeleteSection: () => void;
}

function FieldSection({ handleDeleteSection }: Props) {
  const [type, setType] = useState<FieldType>(field_types[0]);

  const showInputArea = () => {
    switch (type._id) {
      case "short-answer":
        return <ShortAnswer />;
      case "paragraph":
        return <Paragraph />;
      default:
        return <ShortAnswer />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 space-y-4">
      <div className="flex flex-row items-center justify-between">
        <p className="text-zinc-950 text-lg font-semibold">{type.name}</p>
        <div className="flex">
          <FieldTypeDropdown
            value={type._id} // Pass _id or similar identifier
            setSectionType={setType}
          />
        </div>
      </div>
      <div className="w-full gap-4">{showInputArea()}</div>
      <div className="flex flex-end w-full gap-4">
        <button
          onClick={handleDeleteSection}
          className="bg-zinc-100 rounded-full p-2"
        >
          <TrashIcon height={20} width={20} />
        </button>
      </div>
    </div>
  );
}
export default FieldSection;
