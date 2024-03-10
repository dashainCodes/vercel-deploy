"use client";
import React from "react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AxiosInstance } from "@/app/repositories/config";
import { toast } from "react-toastify";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

export default function Page() {
  const { register, handleSubmit, watch, reset } = useForm();
  const allInputField = watch();
  const pathName = usePathname();
  const enquiryId = pathName.split("/")[5];
  console.log(enquiryId);
  const [setsubmitting, setSetsubmitting] = useState(false);
  const [enquiryData, setEnquiryData] = useState({
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
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await AxiosInstance.get(`/enquiries/${enquiryId}`);
      console.log(data.data);
      setEnquiryData(data.data);
    };

    fetchData();
  }, [enquiryId]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setSetsubmitting(true);
      const formData = new FormData();
      console.log(allInputField);
      formData.append("recieverMail", allInputField.recieverMail);
      formData.append("subject", allInputField.subject);
      formData.append("body", allInputField.body);
      
     
      const images = Array.from(allInputField.documents); // Convert FileList to array
      console.log(images);
      images.forEach((image: any, index) => {
        formData.append(`documents`, image);
      });

      console.log(formData);

      const { data } = await AxiosInstance.post("/emails", formData);
      console.log(data.data);
      setSetsubmitting(false);
      toast.success(data.msg);
    } catch (error: any) {
      setSetsubmitting(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Link href={`/admin-dashboard/enquiry/`} className=" py-2">
        <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
      </Link>
      <form onSubmit={onSubmit}>
        {enquiryData && (
          <div className="flex flex-col gap-[1rem] w-full items-center">
            <div className="flex flex-col gap-[0.5rem] w-full">
              <label>To</label>
              <input
                type="text"
                {...register("recieverMail", { required: true })}
                // value={enquiryData.enquirerMail}
                defaultValue={enquiryData.enquirerMail}
                className="px-3 py-1 border-2 border-gray-600 "
              />
            </div>
            <div className="flex flex-col gap-[0.5rem] w-full">
              <label>Subject</label>
              <input
                type="text"
                {...register("subject", { required: true })}
                className="px-3 py-1 border-2 border-gray-600 "
              />
            </div>

            <div className="flex flex-row gap-[0.5rem] w-full">
              <div className="flex flex-col gap-[0.5rem] w-full">
                <label>body</label>
                <textarea
                  {...register("body", { required: true })}
                  className="px-3 py-1 border-2 border-gray-600 "
                />
              </div>
            </div>
            <div className="flex flex-col gap-[0.5rem] w-full">
              <label>Documents</label>
              <input
                type="file"
                {...register("documents")}
                multiple
                className="px-3 py-1 border-2 border-gray-600 "
              />
            </div>
            <button
              disabled={setsubmitting}
              type="submit"
              className={`py-1 text-white rounded w-[10%] bg-blue-500 hover:bg-blue-300 ${
                setsubmitting && "bg-gray-400"
              } `}
            >
              Send
            </button>
          </div>
        )}
      </form>
    </>
  );
}
