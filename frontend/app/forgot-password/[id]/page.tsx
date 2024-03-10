"use client";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { AxiosInstance } from "@/app/repositories/config";

function ForgotPasswordVerification() {
  const searchParams = useSearchParams();
  console.log(searchParams.get("email"));
  const email = searchParams.get("email");
  const expiry=searchParams.get("expiry");

  // Function to verify the token expiry
  const isTokenValid = () => {
    if (expiry) {
      const expiryTime = parseInt(expiry);
      const currentTime = new Date().getTime();
      return currentTime < expiryTime;
    }
    return true;
  };

  const { register, watch } = useForm();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const allInputField = watch();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (allInputField.password !== allInputField.passwordConfirmation) {
      toast.error("Passwords do not watch.");
    } else {
      try {
        const { data } = await AxiosInstance.patch("/users/password-update", {
          ...allInputField,
          email,
        });
        console.log(data.data);
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };
  return (
    <div className="p-5">
      {isTokenValid() ? (
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-[1rem] px-5 w-full items-center">
            <div className="flex flex-col gap-[0.5rem] w-full items-center">
              <label>New Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="px-3 py-1 border-2 border-gray-600 w-[30%] "
              />
            </div>
            <div className="flex flex-col gap-[0.5rem] w-full items-center">
              <label>Confirm password</label>
              <input
                type="password"
                {...register("passwordConfirmation", { required: true })}
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
      ) : (
        <p>Verification link has expired</p>
      )}
    </div>
  );
}

export default ForgotPasswordVerification;
