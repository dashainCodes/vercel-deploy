"use client";
import React from "react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AxiosInstance } from "@/app/repositories/config";
import { toast } from "react-toastify";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

interface UserData {
  fullName: string;
  email: string;
  role: string;
  password: string;
  passwordConfirmation: string;
  username: string;
}
export default function Page() {
  const { register, watch, reset } = useForm();
  const allInputField = watch();
  const [setsubmitting, setSetsubmitting] = useState(false);
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setSetsubmitting(true);

      const { data } = await AxiosInstance.post("/users/register", {
        ...allInputField,
        isVerified: true,
        role: "admin",
      });
      console.log(data.data);
      toast.success(data.msg);
      reset();
      setSetsubmitting(false);
    } catch (error: any) {
      setSetsubmitting(false);
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Link href="/admin-dashboard/admins/" className=" py-2">
        <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
      </Link>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-[1rem] w-full items-center">
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Name</label>
            <input
              type="text"
              {...register("fullName", { required: true })}
              className="px-3 py-1 border-2 border-gray-600 "
            />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Username</label>
            <input
              type="text"
              {...register("username", { required: true })}
              className="px-3 py-1 border-2 border-gray-600 "
            />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Email</label>
            <input
              type="text"
              {...register("email", { required: true })}
              className="px-3 py-1 border-2 border-gray-600 "
            />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Password</label>
            <input
              type="text"
              {...register("password", { required: true })}
              className="px-3 py-1 border-2 border-gray-600 "
            />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Password Confirmation</label>
            <input
              type="text"
              {...register("passwordConfirmation", { required: true })}
              className="px-3 py-1 border-2 border-gray-600 "
            />
          </div>
          {/* <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Select role:</label>
            <select
              onChange={(e) => setRole(e.target.value)}
              className="bg-gray-200"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div> */}

          <button
            disabled={setsubmitting}
            type="submit"
            className={`py-1 text-white rounded w-[10%] bg-blue-500 hover:bg-blue-600 ${
              setsubmitting && "bg-gray-400"
            }`}
          >
            {setsubmitting ? "Adding" : "Add"}
          </button>
        </div>
      </form>
    </>
  );
}
