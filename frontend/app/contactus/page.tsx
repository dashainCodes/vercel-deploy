"use client";
import { Clock12, Mail, Phone, Map, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import banner from "../../public/aboutusbanner.svg";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AxiosInstance } from "../repositories/config";

const notify = () => {
  toast.success("Message Successfully Submitted!");
}


export default function Page() {

  const { register, handleSubmit, watch, reset } = useForm();
  const allInputField = watch();

  const [setsubmitting, setSetsubmitting] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setSetsubmitting(true);
      const { data } = await AxiosInstance.post("/contacts/", allInputField);
      console.log(data.data);
     
      reset();
      setSetsubmitting(false);
    } catch (error: any) {
      setSetsubmitting(false);
      console.error(error);
      // toast.error(error.message);
    }
  };

  return (
    <div className="pb-10">
      <div
        style={{
          backgroundImage: "url(/ourservicebanner.svg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <p className=" text-white flex items-center justify-center text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold py-10">
          CONTACT US
        </p>
      </div>
      <div className=" flex justify-center items-center">
        <div className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-20">
          <div className="flex flex-col md:flex-row">
            <div>
              <div className="font-medium text-2xl pb-6">GET IN TOUCH</div>
              <div className="font-bold text-2xl pb-4">
                Visit one of our agancy locations or contact us today
              </div>
              <div>
                <div className="font-semibold pb-2">Head Office</div>
                <div className="flex gap-3 pb-3">
                  <Map className="text-primary-350" />
                  <p className="text-secondary-300 font-medium">
                    Kathmandu, Nepal
                  </p>
                </div>
                <div className="flex gap-3 pb-3">
                  <Mail className="text-primary-350" />
                  <p className="text-secondary-300 font-medium">
                    expert@gmail.com
                  </p>
                </div>
                <div className="flex gap-3 pb-3">
                  <Clock12 className="text-primary-350" />
                  <p className="text-secondary-300 font-medium">
                    Monday to Saturday, 9:00am to 16:00pm
                  </p>
                </div>
                <div className="flex gap-3 pb-3">
                  <Phone className="text-primary-350" />
                  <p className="text-secondary-300 font-medium">
                    +977 8459452343
                  </p>
                </div>
              </div>
            </div>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.41880561492!2d85.31555887425525!3d27.73522562426349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1926af72349f%3A0x6d9443f6be62d667!2sSamakhusi%20Chowk%20Bus%20Stop!5e0!3m2!1sen!2sin!4v1707028675666!5m2!1sen!2sin"
                className="w-full md:w-[400px] lg:w-[500px] xl:w-[600px]"
                height="400"
              ></iframe>
            </div>
          </div>
          <div className="text-secondary-350 mt-10">LEAVE A MESSAGE</div>
          <div className="md:grid grid-cols-2  gap-10">
           
            <form onSubmit={onSubmit}>

            <div>
              <p className="font-bold text-2xl py-5">Say Hello.</p>
              <div>
                <div className="lg:flex gap-10">
                  <div className="py-4  lg:w-1/2">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="border-2 w-full h-12 rounded-md pl-4"
                      {...register("name", { required: true })}
                    />
                  </div>
                  <div className="py-4 lg:w-1/2">
                    <input
                      type="text"
                      placeholder="E-Mail"
                      className="border-2 w-full h-12 rounded-md pl-4"
                      {...register("email", { required: true })}
                    />
                  </div>
                </div>
                <div className="py-4">
                  <input
                    type="text"
                    placeholder="Subject"
                    className="border-2 w-full h-12 rounded-md pl-4"
                    {...register("subject", { required: true })}
                  />
                </div>
                <div className="py-4">
                  <input
                    type="text"
                    placeholder="Your Messsage"
                    className="border-2 w-full h-12 rounded-md pl-4"
                    {...register("message", { required: true })}
                  />
                </div>
                
              </div>
              <button
              disabled={setsubmitting}
              type="submit"
                className="  h-8  my-5 w-20 bg-primary-350 text-white rounded-md justify-center items-center"
                
              >
                Submit
              </button>
              <Toaster />
            </div>

            </form>
            <div>
              <p className="font-bold text-2xl py-5">Need Help ?</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A
                officiis facere nihil illum. Error dicta repudiandae nam
                laboriosam commodi distinctio iste. Veritatis perferendis quo
                cupiditate ipsum quod voluptate tempore nam.
              </p>
              <button className=" flex h-10 gap-2 my-5 w-40 bg-primary-350 text-white rounded-md justify-center items-center">
                <MessageCircleMore />
                <p>Contact Us</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
