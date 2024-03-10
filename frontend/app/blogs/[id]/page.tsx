"use client";
//related articles page
import { CalendarRange, ChevronLeft } from "lucide-react";
import Image from "next/image";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

import Shareoption from "@/components/shareoption";
import { AxiosInstance } from "@/app/repositories/config";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import path from "path";
export default function Page() {
  const pathName = usePathname();

  const blogId = pathName.split("/")[2];
 
  const [blogData, setBlogData] = useState({
    author: "",
    content: "",
    createdAt: "",
    title: "",
    contentImage: "",
    authorImage: "",
    blogId:""
  });
  const [loading, setLoading] = useState(false);
  //load faq data
const [blogDatas,setBlogDatas]=useState([{ author: "",
content: "",
createdAt: "",
title: "",
contentImage: "",
authorImage: "",
blogId:""}])
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


 

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        const { data } = await AxiosInstance.get(`/blogs/`);
        console.log(data);
        setBlogDatas(data.data);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    loadBlogData();
  }, []);
  console.log(blogDatas)

  const router = useRouter();

  return (
    <div className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 mb-10">
      <div
        className="text-secondary-300 flex gap-2 py-4 cursor-pointer w-fit"
        onClick={() => router.back()}
      >
        <ChevronLeft className="text-primary-350" />
        <p className="hover:text-primary-350">Go back</p>
      </div>
      <div className="flex gap-10 justify-between">
        <div className="sm:w-4/6 sm:mr-10 flex flex-col ">
          <div className="text-2xl font-semibold text-secondary-400 py-3">
            {blogData.title}
          </div>
          <div className="w-full">
            <Image src={blogData.contentImage} width={100} height={100} alt="logo" className="w-full" />
          </div>
          <div className="flex w-full justify-between items-center ">
            <div className="flex gap-2  items-center py-6">
              <div>
                <Image src={blogData.authorImage} width={40} height={40} className="rounded-[50%]" alt="profile logo" />
              </div>
              <p className="text-secondary-350">{blogData.author}</p>
            </div>
            <div className="flex gap-2 text-primary-350">
              <CalendarRange />
              <p>20 Nov 2023</p>
            </div>
          </div>
          <div className="py-3">
            <span className="text-2xl text-primary-350 pl-10">{blogData.content[0]}</span>
            {blogData.content.slice(1)}
          </div>

          {/* <div
            className="border border-secondary-200 shadow-md rounded-md p-5 sm:h-80
          "
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/f0Shc2YFBIk"
              title="YouTube video player"
              allowFullScreen
            ></iframe>
          </div>
          <div className="mt-3 mb-10">
            Marketing manager Life is a complex tapestry woven with
            unpredictable threads, where serendipity often dances hand
            in.Marketing manager Life is a complex tapestry woven with
            unpredictable threads, where serendipity often dances hand
            in.Marketing manager Life is a complex tapestry woven with
            unpredictable threads, where serendipity often dances hand in.
            Marketing manager Life is a complex tapestry woven with
            unpredictable threads, where serendipity often dances hand in.
          </div> */}
          <Shareoption />
        </div>
        <div className="w-2/6 hidden sm:block sticky top-40">
          <p className="flex justify-center items-center text-xl font-medium py-3">
            Related Articles
          </p>
          <div
            className="overflow-y-auto h-[100vh] "
            style={{ scrollbarWidth: "thin" }}
          >
            {blogDatas.map((item, index) => (
  item.blogId !== blogId ?  (
   index<6 &&  <div
   key={index}
   className="flex gap-3 items-center justify-center py-4 max-w-96 bg-secondary-50 rounded-lg my-4 px-2"
 >
   <div>
     <Image src={item.authorImage} width={30} height={30} className="rounded-[50%]" alt="logo" />
   </div>
   <div>
     <p className="text-secondary-500">{item.title}</p>
     <p className="text-secondary-350 text-sm py-1">{item.content.slice(0,30)}</p>
     <button className="h-8 w-28 bg-primary-350 text-sm text-white rounded-md mt-2 sm:mt-0"
     onClick={()=>router.push(`${item.blogId}`)}
     >
       Read More
     </button>
   </div>
 </div>
  ) : null
))}

          </div>
        </div>
      </div>
    </div>
  );
}
