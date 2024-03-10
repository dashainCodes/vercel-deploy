//contact page
"use client";

import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { AxiosInstance } from "@/app/repositories/config";
import toast from "react-hot-toast";
import Link from "next/link";
import { Context } from "@/app/context/context";

interface Contact {
  name: string;
  email: string;
  subject: string;
  message: string;
  contactId: string;
}

export default function Page() {
  const [contactDatas, setContactDatas] = useState<Contact[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);
  //load contact data
  const loadContactData = async () => {
    try {
      setLoading(true);
      const { data } = await AxiosInstance.get("/contacts");
      console.log(data);
      setContactDatas(data.data);
      setLoading(false);
      setRefresh(0);
    } catch (error: any) {
      toast.error(error.response.data.msg);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadContactData();
  }, [refresh]);

  console.log(contactDatas);

  const handleDelete = async (contactId: string) => {
    try {
      const { data } = await AxiosInstance.delete(`/contacts/${contactId}`);
      console.log(data); // Log the response data
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
              Contacts
            </h3>
          </div>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Subject</th>
                <th className="py-3 px-6">Message</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {contactDatas &&
                contactDatas.length > 0 &&
                contactDatas.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.message}
                    </td>
                    <td className="text-right px-6 whitespace-nowrap">
                      <Link
                        href={`/admin-dashboard/Contacts/view/${item.contactId}`}
                        className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        View
                      </Link>
                      {user && user.role =="super-admin" && (
                        <>
                          <button
                            className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                            onClick={() => handleDelete(item.contactId)}
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
