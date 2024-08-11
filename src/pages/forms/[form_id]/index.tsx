import React, { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import GeneralLayout from "@/layouts/GeneralLayout";
import useSingleForm from "@/hooks/useSingleForm";
import ToolTipButton from "@/components/buttons/ToolTipButton";

const SingleForm = () => {
  const router = useRouter();
  const { form_id } = router.query;
  const [sectionValue, setSectionValue] = useState("");

  const { document, loading } = useSingleForm({
    collectionName: "forms",
    id: form_id as string,
  });

  return (
    <GeneralLayout>
      <div className="max-w-7xl px-4 py-16 w-full mx-auto space-y-8 ">
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-col space-y-1">
            <p className="text-start font-bold heading-text text-3xl">
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
        <p className=" text-lg font-semibold text-zinc-950">Preview</p>
        {/* search and filter */}
        {/* {document?.sections.map((section) => (
          <FormSection
            section_type={section.type._id}
            key={section.id}
            question={section.value}
            handleSectionValueChange={setSectionValue}
            sectionValue={sectionValue}
            options={section.options}
          />
        ))} */}
      </div>
    </GeneralLayout>
  );
};

export default SingleForm;
