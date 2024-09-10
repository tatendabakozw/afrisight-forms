import { useForm } from "@/context/FormContext";
import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import PrimaryButton from "../buttons/PrimaryButton";
import { getMessage } from "@/helpers/getMessage";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Square3Stack3DIcon } from "@heroicons/react/20/solid";

type Props = {};

function Navbar({ }: Props) {
  const { sections, formName, formDescription } = useForm();
  const router = useRouter();
  const currentPath = router.pathname;
  const { logout, user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const saveItem = async () => {
    const createdForm = {
      name: formName,
      description: formDescription,
      sections,
      _id: user?._id || "", // Include the user ID
    };
    setLoading(true);
    // Generate a unique identifier using date and form name
    const date = new Date();
    const uniqueId = `${date.toISOString()}-${formName.replace(/\s+/g, "-")}`;

    try {
      await setDoc(doc(db, "forms", uniqueId), { ...createdForm });
      // console.log(createdForm);
      setLoading(false);
      setSuccess(true);
      setError("");
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      console.error(getMessage(error));
      setError(getMessage(error));
    }
  };

  return (
    <div className="flex flex-col items-center py-2 border-b fixed z-50 top-0 w-full bg-white border-zinc-200/50">
      <div className="flex flex-row items-center max-w-7xl justify-between w-full mx-auto px-4 space-x-4">
        <div className="flex flex-row items-center">
          <Link href={"/forms"} className="font-semibold text-indigo-600 inline-flex items-center gap-2">
            <span className="w-[32px] h-[32px] rounded-md bg-indigo-100 flex items-center justify-center">
              <Square3Stack3DIcon className="size-5" />
            </span>
            Builder
          </Link>

        </div>

        <div className="flex flex-row items-center space-x-4">
          {currentPath === "/builder" && (
            <PrimaryButton
              text="Create Form"
              onClick={saveItem}
              loading={loading}
              success={success}
              error={error}
            />
          )}
          <button
            className="bg-zinc-400/20 text-zinc-900 p-2 rounded-full flex gap-2 items-center pl-4 font-semibold"
            onClick={logout}
          >
            Sign out
            <ArrowRightEndOnRectangleIcon height={20} width={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
