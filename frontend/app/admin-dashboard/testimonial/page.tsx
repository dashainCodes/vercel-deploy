"use client";
//main page of testimonial

import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { AxiosInstance } from "@/app/repositories/config";
import toast from "react-hot-toast";
import Link from "next/link";
import { Context } from "@/app/context/context";

export default function Page() {
  const [testimonialData, setTestimonialData] = useState([
    {
      name: "",
      description: "",
      image: "",
      testimonialId: "",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const loadTestimonialData = async () => {
      try {
        const { data } = await AxiosInstance.get("/testimonials");
        console.log(data);
        setTestimonialData(data.data);
        setRefresh(0);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    loadTestimonialData();
  }, [refresh]);

  useEffect(() => {
    setLoading(false);
  }, [testimonialData]);

  const handleDelete = async (testimonialId: string) => {
    try {
      const { data } = await AxiosInstance.delete(
        `/testimonials/${testimonialId}`
      );
      console.log(data.data);
      setRefresh(1);
    } catch (error) {
      console.error(error);
    }
  };

  const { user }: any = useContext(Context);

  return (
    <>
      {loading ? (
        <>
          <div>Loading</div>
        </>
      ) : (
        <>
          <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="items-start justify-between md:flex">
              <div className="max-w-lg">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                  Testimonials
                </h3>
              </div>
              <div className="mt-3 md:mt-0">
                <Link
                  href="/admin-dashboard/testimonial/add"
                  className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-700 md:text-sm"
                >
                  Add Testimonial
                </Link>
              </div>
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
              <table className="w-full table-auto text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                  <tr>
                    <th className="py-3 px-6">Name</th>
                    <th className="py-3 px-6">Description</th>
                    <th className="py-3 px-6">Content Image</th>
                    <th className="py-3 px-6"></th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
                  {testimonialData &&
                    testimonialData.length > 0 &&
                    testimonialData.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={item.image}
                            width="30px"
                            height="30px"
                          ></img>
                        </td>
                        <td className="text-right px-6 whitespace-nowrap">
                          <Link
                            href={`/admin-dashboard/testimonial/view/${item.testimonialId}`}
                            className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                          >
                            View
                          </Link>
                          {user && user.role == "super-admin" && (
                            <>
                              <Link
                                href={`/admin-dashboard/testimonial/edit/${item.testimonialId}`}
                                className="py-2 px-3 font-medium text-yellow-600 hover:text-yellow-500 duration-150 hover:bg-gray-50 rounded-lg"
                              >
                                Edit
                              </Link>
                            </>
                          )}

                          {user && user.role == "super-admin" && (
                            <>
                              <button
                                className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                                onClick={() => handleDelete(item.testimonialId)}
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
      )}
    </>
  );
}
