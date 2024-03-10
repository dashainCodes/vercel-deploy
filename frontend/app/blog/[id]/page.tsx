"use client";
//related articles page
import { CalendarRange, ChevronLeft } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import image1 from "../../../public/blogimage1.svg";
import image2 from "../../../public/relatedimage.svg";
import profilelogo from "../../../public/svgicons/profilelogo.svg";
import Shareoption from "@/components/shareoption";

export default function Page() {
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
            How to make most from your business?
          </div>
          <div className="w-full">
            <Image src={image1} alt="logo" className="w-full" />
          </div>
          <div className="flex w-full justify-between items-center ">
            <div className="flex gap-2  items-center py-6">
              <div>
                <Image src={profilelogo} alt="profile logo" />
              </div>
              <p className="text-secondary-350">Hari Sharan Chaulagain</p>
            </div>
            <div className="flex gap-2 text-primary-350">
              <CalendarRange />
              <p>20 Nov 2023</p>
            </div>
          </div>
          <div className="py-3">
            <span className="text-2xl text-primary-350 pl-10">M</span>
            arketing manager Life is a complex tapestry woven with unpredictable
            threads, where serendipity often dances hand in. Marketing manager
            Life is a complex tapestry woven with unpredictable threads, where
            serendipity often dances hand in.
            <br />
            Marketing manager Life is a complex tapestry woven with
            unpredictable threads, where serendipity often dances hand
            in.Marketing manager Life is a complex tapestry woven with
            unpredictable threads, where serendipity often dances hand in.
            Marketing manager Life is a complex tapestry woven with
            unpredictable threads, where serendipity often dances hand in.
            <br />
            Marketing manager Life is a complex tapestry woven with
            unpredictable threads, where serendipity often dances hand
            in.Marketing manager Life is a complex tapestry woven with
            unpredictable threads, where serendipity often dances hand
            in.Marketing manager Life is a complex tapestry woven with
            unpredictable threads, where serendipity often dances hand
            in.Marketing manager Life is a complex tapestry woven with
            unpredictable threads, where serendipity often dances hand in.
            Marketing manager Life is a complex tapestry woven with
            unpredictable threads, where serendipity often dances hand
            in.Marketing manager Life is a complex tapestry woven with
            unpredictable threads, where serendipity often dances hand in.
            <br />
          </div>

          <div className="border border-secondary-200 shadow-md rounded-md p-5 sm:h-80
          ">
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
          </div>
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
            {relateditems.map((item) => (
              <div
                key={item.index}
                className="flex gap-3 items-center justify-center py-4 max-w-96 bg-secondary-50 rounded-lg my-4 px-2 "
              >
                <div>
                  <Image src={item.logo} alt="logo" />
                </div>
                <div>
                  <p className="text-secondary-500">{item.title}</p>
                  <p className="text-secondary-350 text-sm py-1">{item.desc}</p>
                  <button className="h-8 w-28 bg-primary-350 text-sm text-white rounded-md mt-2 sm:mt-0">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const relateditems = [
  {
    index: 1,
    title: "How to make most from your company?",
    desc: "There is something beautiful things to explore mo... ",
    logo: image2,
  },
  {
    index: 2,
    title: "How to make most from your company?",
    desc: "There is something beautiful things to explore mo... ",
    logo: image2,
  },
  {
    index: 3,
    title: "How to make most from your company?",
    desc: "There is something beautiful things to explore mo... ",
    logo: image2,
  },
  {
    index: 4,
    title: "How to make most from your company?",
    desc: "There is something beautiful things to explore mo... ",
    logo: image2,
  },
  {
    index: 5,
    title: "How to make most from your company?",
    desc: "There is something beautiful things to explore mo... ",
    logo: image2,
  },
];
