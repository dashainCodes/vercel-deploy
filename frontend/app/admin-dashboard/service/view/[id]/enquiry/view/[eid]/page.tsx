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
  });

  const pathName = usePathname();
  const serviceId = pathName.split("/")[4];
  console.log(serviceId);
  const enquiryId = pathName.split("/")[7];

  const [loading, setLoading] = useState(false);
  //load faq data
 
  useEffect(() => {
    const loadEnquiryData = async () => {
      try {
        const { data } = await AxiosInstance.get(
          `/service-enquiries/serviceenquiry/${enquiryId}`
        );
        console.log(data);
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
      <Link
        href={`/admin-dashboard/service/view/${serviceId}/enquiry`}
        className="py-2"
      >
        <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
      </Link>

      <div className="flex flex-col overflow-y-auto h-[80%]">
        <div className="flex flex-col gap-[1rem] w-full items-center">
          <div className="flex flex-col gap-[0.5rem] w-full">
            <div>Name</div>
            <div className="px-3 py-1 bg-gray-200">
              {enquiryData?.enquirerName}
            </div>
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full ">
            <div>Location</div>
            <div className="px-3 py-1 bg-gray-200">{enquiryData?.enquirerLocation}</div>
          </div>
          <div className="flex flex-row w-full gap-[1rem]">
            <div className="flex flex-col gap-[0.5rem] w-full">
              <div>Email Address</div>
              <div className="px-3 py-1 bg-gray-200">
                {enquiryData?.enquirerMail}
              </div>
            </div>
            <div className="flex flex-col gap-[0.5rem] w-full">
              <div>Contact Number</div>
              <div className="px-3 py-1 bg-gray-200">
                {enquiryData?.enquirerContactNo}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <div>Company Name</div>
            <div className="px-3 py-1 bg-gray-200">
              {enquiryData?.companyName}
            </div>
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <div>Documents</div>
            <div className="px-3 py-1 bg-gray-200">
              {enquiryData && enquiryData.document?.length>0 && enquiryData.document.map((item, idx) => (
                <img key={idx} src={item} width="100px" height="100px"></img>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
