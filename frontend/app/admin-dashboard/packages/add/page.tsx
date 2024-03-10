//add package
"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosInstance } from "@/app/repositories/config";
import {toast} from 'react-toastify'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  const { register, handleSubmit, watch, reset } = useForm();
  const allInputField = watch();
  const [expertiseInput, setExpertiseInput] = useState("");
  const [expertiseInputs, setExpertiseInputs] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleRemove = (element: string) => {
    let newArray = expertiseInputs.filter((i, idx) => {
      return i !== element;
    });
    setExpertiseInputs(newArray);
  };

  const handleAdd = () => {
    if (
      expertiseInput.trim() !== "" &&
      !expertiseInputs.includes(expertiseInput)
    ) {
      setExpertiseInputs([...expertiseInputs, expertiseInput]);
      setExpertiseInput("");
    }
  };

  const onSubmit = async () => {
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
      const { data } = await AxiosInstance.post("/packages/", formData);
      console.log(data.data);
      toast.success(data.msg)
      reset();
      setSubmitting(false);
      setExpertiseInputs([]); // Clear expertiseInputs after successful submission
    } catch (error: any) {
      setSubmitting(false);
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <a href="/admin-dashboard/packages/" className="px-5 py-2">
        <FontAwesomeIcon icon={faArrowLeft} color="blue"></FontAwesomeIcon>
      </a>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-[1rem] w-full px-5 items-center">
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Heading</label>
            <input
              type="text"
              {...register("heading", { required: true })}
              className="px-3 py-1 border-2 border-gray-600 "
            />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Long Description</label>
            <textarea
              {...register("descriptionLong", { required: true })}
              className="px-3 py-1 border-2 border-gray-600 "
            />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Functuinality</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="px-3 py-1 border-2 border-gray-600 "
            />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label> Background Image</label>
            <input type="file" {...register("bgImage", { required: true })} />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label> Content Image</label>
            <input
              type="file"
              {...register("normalImage", { required: true })}
            />
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
              {expertiseInputs.length > 0 &&
                expertiseInputs.map((item, idx) => (
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
          Add
        </button>
      </form>
    </>
  );
}
