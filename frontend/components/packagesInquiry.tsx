import Image from "next/image";
import React, { useState, ChangeEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import nepalflag from "../public/svgicons/twemoji_flag-nepal.svg";
import {useForm} from 'react-hook-form'
import { AxiosInstance } from "@/app/repositories/config";
const notify = () => toast.success("Inquiry successfully submitted!");

interface PackageEnquiryProps{
packageId:string;
}
const PackageEnquiry: React.FC<PackageEnquiryProps> = ({ packageId })=>{
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([]);
const {register,watch}=useForm()
const allInputField=watch()

 const onSubmit=async(e:any)=>{
  e.preventDefault()
  try {
    const formData=new FormData();
    formData.append("enquirerName",allInputField.enquirerName);
    formData.append("enquirerContactNo",allInputField.enquirerContactNo);
    formData.append("enquirerMail",allInputField.enquirerMail);
    formData.append("enquirerLocation",allInputField.enquirerLocation);
    formData.append("companyName",allInputField.companyName);
    formData.append("message",allInputField.message);
    formData.append("package",packageId);
    const selectedFiles=Array.from(allInputField.document)
    selectedFiles.forEach((value:any,index:any)=>{
      formData.append("document",value);
    })
   const {data}= await AxiosInstance.post('/package-enquiries',formData)
   console.log(data.data);
   toast.success(data.data.msg)

  } catch (error:any) {
    toast.error(error.message)
  }
 }

  return (
   <form onSubmit={onSubmit}>
     <div className="px-5 sm:px-10 md:px-16 overflow-hidden">
      <div>
        <div className="text-3xl font-bold pb-2">Start Up Inquiry Form</div>
        <div className="text-secondary-350 pb-2">
          Fill the required details information below to add new supplier.
        </div>
      </div>
      <div>
        <div className=" xl:flex justify-between pb-4 gap-10">
          <div className=" w-full">
            <input
              type="text"
              placeholder="Full Name"
              className="border-2 w-full h-12 rounded-md pl-4"
              {...register('enquirerName',{required:true})}
            />
          </div>
          <div className=" w-full pt-4 xl:pt-0">
            <input
              type="text"
              placeholder="Company full Name"
              className="border-2 w-full h-12 rounded-md pl-4"
              {...register('companyName',{required:true})}
            />
          </div>
        </div>

        <div className=" xl:flex justify-between gap-10">
          <div className=" w-full">
            <input
              type="text"
              placeholder="E-mail ID"
              className="border-2  h-12 w-full  rounded-md pl-4"
              {...register('enquirerMail',{required:true})}
            />
          </div>
          <div className="relative my-4 xl:my-0 w-full xl:flex items-start">
            <div className="absolute">
              <Image src={nepalflag} alt="img" className="h-6 w-6 mt-3 ml-4" />
            </div>
            <input
              type="text"
              placeholder="+977"
              className="border-2 h-12 w-full rounded-md pl-10"
              {...register('enquirerContactNo',{required:true})}
            />
          </div>
        </div>
        <div className="my-4">
          <input
            type="text"
            placeholder="Address"
            className="border-2 w-full h-12 rounded-md pl-4"
            {...register('enquirerLocation',{required:true})}
          />
        </div>
        <div className="my-4">
          <textarea
            className="border-2 p-4 rounded-md resize-none w-full"
            rows={3}
            cols={100}
            placeholder="Your Message"
            {...register('message')}
          />
        </div>
        <div className="flex gap-2 sm:gap-10 my-4">
          <div className="h-fit border-2 md:w-1/2">
            <div className="py-1 flex justify-center text-sm whitespace-nowrap">
              Upload Documents
            </div>
            <div className="relative bg-primary-350 w-fit rounded-3xl text-white mb-2 p-1 sm:p-2 sm:px-10 font-normal md:font-semibold mx-auto">
              <label
                htmlFor="fileInput"
                className="cursor-pointer text-sm whitespace-nowrap"
              >
                Browse file
              </label>
              <input
                type="file"
                id="fileInput"
                className="h-12 w-96 rounded-md pl-8 opacity-0 absolute top-0 left-0"
                {...register('document',{required:true})}
                multiple
              />
            </div>
          </div>
          <div className="flex flex-col ">
            <p className="text-sm whitespace-nowrap text-primary-350">
              {" "}
              Uploaded Documents
            </p>
            <ul>
              {uploadedDocuments.map((file, index) => (
                <li key={index} className="text-sm">{file.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <button
          className="h-12 w-36 mb-3 bg-primary-350 text-white rounded-md"
       type="submit"
        >
          Submit
        </button>
        <Toaster />
      </div>
    </div>
   </form>
  );
}

export default PackageEnquiry