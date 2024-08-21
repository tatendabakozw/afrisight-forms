import { cn } from "@/lib/utils";
import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {

}

const DragIcon = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    className={cn("w-5 h-5", props.className)}
  >
    <g>
      <rect x={7} y={4} width={4} height={4} rx={2} fill="currentColor" />
      <rect x={13} y={4} width={4} height={4} rx={2} fill="currentColor" />
      <rect x={7} y={10} width={4} height={4} rx={2} fill="currentColor" />
      <rect x={13} y={10} width={4} height={4} rx={2} fill="currentColor" />
      <rect x={7} y={16} width={4} height={4} rx={2} fill="currentColor" />
      <rect x={13} y={16} width={4} height={4} rx={2} fill="currentColor" />
    </g>
  </svg>
);

export { DragIcon };
