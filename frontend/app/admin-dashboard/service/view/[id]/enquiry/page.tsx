"use client";

import React from "react";
import { useEffect, useState } from "react";
import { AxiosInstance } from "@/app/repositories/config";
import toast from "react-hot-toast";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
 
  const [enquiryData, setEnquiryData] = useState([
    {
      enquirerName: "",
      enquirerLocation: "",
      enquirerContactNo:"",
      companyName:"",
      enquirerMail:"",
      document:"",
      service:"",
      enquiryId:""
    },
  ]);

const pathName=usePathname();
const serviceId=pathName.split('/')[4]
console.log(serviceId)

  const [loading, setLoading] = useState(false);
  //load faq data
  const loadEnquiryData = async () => {
    try {
      const { data } = await AxiosInstance.get("/service-enquiries");
      console.log(data);
      setEnquiryData(data.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    loadEnquiryData();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [enquiryData]);
const handleDelete=()=>{

}
  return (
    <>
 
        
        <Link href={`/admin-dashboard/service/view/${serviceId}`} className=" py-2">
            <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
          </Link>
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Enquiries
          </h3>
        
        </div>
        <div className="mt-3 md:mt-0">
          <Link
            href={`/admin-dashboard/service/view/${serviceId}/enquiry/add`}
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            
          >
            Add Enquiries
          </Link>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Location</th>
              <th className="py-3 px-6">Mailing Address</th>
              <th className="py-3 px-6">Contact Number</th>
              <th className="py-3 px-6">Company Name</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {enquiryData &&
              enquiryData.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.enquirerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.enquirerLocation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.enquirerMail}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.enquirerContactNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.companyName}
                  </td>
                  <td className="text-right px-6 whitespace-nowrap">
                    <Link
                      href={`/admin-dashboard/service/view/${serviceId}/enquiry/view/${item.enquiryId}`}
                      className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                    
                    >
                      View
                    </Link>
                    <button className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                    onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
       
    </>
  );
};
