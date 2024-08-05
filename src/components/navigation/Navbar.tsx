import { useForm } from "@/context/FormContext";
import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

type Props = {};

function Navbar({}: Props) {
  const { sections, formName } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const saveItem = async () => {
    setLoading(true);
    const formJSON = JSON.stringify(sections, null, 2);
    try {
      await setDoc(doc(db, "forms", "myForm"), { sections: formJSON });
      setLoading(false);
      setSuccess(true);
      setError(false);
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      setError(true);
    }
  };
  return (
    <div className="flex flex-col items-center py-4 border-b fixed z-50 top-0 w-full bg-white border-zinc-200/50">
      <div className="flex flex-row items-center max-w-7xl justify-between w-full mx-auto px-4">
        <p className="md:text-lg text-sm font-semibold text-zinc-950">
          Afrisight Forms
        </p>
        <div className="md:flex hidden space-x-4 flex-row items-center">
          {formName}
        </div>
        <button
          disabled={loading}
          onClick={loading ? () => console.log("loading") : saveItem}
          className={`${
            error
              ? "bg-red-600 "
              : success
              ? "bg-green-600 "
              : "bg-brand-original "
          } flex  text-white px-4 p-2 rounded-xl`}
        >
          {loading
            ? "loading ..."
            : error
            ? "error saving form"
            : success
            ? "Successfully saved"
            : "Create Form"}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
