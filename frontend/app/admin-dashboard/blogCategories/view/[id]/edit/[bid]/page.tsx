//edit page of each blog

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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface BlogData {
  title: string;
  author: string;
  content: string;
  category: string;
  contentImage: string;
}

export default function Page() {
  const { register, handleSubmit, watch, reset } = useForm();
  const allInputField = watch();

  const [setsubmitting, setSetsubmitting] = useState(false);

  const pathname = usePathname();
  const categoryId = pathname.split("/")[4];
  console.log(categoryId);
  const blogId = pathname.split("/")[6];
  console.log(pathname)
  console.log(blogId);
  const [blogData, setBlogData] = useState<any>();
  const [refresh, setRefresh] = useState(0);
  const [value, setValue] = useState("");

  const parseContent = (content: string) => {
    const parser = new DOMParser();
    const parsedDocument = parser.parseFromString(content, 'text/html');
  
    const plainTextContent = parsedDocument.body.textContent || '';
    return plainTextContent;
  }


  useEffect(() => {
    const fetchBlogdata = async () => {
      try {
        const { data } = await AxiosInstance.get(`/blogs/${blogId}`);
        console.log(data.data);
        setBlogData(data.data);
        setValue(blogData.content);
        console.log(value);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogdata();
  }, [blogId,blogData,value]);

  const onSubmit = async () => {
    try {
      setSetsubmitting(true);
      const formData = new FormData();
      formData.append("title", allInputField.title);
      formData.append("contentImage", allInputField.contentImage[0]);
      formData.append("author", allInputField.author);
      const parsed=parseContent(value);
      formData.append("content", parsed);

      console.log(allInputField);
      console.log(formData);
      const { data } = await AxiosInstance.patch(
        `/blogs/${blogId}`,
        formData
      );
      console.log(data.data);
      setBlogData(data.data);
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
      <Link
        href={`/admin-dashboard/blogCategories/view/${categoryId}`}
        className="px-5 py-2"
      >
        <FontAwesomeIcon icon={faArrowLeft} color="blue"></FontAwesomeIcon>
      </Link>
      <form onSubmit={onSubmit}>
       {blogData && <div className="flex flex-col gap-[1rem] w-full items-center px-5">
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              defaultValue={blogData?.title}
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
              defaultValue={blogData?.author}
              className="px-3 py-1 border-2 border-gray-600 "
            />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Content</label>
            <ReactQuill theme="snow" value={value} onChange={setValue} />
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
