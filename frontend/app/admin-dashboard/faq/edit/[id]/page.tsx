"use client"
import React, { useContext } from 'react'
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AxiosInstance } from "@/app/repositories/config";
import {toast} from "react-toastify";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { Context } from '@/app/context/context';

interface FaqData {
  heading: string;
  description: string;
}

export default function Page() {
  const { user }: any = useContext(Context);
  const { register, handleSubmit, watch, reset } = useForm();
  const allInputField = watch();
  const [setsubmitting, setSetsubmitting] = useState(false);
  const pathname = usePathname();
  console.log(pathname)
  const faqId = pathname.split("/")[4];
  console.log(faqId)
  const [faqData, setFaqData] = useState<FaqData>();


  useEffect(()=>{
    
  const fetchFaqdata = async () => {
    try {
      const { data } = await AxiosInstance.get(`/faqs/${faqId}`);
      setFaqData(data.data);
      console.log(data.data);
     
    } catch (error:any) {
      console.error(error);
      toast.error(error.message)
    }
  };
    fetchFaqdata()
  },[faqId])

  console.log(faqData)
  const onSubmit = async () => {
    try {
      setSetsubmitting(true);
      const { data } = await AxiosInstance.patch(
        `/faqs/${faqId}`,
        allInputField
      );
      console.log(data.data);
      toast.success(data.msg)
      setFaqData(data.data);
      setSetsubmitting(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
    {faqData && (
      <>
        <Link
          href={`/admin-dashboard/faq`}
          className="px-5 py-2"
        >
          <FontAwesomeIcon icon={faArrowLeft} color="blue"></FontAwesomeIcon>
        </Link>
        <form onSubmit={handleSubmit(onSubmit)}>
          {faqData && <div className="flex flex-col gap-[1rem] px-5 w-full items-center">
            <div className="flex flex-col gap-[0.5rem] w-full">
              <label>Question</label>
              <input
                type="text"
                {...register("heading", { required: true })}
                defaultValue={faqData.heading}
                className="px-3 py-1 border-2 border-gray-600 "
              />
            </div>
            <div className="flex flex-col gap-[0.5rem] w-full">
              <label>Description</label>
              <textarea
                {...register("description", { required: true })}
                className="px-3 py-1 border-2 border-gray-600 "
                defaultValue={faqData.description}
              />
            </div>
         
             <button
              type="submit"
              disabled={setsubmitting}
              className={`py-1 text-white rounded w-[10%] bg-blue-500 hover:bg-blue-600  ${
                setsubmitting && "bg-gray-400"
              }`}
            >
              {setsubmitting?"Updating":"Update"}
            </button>
           
          </div>}
        </form>
      </>
    )}
  </>
  )
}
