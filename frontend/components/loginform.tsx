import React, { useContext } from "react";
import logo from "../public/svgicons/expertlogo.svg";
import Image from "next/image";
import icon1 from "../public/svgicons/facebook.svg";
import toast, { Toaster } from "react-hot-toast";
import { Context } from "../app/context/context";
import icon3 from "../public/svgicons/flat-color-icons_google.svg";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AxiosInstance } from "@/app/repositories/config";
import Link from "next/link";

const notify = () => toast.success("Login successful. Welcome back!");

export default function Loginform() {
  const { setIsLogin, setIsSignUp, setIsSignUPOpen,setIsLoggedIn }: any = useContext(Context);
  const { register, handleSubmit, watch, reset } = useForm();
  const allInputField = watch();

  const [setsubmitting, setSetsubmitting] = useState(false);

  const onSubmit = async (e:any) => {
    e.preventDefault()
    try {
      const { data } = await AxiosInstance.post("/users/login", allInputField);
      console.log(data.data);
      toast.success(data.msg);
      localStorage.setItem('loggedIn',"true");
      setIsLoggedIn(true);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col justify-center  ">
      <div className=" px-10">
        <div className="pb-10 ">
          <Image
            src={logo}
            alt="logo"
            className="h-8 w-fit flex justify-start"
          />
        </div>
        <div>
          <p className="pb-4 font-semibold text-xl text-secondary-400">
            Login to Expert
          </p>
          <div className="flex gap-3">
            <button className="flex gap-2 border border-primary-350 rounded-md py-2 px-5">
              <Image src={icon3} alt="logo" />
              <p className=" font-normal text-secondary-300 hover:text-secondary-600">
                Sign Up with Google
              </p>
            </button>
            <Image
              src={icon1}
              alt="logo"
              className="cursor-pointer opacity-50 hover:opacity-100"
            />
          </div>
        </div>
       <form onSubmit={onSubmit}>
       <div>
          <div className="py-5">
            <div className="pb-2">
              <p className="font-normal">Email Address</p>
              <input
                type="text"
                className="border-2 w-full  h-10 rounded-md p-5"
                placeholder="Email Address"
                {...register("email", { required: true })}
              />
            </div>
            <div>
              <p className="font-normal">Password</p>
              <input
                type="password"
                className="border-2 w-full h-10 rounded-md p-5"
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </div>
          </div>
          <div className="flex justify-between py-3 text-sm">
            <div className="flex gap-3">
              <div>
                <input type="checkbox" />
              </div>

              <p className="font-normal whitespace-nowrap">Remember Me</p>
            </div>
            <Link href={'/passwordrecovery'} className="text-red-600 whitespace-nowrap">Forgot password?</Link>
          </div>
        </div>
        <button
          type="submit"
          className="h-8 w-full bg-primary-350 text-white rounded-md"
         
        >
          Log In
        </button>
       </form>
        <Toaster />
        <div className="flex gap-4 py-5 text-sm justify-center items-center">
          <p className="text-secondary-300">Don&apos;t have an account? </p>
          <p
            className="text-primary-350 font-medium cursor-pointer"
            onClick={() => {
              setIsSignUp(true);
              setIsLogin(false);
              setIsSignUPOpen(true);
            }}
          >
            Sign Up
          </p>
        </div>
      </div>
    </div>
  );
}
