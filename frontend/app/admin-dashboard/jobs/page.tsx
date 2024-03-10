//main page of job positions
"use client";

import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { AxiosInstance } from "@/app/repositories/config";
import toast from "react-hot-toast";
import Link from "next/link";
import { Context } from "@/app/context/context";

export default function Page() {
  const [jobData, setJobData] = useState([
    {
      position: "",
      timing: "",
      jobType: "",
      jobId: "",
      qualification: [],
      jobDuties: [],
      salary: "",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const loadPositionData = async () => {
    try {
      const { data } = await AxiosInstance.get("/jobs");
      console.log(data);
      setJobData(data.data);
      setRefresh(0);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    loadPositionData();
  }, [refresh]);

  useEffect(() => {
    setLoading(false);
  }, [jobData]);

  const handleDelete = async (jobId: string) => {
    try {
      const { data } = await AxiosInstance.delete(`/jobs/${jobId}`);
      console.log(data.data);
      setRefresh(1);
    } catch (error) {
      console.error(error);
    }
  };
  const { user }: any = useContext(Context);
  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Job Positions
            </h3>
          </div>
          <div className="mt-3 md:mt-0">
            <Link
              href="/admin-dashboard/jobs/add"
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-700 md:text-sm"
            >
              Add Jobs
            </Link>
          </div>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Job position</th>
                <th className="py-3 px-6">Timing</th>
                <th className="py-3 px-6">Job-type(remote/on-site)</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {jobData &&
                jobData.length > 0 &&
                jobData.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.timing}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.jobType}
                    </td>
                    <td className="text-right px-6 whitespace-nowrap">
                      <Link
                        href={`/admin-dashboard/jobs/view/${item.jobId}`}
                        className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        View
                      </Link>
                      {user && user.role == "super-admin" && (
                        <>
                          <Link
                            href={`/admin-dashboard/jobs/edit/${item.jobId}`}
                            className="py-2 px-3 font-medium text-yellow-600 hover:text-yellow-500 duration-150 hover:bg-gray-50 rounded-lg"
                          >
                            Edit
                          </Link>
                        </>
                      )}

                      {user && user.role == "super-admin" && (
                        <button
                          className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                          onClick={() => handleDelete(item.jobId)}
                        >
                          Delete
                        </button>
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
