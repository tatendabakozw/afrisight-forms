import React from "react";
import FormItem from "../form-item/FormItem";
import useFetchFormByUserId from "@/hooks/useFetchFormById";
import { useAuth } from "@/context/AuthContext";

function GetUserForms() {
  const { user } = useAuth(); // Assuming useAuth provides the user object

  // Only call the hook if user is not null
  const { forms, loading, error } = useFetchFormByUserId(user?._id || "");

  if (!user) {
    return <p>loading...</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
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
      <div className=" flex-row grid md:grid-cols-4 gap-8 grid-cols-1">
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

export default GetUserForms;
