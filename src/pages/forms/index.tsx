import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import GeneralLayout from "@/layouts/GeneralLayout";
import Link from "next/link";
import GetUserForms from "@/components/forms-containers/GetUserForms";

function Forms() {
  return (
    <GeneralLayout>
      <div className="max-w-7xl px-4 py-16 w-full mx-auto space-y-8 ">
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-col space-y-1">
            <p className="text-start font-bold heading-text text-3xl ">
              Manage Forms
            </p>
            <p className="text-start main-text text-sm text-zinc-500 max-w-2xl">
              Create forms or create forms link
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Link
              href={"/builder"}
              className="flex flex-row items-center bg-zinc-950 p-2 rounded-full capitalize font-medium text-white"
            >
              <PlusIcon height={24} width={24} />
            </Link>
          </div>
        </div>
        {/* <Search /> */}
        <GetUserForms />
      </div>
    </GeneralLayout>
  );
}

export default Forms;
