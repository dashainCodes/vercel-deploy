"use client";
//outbox view page

import React from "react";
import { useEffect, useState } from "react";
import { AxiosInstance } from "@/app/repositories/config";
import {toast} from 'react-toastify'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  const [emailData, setEmailData] = useState({
   emailId:"",
   recieverMail:"",
   createdAt:"",
   body:"",
   subject:"",
   documents:[]
  });

  const pathName = usePathname();
  const emailId = pathName.split("/")[5];
  console.log(emailId);
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    const loadEmailData = async () => {
      try {
        const { data } = await AxiosInstance.get(`/emails/${emailId}`);
       
          console.log(data.data);
       
  
        setEmailData(data.data);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    loadEmailData();
  }, [emailId]);

  useEffect(() => {
    setLoading(false);
  }, [emailData]);
  const handleDelete = async(emailId:any) => {
    try {
        const {data}=await AxiosInstance.delete(`/emails/${emailId}`);
    toast.success(data.msg)
    } catch (error:any) {
        toast.error(error.message)
    }
  };
  return (
    <>
      <Link href={`/admin-dashboard/enquiry/`} className="py-2 px-4">
        <FontAwesomeIcon icon={faArrowLeft} color="blue"></FontAwesomeIcon>
      </Link>

      <div className="flex flex-col overflow-y-auto h-[80%]">
        <div className="flex flex-col gap-[1rem] w-full items-center">
          <div className="flex flex-col gap-[0.5rem] w-full">
            <div className="font-bold">Reciever email address</div>
            <div className="px-3 py-1 border-2 border-gray-300">
              {emailData?.recieverMail}
            </div>
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full ">
            <div className="font-bold">Subject</div>
            <div className="px-3 py-1 border-2 border-gray-300">
              {emailData?.subject}
            </div>
          </div>
          <div className="flex flex-row w-full gap-[1rem]">
            <div className="flex flex-col gap-[0.5rem] w-full">
              <div className="font-bold">Message</div>
              <div className="px-3 py-1 border-2 border-gray-300">
                {emailData?.body}
              </div>
            </div>
            <div className="flex flex-col gap-[0.5rem] w-full">
              <div className="font-bold">Sent on</div>
              <div className="px-3 py-1 border-2 border-gray-300">
                {emailData?.createdAt.slice(0,10)}
              </div>
            </div>
          </div>
        
          <div className="flex flex-col gap-[0.5rem] w-full">
            <div className="font-bold">Documents</div>
            <div className="px-3 py-1 flex flex-row gap-[0.5rem]">
              {emailData &&
                emailData.documents?.length > 0 &&
                emailData.documents.map((item, idx) => (
                  <img key={idx} src={item} width="75px" height="75px"></img>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
