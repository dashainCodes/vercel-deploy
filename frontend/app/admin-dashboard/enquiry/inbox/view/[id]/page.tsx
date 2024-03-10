"use client";
//service enquiry view page

import React from "react";
import { useEffect, useState } from "react";
import { AxiosInstance } from "@/app/repositories/config";
import toast from "react-hot-toast";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  const [enquiryData, setEnquiryData] = useState({
    enquirerName: "",
    enquirerLocation: "",
    enquirerContactNo: "",
    companyName: "",
    enquirerMail: "",
    document: [],
    service: "",
    enquiryId: "",
    readStatus: false,
  });

  const pathName = usePathname();
  const enquiryId = pathName.split("/")[5];
  console.log(enquiryId);
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    const loadEnquiryData = async () => {
      try {
        const { data } = await AxiosInstance.get(`/enquiries/${enquiryId}`);
        if (data.data.readStatus === 'false') {
          console.log("called")
          const { data } = await AxiosInstance.patch(`/enquiries/${enquiryId}`);
          console.log(data.data);
        }
        console.log(data.data);
  
        setEnquiryData(data.data);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    loadEnquiryData();
  }, [enquiryId]);

  useEffect(() => {
    setLoading(false);
  }, [enquiryData]);
  const handleDelete = () => {};
  return (
    <>
      <Link href={`/admin-dashboard/enquiry/`} className="py-2 px-4">
        <FontAwesomeIcon icon={faArrowLeft} color="blue"></FontAwesomeIcon>
      </Link>

      <div className="flex flex-col overflow-y-auto h-[80%] px-4">
        <div className="flex flex-col gap-[1rem] w-full items-center">
          <div className="flex flex-col gap-[0.5rem] w-full">
            <div className="font-bold">Name</div>
            <div className="px-3 py-1 border-2 border-gray-300">
              {enquiryData?.enquirerName}
            </div>
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full ">
            <div className="font-bold">Location</div>
            <div className="px-3 py-1 border-2 border-gray-300">
              {enquiryData?.enquirerLocation}
            </div>
          </div>
          <div className="flex flex-row w-full gap-[1rem]">
            <div className="flex flex-col gap-[0.5rem] w-full">
              <div className="font-bold">Email Address</div>
              <div className="px-3 py-1 border-2 border-gray-300">
                {enquiryData?.enquirerMail}
              </div>
            </div>
            <div className="flex flex-col gap-[0.5rem] w-full">
              <div className="font-bold">Contact Number</div>
              <div className="px-3 py-1 border-2 border-gray-300">
                {enquiryData?.enquirerContactNo}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <div className="font-bold">Company Name</div>
            <div className="px-3 py-1 border-2 border-gray-300">
              {enquiryData?.companyName}
            </div>
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <div className="font-bold">Documents</div>
            <div className="px-3 py-1 flex flex-row gap-[0.5rem]">
              {enquiryData &&
                enquiryData.document?.length > 0 &&
                enquiryData.document.map((item, idx) => (
                  <img key={idx} src={item} width="75px" height="75px"></img>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
