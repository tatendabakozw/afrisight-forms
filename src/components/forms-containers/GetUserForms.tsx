import React, { useEffect, useState } from "react";
import FormItem from "../form-item/FormItem";
import useFetchFormByUserId from "@/hooks/useFetchFormById";
import { useAuth } from "@/context/AuthContext";
import FormLoading from "./FormLoading";
import { FolderOpenIcon } from "@heroicons/react/24/outline";
import { Form } from "@/utils/types";
import { axiosInstance, FORM_ROUTES } from "@/utils/apiUrl";

function UserForms() {
  const { user } = useAuth(); // Assuming useAuth provides the user object
  const [forms, setForms] = useState<Form[]>([]);

  const getFormsForThisUser = async () => {
    const response = await axiosInstance.get(FORM_ROUTES.GET_ALL_FORMS)
    setForms(response.data)
  }

  const { loading, error } = useFetchFormByUserId(user?._id || "");

  useEffect(() => {
    getFormsForThisUser()
  }, [])

  console.log({ forms })

  return (
    <div className="max-w-7xl w-full mx-auto">
      {loading && (
        <div className="text-center w-full h-96 justify-center flex items-center">
          loading...
        </div>
      )}
      {error && (
        <div className="text-center w-full h-96 justify-center flex items-center">
          {error}
        </div>
      )}
      {forms.length < 1 && (
        <div className="text-center h-96 flex content-center justify-center flex-col items-center space-y-4">
          <FolderOpenIcon height={60} width={60} />
          <p>No forms added yet</p>
        </div>
      )}
      <div className=" flex-row grid grid-cols-3 gap-4">
        {forms.map((item) => (
          <FormItem
            key={item.id}
            item={item} // Spread the properties to match the FormItem props
          />
        ))}
      </div>
    </div>
  );
}

export default UserForms;
