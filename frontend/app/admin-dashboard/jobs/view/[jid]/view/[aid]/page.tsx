"use client";
//each application view page
import React from "react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AxiosInstance } from "@/app/repositories/config";
import toast from "react-hot-toast";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface applicationData {
  name: string;
  phoneNo: string;
  email: string;
  address: string;
  document: string[];
  coverLetter: string;
  job: string;
}

export default function Page() {
  const pathname = usePathname();
  const jobId = pathname.split("/")[4];
  console.log(jobId);
  const applicationId = pathname.split("/")[6];
  console.log(applicationId);
  const [applicationData, setApplicationData] = useState<applicationData>();
  const [refresh, setRefresh] = useState(0);
  //to extract id

 
  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        const { data } = await AxiosInstance.get(`/applications/${applicationId}`);
        console.log(data.data);
        setApplicationData(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApplicationData();
  }, [applicationId]);

  return (
    <>
      <Link
        href={`/admin-dashboard/jobs/view/${jobId}/`}
        className="py-2 px-5"
      >
        <FontAwesomeIcon icon={faArrowLeft} color="blue"></FontAwesomeIcon>
      </Link>
      <div className="flex flex-col overflow-y-auto h-[80%] px-5">
        <div className="flex flex-col gap-[1rem] w-full items-center">
          <div className="flex flex-col gap-[0.5rem] w-full">
            <div className="text-gray-800 font-bold">Applicant Name</div>
            <div className="px-3 py-1 border-2 border-gray-300">
              {applicationData?.name}
            </div>
          </div>
          
          <div className="flex flex-row gap-[1rem] w-full justify-between">
            <div className="flex flex-col gap-[0.5rem] w-full ">
              <div className="text-gray-800 font-bold">Email address</div>
              <div className="px-3 py-1 border-2 border-gray-300">
                {applicationData?.email}
              </div>
            </div>

            <div className="flex flex-col gap-[0.5rem] w-full">
              <div className="text-gray-800 font-bold">Location</div>
              <div className="px-3 py-1 border-2 border-gray-300">
                {applicationData?.address}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <div className="text-gray-800 font-bold">Phone Number</div>
            <div className="px-3 py-1 border-2 border-gray-300">
              {applicationData?.phoneNo}
            </div>
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <div className="text-gray-800 font-bold">Document</div>
            <div className="px-3 py-1 border-2 border-gray-300 flex flex-row gap-[0.5rem]">
              {applicationData?.document?.length && applicationData?.document?.length >0 && applicationData.document.map((item,index)=>(
<img src={item} key={index} width={75} height={75}/>
              ))}
            </div>
          </div>
         {
          applicationData?.coverLetter && (<>
           <div className="flex flex-col gap-[0.5rem] w-full">
            <div className="text-gray-800 font-bold">Cover Letter</div>
            <div className="px-3 py-1 border-2 border-gray-300">
             <img src= {applicationData?.coverLetter} height={75} width={75}/>
            </div>
          </div>
          </>)
         }
        </div>
      </div>
    </>
  );
}
