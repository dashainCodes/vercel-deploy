"use client";

import React from "react";
import { useEffect, useState } from "react";
import { AxiosInstance } from "@/app/repositories/config";
import toast from "react-hot-toast";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Inbox() {
  const [enquiryData, setEnquiryData] = useState([
    {
      enquirerName: "",
      enquirerLocation: "",
      enquirerContactNo: "",
      companyName: "",
      enquirerMail: "",
      document: "",
      service: "",
      enquiryId: "",
      deal: "",
      readStatus: "false",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  //load faq data
  const loadEnquiryData = async () => {
    try {
      setRefresh(0);
      const { data } = await AxiosInstance.get("/enquiries");
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

  const handleUpdateStatus = async () => {
    try {
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (enquiryId: string) => {
    try {
      const { data } = await AxiosInstance.delete(`/enquiries/${enquiryId}`);
      setRefresh(1);
    } catch (error) {}
  };
  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 w-full">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            {/* <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Enquiries
            </h3> */}
          </div>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Name</th>
               
                <th className="py-3 px-6">Contact Number</th>
                <th className="py-3 px-6">Company Name</th>
                <th className="py-3 px-6">Subject</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y ">
              {enquiryData &&
                enquiryData.map((item, idx) => (
                  <tr key={idx}>
                    <td
                      className={`px-6 py-4 whitespace-nowrap ${
                        item.readStatus == "false" && "font-bold  "
                      } `}
                    >
                      {item.enquirerName}
                    </td>
                    {/* <td
                      className={`px-6 py-4 whitespace-nowrap ${
                        item.readStatus == "false" && "font-bold  "
                      }`}
                    >
                      {item.enquirerLocation}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap ${
                        item.readStatus == "false" && "font-bold  "
                      }`}
                    >
                      {item.enquirerMail}
                    </td> */}
                    <td
                      className={`px-6 py-4 whitespace-nowrap ${
                        item.readStatus == "false" && "font-bold  "
                      }`}
                    >
                      {item.enquirerContactNo}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap ${
                        item.readStatus == "false" && "font-bold  "
                      }`}
                    >
                      {item.companyName}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap ${
                        item.readStatus == "false" && "font-bold  "
                      }`}
                    >
                      {item.service || item.service === null
                        ? "service"
                        : "deal"}
                    </td>
                    <td className="text-right px-6 whitespace-nowrap">
                      <Link
                        href={`/admin-dashboard/enquiry/inbox/view/${item.enquiryId}`}
                        onClick={handleUpdateStatus}
                        className={`py-2 px-3 font-medium  duration-150 hover:bg-gray-50 rounded-lg ${
                          item.readStatus == "true"
                            ? "text-purple-700 hover:text-purple-800"
                            : "text-blue-500 hover:text-blue-600"
                        }`}
                      >
                        {item.readStatus == "true" ? "Viewed" : "View"}
                      </Link>
                      <Link
                        href={`/admin-dashboard/enquiry/inbox/reply/${item.enquiryId}`}
                        className="py-2 px-3 font-medium text-yellow-600 hover:text-yellow-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        Reply
                      </Link>
                      <button
                        className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                        onClick={() => handleDelete(item.enquiryId)}
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
}
