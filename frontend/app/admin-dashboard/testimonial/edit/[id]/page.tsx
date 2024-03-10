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

interface TestimonialData {
  name: string;
  description: string;
  image: string;
}
export default function Page() {
  const { register, handleSubmit, watch, reset } = useForm();
  const allInputField = watch();
  const [setsubmitting, setSetsubmitting] = useState(false);
  const [testimonialData, setTestimonialData] = useState<TestimonialData>();

  const pathname = usePathname();
  const testimonialId = pathname.split("/")[4];
  console.log(testimonialId);

  useEffect(() => {
    const fetchTestimonialdata = async () => {
      try {
        const { data } = await AxiosInstance.get(
          `/testimonials/${testimonialId}`
        );
        setTestimonialData(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTestimonialdata();
  }, [testimonialId]);

  console.log(testimonialData);
  const onSubmit = async () => {
    try {
      console.log("hiii");
      setSetsubmitting(true);
      const formData = new FormData();
      formData.append("name", allInputField.name);
      formData.append("description", allInputField.description);
      formData.append("image", allInputField.image[0]);
      console.log(formData);
      console.log(formData);
      const { data } = await AxiosInstance.patch(
        `/testimonials/${testimonialId}`,
        formData
      );

      console.log(data.data);
      setTestimonialData(data.data);
      toast.success(data.msg);
      setSetsubmitting(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      {testimonialData && (
        <>
          <Link href="/admin-dashboard/testimonial/" className="px-5 py-2">
            <FontAwesomeIcon icon={faArrowLeft} color="blue"></FontAwesomeIcon>
          </Link>
          <form onSubmit={handleSubmit(onSubmit)}>
            {testimonialData && (
              <div className="flex flex-col gap-[1rem] w-full items-center px-5">
                <div className="flex flex-col gap-[0.5rem] w-full">
                  <label>Name</label>
                  <input
                    type="text"
                    {...register("name")}
                    defaultValue={testimonialData.name}
                    className="px-3 py-1 border-2 border-gray-600 "
                  />
                </div>
                <div className="flex flex-col gap-[0.5rem] w-full">
                  <label>Description</label>
                  <textarea
                    {...register("description")}
                    defaultValue={testimonialData.description}
                    className="px-3 py-1 border-2 border-gray-600 "
                  />
                </div>
                <div className="flex flex-col gap-[0.5rem] w-full">
                  <label>Image</label>
                  <input type="file" {...register("image")} />
                </div>
                <button
                  disabled={setsubmitting}
                  type="submit"
                  className={`py-1 text-white rounded w-[10%] bg-blue-500 hover:bg-blue-600 ${
                    setsubmitting && "bg-gray-200"
                  } `}
                >
                  {setsubmitting ? "Updating" : "Update"}
                </button>
              </div>
            )}
          </form>
        </>
      )}
    </>
  );
}
