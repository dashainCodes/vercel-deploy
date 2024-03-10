"use client";
import React from "react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AxiosInstance } from "@/app/repositories/config";
import {toast} from 'react-toastify'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

interface JobData {
  position: string;
  timing: string;
  jobType: string;
  jobDuties:string[];
  qualification:string[];
  salary:string
  contentImage:string;
}

export default function Page() {
  const { register, handleSubmit, watch, reset } = useForm();
  const allInputField = watch();

  const [setsubmitting, setSetsubmitting] = useState(false);


  const [qualifications,setQualifications] = useState<string[]>([]);
  const [qualification,setQualification] = useState<string>("");
  const [jobDuty,setJobDuty] = useState<string>("");
  const [jobDuties,setJobDuties] = useState<string[]>([]);

  const handleRemoveQ = (element: string) => {
    let newArray = qualifications.filter((i, idx) => {
      return i !== element;
    });
    setQualifications(newArray);
  };
  
  const handleAddQ = () => {
    if (qualification.trim() !== "" && !qualifications.includes(qualification)) {
      setQualifications([...qualifications, qualification]);
      setQualification(""); // Clear the input field
    }
  };
  
  const handleRemoveJ = (element: string) => {
    let newArray = jobDuties.filter((i, idx) => {
      return i !== element;
    });
    setJobDuties(newArray);
  };
  
  const handleAddJ = () => {
    if (jobDuty.trim() !== "" && !jobDuties.includes(jobDuty)) {
      setJobDuties([...jobDuties, jobDuty]);
      setJobDuty(""); // Clear the input field
    }
  };
  
  const onSubmit = async (e:any) => {
   
    try {
      e.preventDefault()
      setSetsubmitting(true);
      const formData = new FormData();
      formData.append("position", allInputField.position);
      formData.append("timing", allInputField.timing);
      formData.append("jobType",allInputField.jobType);
      formData.append("salary",allInputField.salary);
      formData.append("contentImage",allInputField.contentImage[0]);
      qualifications.forEach((q: string, index: number) => {
        formData.append(`qualification[${index}]`, q);
      });
      jobDuties.forEach((j: string, index: number) => {
        formData.append(`jobDuties[${index}]`, j);
      });
      console.log(formData)
      const { data } = await AxiosInstance.post("/jobs/", formData);
      console.log(data.data);
      toast.success(data.msg)
      reset();
      setSetsubmitting(false);
    } catch (error: any) {
      setSetsubmitting(false);
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <>
    <Link href="/admin-dashboard/jobs/" className="px-5 py-2">
        <FontAwesomeIcon icon={faArrowLeft} color="blue"></FontAwesomeIcon>
      </Link>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <div className="flex flex-col gap-[1rem] w-full items-center px-5">
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Position</label>
            <input
              type="text"
              {...register("position", { required: true })}
              className="px-3 py-1 border-2 border-gray-600 "
            />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Job Timing</label>
            <input
              type="text"
              {...register("timing", { required: true })}
              className="px-3 py-1 border-2 border-gray-600 "
            />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Job type(On-site/remote)</label>
            <input
              type="text"
              {...register("jobType", { required: true })}
              className="px-3 py-1 border-2 border-gray-600 "
            />
          </div>

          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Qualifications</label>
            <div className="flex flex-row gap-[1rem]">
              <input
                type="text"
                placeholder="Add qualification..."
                value={qualification}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQualification(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddQ();
                  }
                }}
              />
              <button
                type="button"
                className="bg-blue-500 text-white hover:bg-blue-600 px-2 py-1 rounded"
                onClick={()=>handleAddQ()}
              >
                +
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {qualifications.length > 0 &&
                qualifications.map((item, idx) => (
                  <div className="flex flex-row gap-[0.5rem]" key={idx}>
                    <li>{item}</li>
                    <button
                      type="button"
                      className="bg-blue-500 text-white cursor-pointer px-2 py-1 rounded"
                      onClick={() => handleRemoveQ(item)}
                    >
                      -
                    </button>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Job Duties</label>
            <div className="flex flex-row gap-[1rem]">
              <input
                type="text"
                placeholder="Add duty..."
                value={jobDuty}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setJobDuty(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddJ();
                  }
                }}
              />
              <button
                type="button"
                className="bg-blue-500 text-white hover:bg-blue-600 px-2 py-1 rounded"
                onClick={()=>handleAddJ()}
              >
                +
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {jobDuties.length > 0 &&
                jobDuties.map((item, idx) => (
                  <div className="flex flex-row gap-[0.5rem]" key={idx}>
                    <li>{item}</li>
                    <button
                      type="button"
                      className="bg-blue-500 text-white cursor-pointer px-2 py-1 rounded"
                      onClick={() => handleRemoveJ(item)}
                    >
                      -
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Salary</label>
            <input
              type="text"
              {...register("salary", { required: true })}
              className="px-3 py-1 border-2 border-gray-600 "
            />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Content image</label>
            <input type="file" {...register("contentImage")} />
          </div>
         
          <button
          disabled={setsubmitting}
          type="submit"
            className={`py-1 text-white rounded w-[10%] bg-blue-500 hover:bg-blue-600 ${setsubmitting && "bg-gray-400"}`}
         
          >
            {setsubmitting? "Adding":"Add"}
          </button>
        </div>
      </form>
    </>
  );
}
