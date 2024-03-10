import React, { useContext, useState } from "react";
import Image from "next/image";
import logo from "../public/svgicons/expertlogo.svg";
import icon1 from "../public/svgicons/facebook.svg";
import { Context } from "../app/context/context";
import toast, { Toaster } from "react-hot-toast";
import icon3 from "../public/svgicons/flat-color-icons_google.svg";
import { useForm } from "react-hook-form";
import { AxiosInstance } from "@/app/repositories/config";

const notify = () =>
  toast.success("Signup successful. Thank you for joining us!");

export default function Signup() {
  const { setIsLoginOpen, setIsLogin, setIsSignUp }: any = useContext(Context);
const[submitting,setSubmitting]=useState(false);
  const { watch, register } = useForm();
  const allInputField = watch();

  const onSubmit=async(e:any)=>{
    e.preventDefault();
    
try {
  setSubmitting(true);
 
  console.log(allInputField)
  
  const {data}=await AxiosInstance.post('/users/register',allInputField)
  console.log(data.data)
  toast.success(data.data.msg)
  setSubmitting(false);
} catch (error:any) {
  setSubmitting(false);
  toast.error(error.message)
}
  }
  return (
    <>
    <div className="flex flex-col items-center justify-center ">
      
      <div className=" px-10">
        <div className="pb-10">
          <Image
            src={logo}
            alt="logo"
            className="h-8 w-fit flex justify-start"
          />
        </div>
        <div>
          <p className="pb-4 font-semibold text-xl text-secondary-400">
            Sign Up to Expert
          </p>
          <div className="flex gap-3">
            <button className="flex gap-2 border border-primary-350 rounded-md py-2 px-5">
              <Image src={icon3} alt="logo" />
              <p className="font-normal text-secondary-300 hover:text-secondary-600">
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
            <div className="flex gap-3 pb-3">
              <div className="w-full">
                <p className="font-normal">Full Name</p>
                <input
                  type="text"
                  className="border-2 w-full h-12 rounded-md p-5"
                  placeholder="Full Name"
                  {...register("fullName",{required:true})}
                />
              </div>
              <div className="w-full">
                <p className="font-normal">Username</p>
                <input
                  type="text"
                  className="border-2 w-full h-12 rounded-md p-5"
                  placeholder="User Name"
                  {...register("username",{required:true})}
                />
              </div>
            </div>
            <div className="pb-3">
              <p className="font-normal">Email Address</p>
              <input
                type="text"
                className="border-2 w-full h-12 rounded-md p-5"
                placeholder="Email Address"
                {...register("email",{ required:true})}
              />
            </div>
            <div>
              <p className="font-normal">Password</p>
              <input
                type="password"
                className="border-2 w-full h-12 rounded-md p-5"
                placeholder="password"
                {...register("password",{required:true})}
              />
            </div>
            <div>
              <p className="font-normal">Password Confirmation</p>
              <input
                type="password"
                className="border-2 w-full h-12 rounded-md p-5"
                placeholder="Confirm password"
                {...register("passwordConfirmation",{required:true})}
              />
            </div>
           
          </div>
        </div>

        <div className="flex  gap-3 text-sm ">
          <div>
            <input type="checkbox" />
          </div>

          <p className="font-normal ">
            Creating an account means, you&apos;re okay with our{" "}
            <span className="text-primary-350">
              Terms of Service, Privacy Policy,{" "}
            </span>
            and our default <span className="text-primary-350"> Settings</span>
          </p>
        </div>
        <button
        type="submit"
          className="h-8 w-full mt-3 bg-primary-350 text-white rounded-md"
        disabled={submitting}
        >
        {submitting?"Registering":"Register"}
        </button>
        <Toaster />
        </form>
        <div className="flex gap-4 py-5 text-sm justify-center items-center">
          <p className="text-secondary-300">Already have an account? </p>
          <p
            className="text-primary-350 font-medium cursor-pointer"
            onClick={() => {
              setIsSignUp(false);
              setIsLogin(true);
              setIsLoginOpen(true);
            }}
          >
            Log In
          </p>
        </div>
      </div>
     
     
    </div>
    </>
  );
}
