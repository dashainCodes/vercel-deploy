//add page of blog
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface BlogData {
  title: string;
  author: string;
  content: string;
  category: string;
  contentImage: string;
  authorImage:string;
}

export default function Page() {
  const { register, handleSubmit, watch, reset } = useForm();
  const allInputField = watch();
  console.log(allInputField);

  const [setsubmitting, setSetsubmitting] = useState(false);

  const pathname = usePathname();
  const categoryId = pathname.split("/")[4];
  console.log(categoryId);
  const [categoryData, setCategoryData] = useState<any>();
  const [refresh, setRefresh] = useState(0);
  const [value, setValue] = useState("");

  const parseContent = (content: string) => {
    const parser = new DOMParser();
    const parsedDocument = parser.parseFromString(content, 'text/html');
    // Here you can extract any information from the parsedDocument that you need
    // For example, you can get the plain text of the content:
    const plainTextContent = parsedDocument.body.textContent || '';
    return plainTextContent;
  }


  useEffect(() => {
    const fetchCategorydata = async () => {
      try {
        const { data } = await AxiosInstance.get(
          `/categories-blog/${categoryId}`
        );
        console.log(data.data);
        setCategoryData(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategorydata();
  }, [categoryId]);

  const onSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setSetsubmitting(true);
      const formData = new FormData();
      formData.append("title", allInputField.title);
      formData.append("contentImage", allInputField.contentImage[0]);
      formData.append("author", allInputField.author);
      const parsed=parseContent(value)
      formData.append("content", parsed);
      formData.append("authorImage", allInputField.authorImage[0]);
      formData.append("category", categoryData?._id);
      console.log(value);
      console.log(allInputField);
      console.log(formData);
      const { data } =
        categoryData?._id && (await AxiosInstance.post("/blogs", formData));
      data && console.log(data.data);
      toast.success(data.msg)
      reset();
      setSetsubmitting(false);
    } catch (error: any) {
      setSetsubmitting(false);
      toast.error(error.message)
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Link
        href={`/admin-dashboard/blogCategories/view/${categoryId}`}
        className=" py-2 px-5"
      >
        <FontAwesomeIcon icon={faArrowLeft} color="blue"></FontAwesomeIcon>
      </Link>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-[1rem] w-full items-center px-5">
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="px-3 py-1 border-2 border-gray-600 "
            />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label> Content Image</label>
            <input
              type="file"
              {...register("contentImage", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Author</label>
            <input
              type="text"
              {...register("author", { required: true })}
              className="px-3 py-1 border-2 border-gray-600 "
            />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
          <label> Author Image</label>
            <input
              type="file"
              {...register("authorImage", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Content</label>
            <ReactQuill theme="snow" value={value} onChange={setValue} />
          </div>
          <button
            disabled={!categoryData || !categoryData._id|| setsubmitting}
            type="submit"
            className={`py-1 text-white rounded w-[10%] bg-blue-500 hover:bg-blue-600 ${
              setsubmitting && "bg-gray-400"
            }`}
          >
            {setsubmitting ? "Adding" : "Add"}
          </button>
        </div>
      </form>
    </>
  );
}
