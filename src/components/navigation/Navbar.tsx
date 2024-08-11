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

type Props = {};

function Navbar({}: Props) {
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
    <div className="flex flex-col items-center py-4 border-b fixed z-50 top-0 w-full bg-white border-zinc-200/50">
      <div className="flex flex-row items-center max-w-7xl justify-between w-full mx-auto px-4 space-x-4">
        <div className="flex flex-row items-center space-x-4">
          <Link
            href={"/"}
            className="md:text-lg text-sm font-semibold text-zinc-950"
          >
            Builder
          </Link>
          <Link
            href={"/forms"}
            className="md:flex hidden text-sm font-medium space-x-4 flex-row items-center"
          >
            Forms
          </Link>
        </div>
        <div className="md:flex hidden space-x-4 flex-row items-center">
          {formName}
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
            className="transition-all cursor-pointer duration-100 text-zinc-700 bg-zinc-100 p-2 rounded-full"
            onClick={logout}
          >
            <ArrowRightEndOnRectangleIcon height={24} width={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
