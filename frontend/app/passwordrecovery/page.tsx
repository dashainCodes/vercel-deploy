"use client";


import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { AxiosInstance } from "@/app/repositories/config";

function EmailRecovery() {
  const { register, watch } = useForm();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const allInputField = watch();

  const [submitted, setSubmitted] = useState<boolean>(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await AxiosInstance.post(
        "/users/forgot-pw",
        allInputField
      );
      console.log(data.data);
      setSubmitted(true);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="p-5">
    {
        submitted?(<>The recovery link has been sent.</>):(<>
          <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-[1rem] px-5 w-full items-center">
          <div className="flex flex-col gap-[0.5rem] w-full items-center">
            <label>Enter email</label>
            <input
              type="text"
              {...register("email", { required: true })}
              className="px-3 py-1 border-2 border-gray-600 w-[30%] "
            />
          </div>
          <button
            disabled={submitting}
            type="submit"
            className={`py-1 text-white rounded w-[10%] bg-blue-500 hover:bg-blue-600 ${
              submitting && "bg-gray-400"
            }`}
          >
            {submitting ? "Submitting" : "Submit"}
          </button>
        </div>
      </form>
        </>)
    }
    </div>
  );
}

export default EmailRecovery;
