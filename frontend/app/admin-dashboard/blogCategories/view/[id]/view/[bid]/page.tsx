"use client";
//each blog view page

import React from "react";
import { useEffect, useState } from "react";
import { AxiosInstance } from "@/app/repositories/config";
import toast from "react-hot-toast";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";



export default function Page() {

  const [blogData, setBlogData] = useState({
    author: "",
    content: "",
    createdAt: "",
    title: "",
    contentImage: "",
  });

  const pathName = usePathname();
  const categoryId = pathName.split("/")[4];
  const blogId = pathName.split("/")[6];

  const [loading, setLoading] = useState(false);
  //load faq data
 
  useEffect(() => {
    const loadBlogData = async () => {
      try {
        const { data } = await AxiosInstance.get(`/blogs/${blogId}`);
        console.log(data);
        setBlogData(data.data);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    loadBlogData();
  }, [blogId]);

  return (
    <>
      <Link
        href={`/admin-dashboard/blogCategories/view/${categoryId}/`}
        className="py-2 px-5"
      >
        <FontAwesomeIcon icon={faArrowLeft} color="blue"></FontAwesomeIcon>
      </Link>

      <div className="flex flex-col overflow-y-auto h-[80%] px-5">
        <div className="flex flex-col gap-[1rem] w-full items-center">
          <div className="flex flex-row gap-[1rem] justify-between w-full">

          <div className="flex flex-col gap-[0.5rem] w-full">
            <div>Title</div>
            <div className="px-3 py-1 border-2 border-gray-300">{blogData?.title}</div>
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full ">
            <div>Author</div>
            <div className="px-3 py-1 border-2 border-gray-300">{blogData?.author}</div>
          </div>

          </div>
          
            <div className="flex flex-col gap-[0.5rem] w-full">
              <div>Content Image</div>
              <div className="px-3 py-1 ">
                <img src={blogData?.contentImage} width="75px" height="75px"></img>
              </div>
            </div>
         
          <div className="flex flex-col gap-[0.5rem] w-full">
            <div>Content</div>
            <div className="px-3 py-1 border-2 border-gray-300">{blogData?.content}</div>
          </div>
          
          <div className="flex flex-col gap-[0.5rem] w-full">
              <div>Created At</div>
              <div className="px-3 py-1 border-2 border-gray-300">
                {blogData?.createdAt.slice(0, 10)}
              </div>
            </div>
        </div>
      </div>
    </>
  );
};
