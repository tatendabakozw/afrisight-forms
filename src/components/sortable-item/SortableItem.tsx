import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowLongDownIcon, ArrowLongUpIcon } from "@heroicons/react/16/solid";

export function SortableItem(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div
        {...attributes}
        {...listeners}
        style={{ touchAction: "none" }}
        className="cursor-move p-2 bg-white  border border-zinc-200/50 rounded-xl w-1/3 mx-auto"
      >
        <div className="flex w-full flex flex-row items-center">
          <ArrowLongDownIcon height={12} width={12} />
          <div className=" flex-1 h-1 rounded-full  bg-zinc-200 mx-auto" />
          <ArrowLongUpIcon height={12} width={12} />
        </div>
      </div>
      {props.children}
    </div>
  );
}
