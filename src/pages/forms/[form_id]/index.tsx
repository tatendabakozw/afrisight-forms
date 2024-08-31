import { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import GeneralLayout from "@/layouts/GeneralLayout";
import useSingleForm from "@/hooks/useSingleForm";
import ToolTipButton from "@/components/buttons/ToolTipButton";
import { SectionKey } from "@/context/FormContext";
import ShortAnswer from "@/components/inputs/ShortAnswer";
import Paragraph from "@/components/inputs/Paragraph";
import TextArea from "@/components/inputs/TextArea";
import MultipleChoice from "@/components/inputs/MultipeChoice";
import DatePicker from "@/components/inputs/DatePicker";
import FileUpload from "@/components/inputs/FileUpload";
import { Section } from "@/utils/types";



const SingleForm = () => {
  const router = useRouter();
  const { form_id } = router.query;

  const { document, loading } = useSingleForm({
    collectionName: "forms",
    id: form_id as string,
  });

  return (
    <GeneralLayout>
      <div className="max-w-7xl px-4 py-16 w-full mx-auto space-y-8 ">
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-col space-y-1">
            <p className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-md font-semibold w-fit uppercase">Preview</p>
            <p className="text-start font-bold heading-text text-3xl text-zinc-800">
              {loading ? "Loading..." : document?.name}
            </p>
            <p className="text-start main-text text-sm text-zinc-500 max-w-lg">
              {loading ? "Loading..." : document?.description}
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <ToolTipButton text="Edit Form">
              <div className="flex flex-row items-center bg-zinc-950 p-3 rounded-full capitalize font-medium text-white">
                <PencilIcon height={20} width={20} />
              </div>
            </ToolTipButton>
          </div>
        </div>
        {document && <div className="space-y-8">
          {document.sections.map((section, index) => (
            <FieldSectionPresenter key={index} section={section} />
          ))}
        </div>}
      </div>
    </GeneralLayout>
  );
};


const FieldSectionPresenter = (props: { section: Section }) => {
  const Component = getSectionComponent(props.section.type.id as any);

  return (
    <div className="max-w-xl">
      <p className="font-semibold mb-2">{props.section.value}</p>
      <Component
        options={props.section.options}
        setOptions={() => null}
        setValue={() => null}
        value={props.section.value}
      />
    </div>
  );
};

const getSectionComponent = (sectionKey: SectionKey) => {
  switch (sectionKey) {
    case "short-answer":
      return ShortAnswer;
    case "paragraph":
      return Paragraph;
    case "text-area":
      return TextArea;
    case "multiple-choice":
      return MultipleChoice;
    case "date":
      return DatePicker;
    case "file-upload":
      return FileUpload;
    default:
      return ShortAnswer;
  }
};


export default SingleForm;
