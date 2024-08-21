import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { field_types } from "@/lib/field_types_data";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";

// Define the type for each field type item
interface FieldType {
  name: string;
  _id: string;
  Icon?: any;
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
    // Destructure the Icon property out of newValue
    const { Icon, ...rest } = newValue;
    setSectionType(rest); // Pass the rest of the properties without Icon
  };

  const resolveFieldNameFromValue = (value: string) => {
    const selected = field_types.find((item) => item.name === value);
    if (selected) {
      return selected;
    }
    return field_types[0].name;
  }

  return (
    <Select.Root
      name="field_type"
      defaultValue={field_types[0].name}
      onValueChange={(value) => {
        if (value) {
          const selected = field_types.find((item) => item.name === value);
          if (selected) {
            handleSelect(selected);
          }
        }
      }}
    >
      <Select.Trigger className="h-[40px] rounded-md w-full px-3 bg-white text-start flex justify-between items-center shadow-sm border border-zinc-400/30 outline-blue-500">
        <Select.Value />
        <Select.Icon asChild>
          <ChevronDownIcon className="h-4 w-4" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          style={{
            boxShadow: `
          0 1px 1px hsl(0deg 0% 0% / 0.025),
      0 2px 2px hsl(0deg 0% 0% / 0.025),
      0 4px 4px hsl(0deg 0% 0% / 0.025),
      0 8px 8px hsl(0deg 0% 0% / 0.025),
      0 16px 16px hsl(0deg 0% 0% / 0.025)`,
          }}
          className="w-[360px] bg-white rounded-md  border-zinc-400/30"
        >
          <Select.ScrollUpButton />
          <Select.Viewport>
            {Object.entries(groupedFieldTypes).map(([type, items]) => (
              <div key={type}>
                {items.map((item) => (
                  <Select.Item
                    value={item.name}
                    key={item._id}
                    className="py-3 px-4 hover:bg-zinc-100 transition-all"
                  >
                    <p className="flex flex-row items-center text-zinc-700 space-x-4">
                      <item.Icon height={20} width={20} />
                      <Select.ItemText className="text-sm font-medium">
                        {item.name}
                      </Select.ItemText>
                    </p>
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
                <div className="border-t border-zinc-200/50 my-0"></div>
              </div>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

export default FieldTypeDropdown;
