import { Context } from "@/app/context/context";
import { AxiosInstance } from "@/app/repositories/config";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function UpdateProfile() {
  const { user ,setUser}: any = useContext(Context);
  const { watch, register } = useForm();
  const allInputField = watch();
  const [setsubmitting,setSetsubmitting]=useState(false)
 
 
  const onSubmit = async (e: any) => {

    e.preventDefault();
    try {
      const { data } = await AxiosInstance.patch(`/users/${user?.userId}`, allInputField);
      console.log(data.data);
      setUser(data.data);
      toast.success("Profile updated");
    } 
    catch (error: any) {
      console.log(error.message);
    }

  };


  return (
    <>
      {user && (
        <>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-[0.5rem] w-full">
              <label>Full Name</label>
              <input
                type="text"
                {...register("fullName", { required: true })}
                defaultValue={user.fullName}
                className="px-3 py-1 border-2 border-gray-600 "
              />
            </div>
            <div className="flex flex-col gap-[0.5rem] w-full">
              <label>Username</label>
              <input
                type="text"
                {...register("username",)}
                defaultValue={user.username}
                className="px-3 py-1 border-2 border-gray-600 "
              />
            </div>
            <div className="flex flex-col gap-[0.5rem] w-full">
              <label>Email</label>
              <input
                type="text"
                {...register("email",)}
                defaultValue={user.email}
                className="px-3 py-1 border-2 border-gray-600 "
              />
            </div>
            <button
          disabled={setsubmitting}
          type="submit"
            className={`py-1 text-white rounded w-[10%] bg-blue-500 hover:bg-blue-600 ${setsubmitting && "bg-gray-400"}`}
         
          >
            {setsubmitting? "Updating":"Update"}
          </button>
          </form>
        </>
      )}
    </>
  );
}
