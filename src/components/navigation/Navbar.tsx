import { useForm } from "@/context/FormContext";
import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import PrimaryButton from "../buttons/PrimaryButton";
import { getMessage } from "@/helpers/getMessage";

type Props = {};

function Navbar({}: Props) {
  const { sections, formName, formDescription } = useForm();
  const router = useRouter();
  const currentPath = router.pathname;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const saveItem = async () => {
    const createdForm = {
      name: formName,
      description: formDescription,
      sections,
    };
    setLoading(true);
    const formJSON = JSON.stringify(createdForm, null, 2);

    // Generate a unique identifier using date and form name
    const date = new Date();
    const uniqueId = `${date.toISOString()}-${formName.replace(/\s+/g, "-")}`;

    try {
      await setDoc(doc(db, "forms", uniqueId), { ...createdForm });
      setLoading(false);
      setSuccess("item saved");
      setError("");
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(getMessage(error));
    }
  };

  return (
    <div className="flex flex-col items-center py-4 border-b fixed z-50 top-0 w-full bg-white border-zinc-200/50">
      <div className="flex flex-row items-center max-w-7xl justify-between w-full mx-auto px-4">
        <p className="md:text-lg text-sm font-semibold text-zinc-950">
          Builder
        </p>
        <div className="md:flex hidden space-x-4 flex-row items-center">
          {formName}
        </div>

        {currentPath === "/builder" && (
          <PrimaryButton
            text="Create Form"
            onClick={saveItem}
            loading={loading}
            success={success}
            error={error}
          />
        )}
      </div>
    </div>
  );
}

export default Navbar;
