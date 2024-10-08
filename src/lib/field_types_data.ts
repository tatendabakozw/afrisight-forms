import {
  ArrowUpTrayIcon,
  Bars3BottomLeftIcon,
  Bars4Icon,
  CalendarDaysIcon,
  H1Icon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";

export const field_types = [
  {
    name: "Short Answer",
    _id: "short-answer",
    Icon: Bars3BottomLeftIcon,
    type: "input",
  },
  { name: "Paragraph", _id: "paragraph", Icon: Bars4Icon, type: "input" },
  {
    name: "Mutiple choice",
    _id: "multiple-choice",
    Icon: ListBulletIcon,
    type: "select-item",
  },
  {
    name: "Rating",
    _id: "rating",
    Icon: ListBulletIcon,
    type: "rating",
  },
  {
    name: "File Upload",
    _id: "file-upload",
    Icon: ArrowUpTrayIcon,
    type: "file",
  },
  { name: "Date", _id: "date", Icon: CalendarDaysIcon, type: "date-item" },
];
