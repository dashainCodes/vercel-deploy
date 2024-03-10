//default blog page
"use client";
import { CalendarRange } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import logo1 from "../../public/blogcategory1.svg";
import image1 from "../../public/blogimage1.svg";
import profilelogo from "../../public/svgicons/profilelogo.svg";

export default function Page() {
  const router = useRouter();

  return (
    <div className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 mb-10">
      <p className="text-secondary-300 text-2xl py-6">Top Categories</p>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {categoryitems.map((item) => (
          <div
            key={item.index}
            className=" bg-secondary-50 sm:flex items-center gap-2 rounded-md border border-primary-350 p-4 
            cursor-pointer
            "
            onClick={() => {
              router.push("/blog/category/id");
            }}
          >
            <div>
              <Image
                src={item.logo}
                alt="logo"
                className="max-w-12 max-h-12 xl:max-w-16 xl:max-h-16"
              />
            </div>
            <div>
              <p className="text-secondary-300 text-sm md:text-lg font-medium">
                {item.title}
              </p>
              <p className="text-primary-350 text-sm font-medium">
                {item.count} stories
              </p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <p className="text-secondary-300 text-2xl pt-6 pb-3">Articles</p>
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 
        place-items-center md:place-items-stretch"
        >
          {articlesitems.map((item) => (
            <div
              key={item.index}
              className="bg-secondary-50 rounded-md p-4 xl:max-w-96 "
            >
              <div className="w-full">
                <Image src={image1} alt="img" className="w-full" />
              </div>
              <div className="flex gap-2 text-primary-350 py-4">
                <CalendarRange />
                <p>20 Nov, 2023</p>
              </div>
              <p className="text-secondary-400 pt-1 pb-2">{item.title}</p>
              <p className="text-secondary-300 text-sm pb-5">{item.desc}</p>
              <div className="flex justify-between items-center ">
                <div className="flex gap-2  items-center">
                  <div>
                    <Image src={profilelogo} alt="profile logo" />
                  </div>
                  <p className="text-secondary-350">{item.name}</p>
                </div>
                <button
                  className="h-8 w-24 bg-primary-350 text-sm text-white rounded-md mt-2 sm:mt-0"
                  onClick={() => {
                    router.push("/blog/1");
                  }}
                >
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const categoryitems = [
  {
    index: 1,
    logo: logo1,
    profilelogo: profilelogo,
    title: "Start up Idea",
    count: "25+",
  },
  {
    index: 2,
    logo: logo1,
    profilelogo: profilelogo,
    title: "Business Rules",
    count: "20+",
  },
  {
    index: 3,
    logo: logo1,
    profilelogo: profilelogo,
    title: "Brofit Ideology",
    count: "15+",
  },
  {
    index: 4,
    logo: logo1,
    profilelogo: profilelogo,
    title: "Profit Model",
    count: "8+",
  },
];

const articlesitems = [
  {
    index: 1,
    profilelogo: profilelogo,
    name: "Hari Sharan",
    title: "How to make most from your business?",
    desc: "Marketing manager Life is a complex tapestry woven with unpredictable threads, where serendipity often dances hand in.......",
  },
  {
    index: 2,
    profilelogo: profilelogo,
    name: "Ram Sharan",
    title: "How to make most from your business?",
    desc: "Marketing manager Life is a complex tapestry woven with unpredictable threads, where serendipity often dances hand in.......",
  },
  {
    index: 3,
    profilelogo: profilelogo,
    name: "Hari ",
    title: "How to make most from your business?",
    desc: "Marketing manager Life is a complex tapestry woven with unpredictable threads, where serendipity often dances hand in.......",
  },
  {
    index: 4,
    profilelogo: profilelogo,
    name: "Hari Sharan",
    title: "How to make most from your business?",
    desc: "Marketing manager Life is a complex tapestry woven with unpredictable threads, where serendipity often dances hand in.......",
  },
  {
    index: 5,
    profilelogo: profilelogo,
    name: "Hari Sharan",
    title: "How to make most from your business?",
    desc: "Marketing manager Life is a complex tapestry woven with unpredictable threads, where serendipity often dances hand in.......",
  },
];
