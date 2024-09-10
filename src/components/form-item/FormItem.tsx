import { Form, SectionType } from "../../utils/types";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns"

type Props = {
  item: Form;
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
  const sections = JSON.parse(item.sections as unknown as string) as SectionType[];
  return (
    <Link href={`/builder/${item._id}`} className="col-span-1 flex rounded-xl overflow-hidden bg-white pressable-shadow">

      <div className="flex flex-col p-4">
        <p className="font-bold text-zinc-700 dark:text-zinc-100">
          {item.name}
        </p>
        <p className="text-zinc-500 dark:text-zinc-300 line-clamp-3 mb-2 max-w-md">
          {item.description}
        </p>
        <div className='flex items-center gap-2 font-medium text-zinc-500 dark:text-zinc-300 '>
          <p className="text-sm">
            {sections.length} questions
          </p>
          <p>
            &bull;
          </p>
          <p className="text-sm">
            {
              formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })
            }
          </p>

        </div>


      </div>
    </Link>
  );
}

export default FormItem;
