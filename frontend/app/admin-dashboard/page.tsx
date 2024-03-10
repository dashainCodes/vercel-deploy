"use client";

import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AxiosInstance } from "@/app/repositories/config";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { Context } from "../context/context";

interface UserData {
  email: string;
  password: string;
}

export default function Page() {
  const router = useRouter();
  // const navigate=useNavigate()
  const { register, handleSubmit, watch, reset } = useForm();
  const allInputField = watch();

  const [setsubmitting, setSetsubmitting] = useState(false);

  const { user,setUser }: any = useContext(Context);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log(allInputField);
      setSetsubmitting(true);
      const { data } = await AxiosInstance.post("/admin/login", allInputField);
      console.log(data.user);
      toast.success("Logged in successfully");
     if(data.accessToken)
     {
      if(data.user.role==="super-admin")
     {
      
      router.push("/admin-dashboard/admins");
     }
     if(data.user.role==="admin")
     {
      
      router.push("/admin-dashboard/categories");
     }
     }
      try {
        const {data}=await AxiosInstance.get('/users/user-from-token')
        console.log(data.data)
        setUser(data.data)
      } catch (error:any) {
        console.log(error.message)
      }
      setSetsubmitting(false);
    } catch (error: any) {
      setSetsubmitting(false);
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="flex  w-full items-center justify-center h-80">
          <div className="flex flex-col gap-[1rem] w-full  md:w-5/12 mx-auto   ">
            <div className="flex flex-col gap-[0.5rem] p-2">
              <div className="text-center pb-2 font-bold text-blue-700 text-xl">
                Expert Business Admin Dashboard
              </div>
              <input
                type="text"
                placeholder="Email"
                {...register("email", { required: true })}
                className="px-3 w-full py-1 border-2 bg-gray-200 "
              />
            </div>
            <div className="flex flex-col gap-[0.5rem]  p-2">
              <input
                type="text"
                placeholder="Password"
                {...register("password", { required: true })}
                className="px-3 w-full py-1 border-2 bg-gray-200 "
              />
            </div>
            <button
              disabled={setsubmitting}
              type="submit"
              className={`py-1 w-full text-white rounded  bg-blue-500 hover:bg-blue-600 ${
                setsubmitting && "bg-gray-400"
              } `}
            >
              {setsubmitting ? "Logging in" : "Log in"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
