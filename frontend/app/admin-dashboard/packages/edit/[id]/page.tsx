"use client";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosInstance } from "@/app/repositories/config";
import {toast} from 'react-toastify'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import { Context } from "@/app/context/context";

interface packageData {
  heading: string;
  descriptionLong: string;
  bgImage: string;
  normalImage: string;
  expertises: string[];
  name:string;
}
export default function Page() {
  const { register, handleSubmit, reset, watch } = useForm();
  const [expertiseInput, setExpertiseInput] = useState("");
  const [expertiseInputs, setExpertiseInputs] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const { user }: any = useContext(Context);
  const [packageData, setPackageData] = useState<packageData>();
  const pathName = usePathname();
  const packageId = pathName.split("/")[4];
  console.log(packageId)
  const allInputField = watch();
  console.log(allInputField);

  const handleRemove = (element: string) => {
    const newArray = expertiseInputs.filter((item) => item !== element);
    setExpertiseInputs(newArray);
  };

  const handleAdd = () => {
    if (expertiseInput && !expertiseInputs.includes(expertiseInput)) {
      setExpertiseInputs((prev) => [...prev, expertiseInput]);
      setExpertiseInput("");
    }
  };


  useEffect(() => {
    const getData = async () => {
      const { data } = await AxiosInstance.get(`/packages/${packageId}`);
      console.log(data.data);
      setPackageData(data.data);
    
    };
    getData();
  }, [packageId]);

  useEffect(() => {
   const setExp=()=>{
    if (packageData) {
      setExpertiseInputs(prevInputs => [...prevInputs, ...packageData.expertises]);
      console.log(expertiseInputs);
    }
   }
   setExp();
  }, [packageData]);
  

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("heading", allInputField.heading);
      formData.append("bgImage", allInputField.bgImage[0]);
      formData.append("normalImage", allInputField.normalImage[0]);
      formData.append("descriptionLong", allInputField.descriptionLong);
      formData.append("name", allInputField.name);
      expertiseInputs.forEach((expertise: string, index: number) => {
        formData.append(`expertises[${index}]`, expertise);
      });
      const { data } = await AxiosInstance.patch(
        `/packages/${packageId}`,
        formData
      );
      console.log(data.data);
      setPackageData(data.data);
      toast.success(data.msg)
      console.log(packageData);
      setExpertiseInputs([]);
      setSubmitting(false);
    } catch (error: any) {
      setSubmitting(false);
      console.error(error);
      toast.error(error.message);
    }
  };
  console.log(packageData)

  return (
    <>
      <a href="/admin-dashboard/packages/" className="px-5 py-2">
        <FontAwesomeIcon icon={faArrowLeft} color="blue"></FontAwesomeIcon>
      </a>
      <form onSubmit={onSubmit}>
       {packageData && <div>
          <div className="flex flex-col gap-[1rem] w-full items-center px-5">
            <div className="flex flex-col gap-[0.5rem] w-full">
              <label>Heading</label>
              <input
                type="text"
                {...register("heading")}
                defaultValue={packageData?.heading}
                // value={packageData?.heading}

                className="px-3 py-1 border-2 border-gray-600 "
              />
            </div>
            <div className="flex flex-col gap-[0.5rem] w-full">
              <label>Description</label>
              <textarea
                {...register("descriptionLong")}
                className="px-3 py-1 border-2 border-gray-600 "
                defaultValue={packageData?.descriptionLong}
              />
            </div>
            <div className="flex flex-col gap-[0.5rem] w-full">
              <label>Functionality</label>
              <input
                type="text"
                {...register("name")}
                defaultValue={packageData?.name}
                // value={packageData?.heading}

                className="px-3 py-1 border-2 border-gray-600 "
              />
            </div>
            <div className="flex flex-col gap-[0.5rem] w-full">
              <label> Background Image</label>
              <input type="file" {...register("bgImage")} />
            </div>
            <div className="flex flex-col gap-[0.5rem] w-full">
              <label> Content Image</label>
              <input type="file" {...register("normalImage")} />
            </div>
            <div className="flex flex-col gap-[0.5rem] w-full">
              <label>Expertises</label>
              <div className="flex flex-row gap-[1rem]">
                <input
                  type="text"
                  placeholder="Add expertise..."
                  value={expertiseInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setExpertiseInput(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAdd();
                    }
                  }}
                />
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded"
                  onClick={handleAdd}
                >
                  +
                </button>
              </div>
              <div className="flex flex-row gap-1">
                {expertiseInputs?.map((item, idx) => (
                  <div className="flex flex-row gap-[0.5rem]" key={idx}>
                    <div>{item}</div>
                    <button
                      type="button"
                      className="bg-blue-500 text-white cursor-pointer px-2 py-1 rounded"
                      onClick={() => handleRemove(item)}
                    >
                      -
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            disabled={submitting}
            type="submit"
            className={`py-2 px-4 text-white rounded w-[100px] bg-blue-500 hover:bg-blue-600 ${
              submitting && "bg-gray-400"
            }`}
          >
            {submitting ? "Updating" : "Update"}
          </button>
        </div>}
      </form>
    </>
  );
}
