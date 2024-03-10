"use client";

import React from "react";
import { useEffect, useState } from "react";
import { AxiosInstance } from "@/app/repositories/config";
import { toast } from "react-toastify";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Outbox() {
  const [replyData, setReplyData] = useState([
    {
      recieverMail: "",
      createdAt: "",
      subject: "",
      body: "",
      sender: "",
      emailId: "",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  //load reply data

  useEffect(() => {
    const loadReplyData = async () => {
      try {
        setRefresh(0);
        const { data } = await AxiosInstance.get("/emails");
        console.log(data);
        setReplyData(data.data);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    loadReplyData();
  }, [refresh]);

  useEffect(() => {
    setLoading(false);
  }, [replyData]);

  const handleDelete = async (emailId: string) => {
    try {
      const { data } = await AxiosInstance.delete(`/emails/${emailId}`);
      console.log(data.data);
      setRefresh(1);
    } catch (error) {}
  };

  
  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8  w-full">
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Recievers email</th>
                <th className="py-3 px-6">Subject</th>
                <th className="py-3 px-6">Message</th>
                <th className="py-3 px-6">Sent on</th>
                {/* <th className="py-3 px-6">Company Name</th>
                <th className="py-3 px-6">Subject</th> */}
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y ">
              {replyData &&
                replyData.map((item, idx) => (
                  <tr key={idx}>
                    <td
                      className={`px-6 py-4 whitespace-nowrap  "
                      }`}
                    >
                      {item.recieverMail}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap  "
                      }`}
                    >
                      {item.subject}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap  "
                      }`}
                    >
                      {item.body.length > 10
                        ? item.body.slice(0, 10) + "..."
                        : item.body}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap  "
                      }`}
                    >
                      {item.createdAt.slice(0, 10)}
                    </td>
                    <td className="text-right px-6 whitespace-nowrap">
                      <Link
                        href={`/admin-dashboard/enquiry/outbox/view/${item.emailId}`}
                        className={`py-2 px-3 font-medium  duration-150 hover:bg-gray-50 rounded-lg `}
                      >
                        View
                      </Link>

                      <button
                        className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                        onClick={() => handleDelete(item.emailId)}
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
