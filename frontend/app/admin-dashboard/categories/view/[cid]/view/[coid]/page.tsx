"use client";
//each deal view page
import React from "react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AxiosInstance } from "@/app/repositories/config";
import toast from "react-hot-toast";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface dealData {
  companyName: string;
  companyMail: string;
  companyLocation: string;
  heading: string;
  description: string;
  businessConcept: string;
  contentImage: string;
  dealId: string;
  companyLogo: string;
  conceptOfBusiness: string[];
}

export default function Page() {
  const pathname = usePathname();
  const categoryId = pathname.split("/")[4];
  console.log(categoryId);
  const dealId = pathname.split("/")[6];
  console.log(dealId);
  const [dealData, setDealData] = useState<dealData>();
  const [refresh, setRefresh] = useState(0);
  //to extract id

 
  useEffect(() => {
    const fetchDealData = async () => {
      try {
        const { data } = await AxiosInstance.get(`/deals/${dealId}`);
        console.log(data.data);
        setDealData(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDealData();
  }, [dealId]);

  return (
    <>
      <Link
        href={`/admin-dashboard/categories/view/${categoryId}/`}
        className="px-5 py-2"
      >
        <FontAwesomeIcon icon={faArrowLeft} color="blue"></FontAwesomeIcon>
      </Link>
      <div className="flex px-5 flex-col overflow-y-auto h-[80%]">
        <div className="flex flex-col gap-[1rem] w-full items-center">
          <div className="flex flex-col gap-[0.5rem] w-full">
            <div className="text-gray-800 font-bold">Company Name</div>
            <div className="px-3 py-1 border-2 border-gray-300">
              {dealData?.companyName}
            </div>
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <div className="text-gray-800 font-bold">Logo</div>
            <div className="px-3 py-1 ">
              <img src={dealData?.companyLogo} width="75px" height="75px"></img>
            </div>
          </div>
          <div className="flex flex-row gap-[1rem] w-full justify-between">
            <div className="flex flex-col gap-[0.5rem] w-full ">
              <div className="text-gray-800 font-bold">Email address</div>
              <div className="px-3 py-1 border-2 border-gray-300">
                {dealData?.companyMail}
              </div>
            </div>

            <div className="flex flex-col gap-[0.5rem] w-full">
              <div className="text-gray-800 font-bold">Location</div>
              <div className="px-3 py-1 border-2 border-gray-300">
                {dealData?.companyLocation}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <div className="text-gray-800 font-bold">Heading</div>
            <div className="px-3 py-1 border-2 border-gray-300">
              {dealData?.heading}
            </div>
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <div className="text-gray-800 font-bold">Description</div>
            <div className="px-3 py-1 border-2 border-gray-300">
              {dealData?.description}
            </div>
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <div className="text-gray-800 font-bold">Business Concept</div>
            <div className="px-3 py-1 border-2 border-gray-300">
              {dealData?.businessConcept}
            </div>
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <div className="text-gray-800 font-bold">Concept of Business</div>
            <div className=" flex flex-col gap-[0.5rem] px-3 py-1 ">
              {dealData?.conceptOfBusiness.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
