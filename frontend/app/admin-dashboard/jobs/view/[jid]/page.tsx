//view page of each job
"use client";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AxiosInstance } from "@/app/repositories/config";
import toast from "react-hot-toast";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Context } from "@/app/context/context";

interface JobData {
  position: string;
  timing: string;
  jobType: string;
  jobDuties: string;
  qualification: string;
  salary: string;
  contentImage: string;
  _id: string;
}

export default function Page() {
  const pathname = usePathname();
  const jobId = pathname.split("/")[4];
  console.log(jobId);

  const [jobData, setJobData] = useState<JobData>();
  const [applicationData, setApplicationData] = useState<any>();
  const [refresh, setRefresh] = useState(0);
  //to extract id

  useEffect(() => {
    const fetchJobdata = async () => {
      try {
        const { data } = await AxiosInstance.get(`/jobs/${jobId}`);
        console.log(data.data);
        setJobData(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobdata();
  }, [jobId]);

  useEffect(() => {
    if (jobData?._id) {
      const fetchApplicationdata = async () => {
        try {
          setRefresh(0);
          const { data } = await AxiosInstance.get(
            `/applications/info/${jobData?._id}`
          );
          console.log(data.data);
          setApplicationData(data.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchApplicationdata();
    }
  }, [jobData?._id]);

  const handleDelete = async (applicationId: string) => {
    try {
      const { data } = await AxiosInstance.delete(
        `/applications/${applicationId}`
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
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              {jobData && ` Applications for ${jobData.position}`}
            </h3>
          </div>
        </div>
        <Link href={`/admin-dashboard/jobs/`} className="py-2">
          <FontAwesomeIcon icon={faArrowLeft} color="blue" />
        </Link>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Location</th>
                <th className="py-3 px-6">Email Address</th>
                <th className="py-3 px-6">Contact number</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {applicationData &&
                applicationData.length > 0 &&
                applicationData.map((item: any, idx: any) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.phoneNo}
                    </td>
                    <td className="text-right px-6 whitespace-nowrap">
                      <Link
                        href={`/admin-dashboard/jobs/view/${jobId}/view/${item.applicationId}`}
                        className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        View
                      </Link>
                      {user && user.role == "super-admin" && (
                        <button
                          className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                          onClick={() => handleDelete(item.applicationId)}
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
