import Image from "next/image";
import React from "react";
import { FormType, SectionType } from "../../utils/types";
import { PlayIcon } from "@heroicons/react/24/solid";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type Props = {
  item: FormType;
  list?: boolean;
  selected?: boolean;
  onClick?: () => void;
};

const images = [
  "/form-images/date.png",
  "/form-images/multiple-choice.png",
  "/form-images/short-answer.png",
];

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

function FormItem({ item, list, selected, onClick }: Props) {
  const randomImage = getRandomImage();
  return (
    <div
      className={`${
        selected ? "border-brand-original/50 " : "border-zinc-200/50 "
      } col-span-1  border  dark:border-zinc-500/50 flex flex-col rounded-2xl overflow-hidden bg-white `}
    >
      <div
        className={`${
          list ? "h-20 p-2 mb-4" : "h-40 p-4 "
        }bg-white w-full relative border-b border-zinc-200/50`}
      >
        <div
          onClick={onClick}
          className={`${
            list ? "h-28 " : "h-36 "
          }bg-zinc-100 relative w-full overflow-hidden rounded-t-lg`}
        >
          <Image
            src={randomImage}
            className={"object-cover  rounded-t-lg "}
            alt="expense tracker"
            fill
            loading="lazy"
            quality={75}
          />
        </div>
        <Link
          href={`/forms/${item.id}`}
          className={`${
            selected ? "bg-brand-original " : "bg-zinc-950  "
          } rounded-full p-2 absolute text-white top-5 right-5`}
        >
          <PlayIcon height={12} width={12} />
        </Link>
      </div>
      <div
        className={`${
          list ? "mt-8 " : ""
        } flex flex-col bg-white space-y-2 p-4`}
      >
        <div className="flex flex-row items-start w-full">
          <p className="text-sm flex-1 font-bold text-zinc-700 dark:text-zinc-100">
            {item.form.name}
          </p>
          <button className="border border-zinc-300/50 rounded-full p-1 text-zinc-950 top-5 right-5">
            <EllipsisVerticalIcon height={16} width={16} />
          </button>
        </div>
        <p className="text-zinc-500 dark:text-zinc-300 text-xs">
          {5} (est) to complete
        </p>
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-300 line-clamp-3">
          {item.form.description}
        </p>
        <div className="flex-1"></div>
        <div className="flex flex-row flex-1 flex-wrap">
          {item.form.sections.slice(0, 5).map((section: SectionType) => (
            <span
              className="bg-zinc-200 text-xs font-medium mb-2 mr-2 rounded-lg px-2 py-1 dark:bg-zinc-800 dark:text-white text-zinc-950"
              key={section.id}
            >
              {section.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FormItem;
