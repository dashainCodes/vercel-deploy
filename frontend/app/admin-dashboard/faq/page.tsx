"use client";

import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { AxiosInstance } from "@/app/repositories/config";
import { toast } from "react-toastify";
import Link from "next/link";
import { Context } from "@/app/context/context";

interface OutFaq {
  heading: string;
  description: string;
  faqId: string;
}

export default function Page() {
  const [faqDatas, setFaqDatas] = useState<OutFaq[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);
  //load faq data

  useEffect(() => {
    const loadFaqData = async () => {
      try {
        setLoading(true);
        const { data } = await AxiosInstance.get("/faqs");
        console.log(data);
        setFaqDatas(data.data);
        setLoading(false);
        setRefresh(0);
      } catch (error: any) {
        toast.error(error.response.data.msg);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    loadFaqData();
  }, [refresh]);

  console.log(faqDatas);

  const handleDelete = async (faqId: string) => {
    try {
      const { data } = await AxiosInstance.delete(`/faqs/${faqId}`);
      console.log(data);
      toast.success(data.msg); // Log the response data
      setRefresh(1);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const { user }: any = useContext(Context);

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Frequently Asked Questions
            </h3>
          </div>
          <div className="mt-3 md:mt-0">
            <Link
              href={`/admin-dashboard/faq/add/`}
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-700 md:text-sm"
            >
              Add FAQ
            </Link>
          </div>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Question</th>
                <th className="py-3 px-6">Description</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {faqDatas &&
                faqDatas.length > 0 &&
                faqDatas.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.heading}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.description}
                    </td>

                    <td className="text-right px-6 whitespace-nowrap">
                      <Link
                        href={`faq/view/${item.faqId}`}
                        className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        View
                      </Link>
                      {user && user.role =="super-admin" && ( <Link
                        href={`faq/edit/${item.faqId}`}
                        className="py-2 px-3 font-medium text-yellow-600 hover:text-yellow-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        Edit
                      </Link>)}
                     
                      {user && user.role =="super-admin" && (
                        <>
                          <button
                            className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                            onClick={() => handleDelete(item.faqId)}
                          >
                            Delete
                          </button>
                        </>
                      )}
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
