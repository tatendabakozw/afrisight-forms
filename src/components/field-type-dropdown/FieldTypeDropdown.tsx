import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { field_types } from "@/lib/field_types_data";

type FieldTypeDropdownProps = {
  value: string;
  setSectionType: (value: any) => void;
};

function FieldTypeDropdown({ value, setSectionType }: FieldTypeDropdownProps) {
  const handleSelect = (newValue: any) => {
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
        {field_types.map((item) => (
          <DropdownMenuItem key={item._id} onClick={() => handleSelect(item)}>
            {item.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FieldTypeDropdown;
