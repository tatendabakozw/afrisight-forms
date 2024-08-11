import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { field_types } from "@/lib/field_types_data";

// Define the type for each field type item
interface FieldType {
  name: string;
  _id: string;
  Icon: any;
  type: string;
}

// Define the grouped field types
interface GroupedFieldTypes {
  [key: string]: FieldType[];
}

// Group field types with similar 'type' property
const groupedFieldTypes: GroupedFieldTypes =
  field_types.reduce<GroupedFieldTypes>((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});

type FieldTypeDropdownProps = {
  value: string;
  setSectionType: (value: FieldType) => void;
};

function FieldTypeDropdown({ value, setSectionType }: FieldTypeDropdownProps) {
  const handleSelect = (newValue: FieldType) => {
    setSectionType(newValue);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex border border-zinc-200/50 text-zinc-950 text-xs font-semibold p-2 rounded-xl">
          Change Type
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {Object.entries(groupedFieldTypes).map(([type, items]) => (
          <div key={type}>
            {items.map((item) => (
              <DropdownMenuItem
                key={item._id}
                onClick={() => handleSelect(item)}
              >
                <div className="flex flex-row items-center text-zinc-700 space-x-4">
                  <item.Icon height={20} width={20} />
                  <p className="text-sm font-medium">{item.name}</p>
                </div>
              </DropdownMenuItem>
            ))}
            <div className="border-t border-zinc-200/50 my-2"></div>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FieldTypeDropdown;
