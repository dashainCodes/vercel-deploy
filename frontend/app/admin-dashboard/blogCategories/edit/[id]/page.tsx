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

interface CategoryData {
  category: string;
  categoryImage: string;
}

export default function Page() {
  const { register, handleSubmit, watch, reset } = useForm();
  const allInputField = watch();

  const pathName = usePathname();
  const categoryId = pathName.split("/")[4];

  console.log(categoryId);
  const [setsubmitting, setSetsubmitting] = useState(false);
  const [categoryData, setCategoryData] = useState<CategoryData>();

 
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await AxiosInstance.get(`/categories-blog/${categoryId}`);
      console.log(data.data);
      setCategoryData(data.data);
    };
  
    fetchCategories();
  }, [categoryId]);

  const onSubmit = async (e: any) => {
    try {
      e.preventDefault();
      console.log("updates");
      setSetsubmitting(true);
      const formData = new FormData();
      formData.append("category", allInputField.category);
      formData.append("categoryImage", allInputField.categoryImage[0]);
      console.log(formData);
      const { data } = await AxiosInstance.patch(
        `/categories-blog/${categoryId}`,
        formData
      );
      console.log(data.data);
      toast.success(data.msg)
      setSetsubmitting(false);
    } catch (error: any) {
      setSetsubmitting(false);
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Link href="/admin-dashboard/blogCategories/" className="px-5 py-2">
        <FontAwesomeIcon icon={faArrowLeft} color="blue"></FontAwesomeIcon>
      </Link>
      <form onSubmit={onSubmit}>
      {categoryData &&  <div className="flex flex-col gap-[1rem] px-5 w-full items-center">
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Category Name</label>
            <input
              type="text"
              {...register("category", { required: true })}
              defaultValue={categoryData?.category}
              className="px-3 py-1 border-2 border-gray-600 "
            />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Category image</label>
            <input
              type="file"
              {...register("categoryImage", { required: true })}
            />
          </div>
          <button
            disabled={setsubmitting}
            type="submit"
            className={`py-1 text-white rounded w-[10%] bg-blue-500 hover:bg-blue-600 ${
              setsubmitting && "bg-gray-400"
            }`}
          >
            {setsubmitting ? "Updating" : "Update"}
          </button>
        </div>}
      </form>
    </>
  );
}
