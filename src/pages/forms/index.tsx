import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import GeneralLayout from "@/layouts/GeneralLayout";
import Link from "next/link";
import UserForms from "@/components/forms-containers/GetUserForms";
import { axiosInstance, FORM_ROUTES } from "@/utils/apiUrl";
import { useRouter } from "next/router";

function Forms() {
  const router = useRouter();
  const onCreateForm = async () => {
    const response = await axiosInstance.post(FORM_ROUTES.CREATE, {
      name: "Untitled",
      description: "",
      sections: JSON.stringify([])
    })

    if (response.data._id) {
      router.push(`/builder/${response.data._id}`)
    }
  }

  return (
    <GeneralLayout>
      <div className="max-w-7xl px-4 py-4 w-full mx-auto space-y-8 ">
        <div className="flex flex-row items-start justify-between">
          <h1 className="text-start font-bold heading-text text-3xl ">
            Workspace
          </h1>
          <div className="flex flex-row items-center gap-2">
            <button
              onClick={onCreateForm}
              className="flex items-center bg-white h-[28px] px-2 rounded-md shadow font-semibold gap-2 text-zinc-900 pressable-shadow"
            >
              <PlusIcon height={16} width={16} />
              Create form
            </button>
          </div>
        </div>
        {/* <Search /> */}
        <UserForms />
      </div>
    </GeneralLayout>
  );
}

export default Forms;
