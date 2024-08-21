import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragIcon } from "../icons/drag";

export function SortableItem(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="bg-white rounded-xl p-4 pl-2 space-x-3 flex items-start shadow"
      ref={setNodeRef}
      style={style}
    >
      <button
        {...attributes}
        {...listeners}
        style={{ touchAction: "none" }}
        className="cursor-move w-[32px] h-[32px] -mt-1 rounded-md text-zinc-300 hover:text-zinc-700 hover:bg-zinc-400/20 flex justify-center items-center transition-all"
      >
        <DragIcon className="h-6 w-6 " />
      </button>
      {props.children}
    </div>
  );
}
