"use client";
import React from "react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AxiosInstance } from "@/app/repositories/config";
import toast from "react-hot-toast";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

interface EnquiryData {
  enquirerName: string;
  enquirerLocation: string;
  enquirerMail: string;
  enquirerContactNo: string;
  companyName: string;
  document: string[];
  service: "";
  enquiryId: "";
}

export default function Page() {
  const { register, handleSubmit, watch, reset } = useForm();
  const allInputField = watch();
  const [expertiseInputs, setExpertiseInputs] = useState([""]);
  const pathName = usePathname();
  const serviceId = pathName.split("/")[4];
  console.log(serviceId);
  const [objectId, setObjectId] = useState("");
  const [setsubmitting, setSetsubmitting] = useState(false);

  //to get objectid of service

  useEffect(() => {
    const getService = async () => {
      try {
        const { data } = await AxiosInstance.get(`/services/${serviceId}`);
        console.log(data.data?._id);
        setObjectId(data.data._id);
      } catch (error) {
        console.log(error);
      }
    };
    getService();
  }, [serviceId]);

  const onSubmit = async () => {
    setSetsubmitting(true);
    const formData = new FormData();
    formData.append("enquirerName", allInputField.enquirerName);
    formData.append("enquirerLocation", allInputField.enquirerLocation);
    formData.append("enquirerMail", allInputField.enquirerMail);
    formData.append("enquirerContactNo", allInputField.enquirerContactNo);
    formData.append("companyName", allInputField.companyName);
    formData.append("document", allInputField.document);
    const images = allInputField.document;
     // Assuming 'document' holds an array of File objects
     console.log(typeof(images));
     console.log(images)
    images?.forEach((image:string, index:number) => {
      formData.append(`document${index}`, image); // Append each image with a unique key
    });
    console.log(allInputField.document);
    console.log(formData);
    try {
      if (objectId) {
        const { data } = await AxiosInstance.post("/service-enquiries", {
          ...formData,
          service: objectId,
        });

        console.log(data.data);
        reset();
      }
      setSetsubmitting(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Link
        href={`/admin-dashboard/service/view/${serviceId}/enquiry`}
        className=" py-2"
      >
        <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-[1rem] w-full items-center">
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Name</label>
            <input
              type="text"
              {...register("enquirerName", { required: true })}
              className="px-3 py-1 border-2 border-gray-600 "
            />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Location</label>
            <input
              type="text"
              {...register("enquirerLocation", { required: true })}
              className="px-3 py-1 border-2 border-gray-600 "
            />
          </div>

          <div className="flex flex-row gap-[0.5rem]">
            <div className="flex flex-col gap-[0.5rem] w-full">
              <label>Email Address</label>
              <input
                type="text"
                {...register("enquirerMail", { required: true })}
                className="px-3 py-1 border-2 border-gray-600 "
              />
            </div>
            <div className="flex flex-col gap-[0.5rem] w-full">
              <label>Contact Number</label>
              <input
                type="text"
                {...register("enquirerContactNo", { required: true })}
                className="px-3 py-1 border-2 border-gray-600 "
              />
            </div>
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Company Name</label>
            <input
              type="text"
              {...register("companyName", { required: true })}
              className="px-3 py-1 border-2 border-gray-600 "
            />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Documents</label>
            <input
              type="file"
              {...register("document", { required: true })}
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
            Add
          </button>
        </div>
      </form>
    </>
  );
}
