"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import profilelogo from "../../../../public/svgicons/profilelogo.svg";
import image1 from "../../../../public/blogimage1.svg";
import { CalendarRange, ChevronLeft } from "lucide-react";
import ReactPaginate from "react-paginate";

export default function Page() {
  const router = useRouter();
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 6;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = articlesitems.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(articlesitems.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % articlesitems.length;
    setItemOffset(newOffset);
  };
  return (
    <div className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 mb-10">
      <div
        className="text-secondary-300 flex gap-2 py-4 cursor-pointer w-fit"
        onClick={() => router.back()}
      >
        <ChevronLeft className="text-primary-350" />
        <p className="hover:text-primary-350">Start up ideas</p>
      </div>
      <p className="text-secondary-300 text-2xl pt-6 pb-3">Related Articles</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 place-items-center md:place-items-stretch">
        {currentItems.map((item) => (
          <div
            key={item.index}
            className="bg-secondary-50 rounded-md p-4 md:max-w-96"
          >
            <div>
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
      <div className="flex justify-center items-center">
        <ReactPaginate
          containerClassName={"pagination"}
          activeClassName={"active text-primary-350"}
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          breakClassName="pt-1 text-2xl"
          pageClassName=" font-semibold text-xl m-auto px-2 border-primary-350"
          nextClassName={`border font-semibold text-3xl p-2 text-white rounded-md ${
            itemOffset + itemsPerPage < articlesitems.length
              ? "bg-primary-350"
              : "bg-secondary-350"
          }`}
          previousClassName={`border font-semibold text-3xl p-2 text-white rounded-md ${
            itemOffset > 0 ? "bg-primary-350" : "bg-secondary-350"
          }`}
          className="gap-2 flex my-6 p-2 rounded-md text-secondary-350 font-semibold "
        />
      </div>
    </div>
  );
}

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
  {
    index: 6,
    profilelogo: profilelogo,
    name: "Hari Sharan",
    title: "How to make most from your business?",
    desc: "Marketing manager Life is a complex tapestry woven with unpredictable threads, where serendipity often dances hand in.......",
  },
  {
    index: 7,
    profilelogo: profilelogo,
    name: "Hari Sharan",
    title: "How to make most from your business?",
    desc: "Marketing manager Life is a complex tapestry woven with unpredictable threads, where serendipity often dances hand in.......",
  },
  {
    index: 8,
    profilelogo: profilelogo,
    name: "Hari Sharan",
    title: "How to make most from your business?",
    desc: "Marketing manager Life is a complex tapestry woven with unpredictable threads, where serendipity often dances hand in.......",
  },
  {
    index: 9,
    profilelogo: profilelogo,
    name: "Hari Sharan",
    title: "How to make most from your business?",
    desc: "Marketing manager Life is a complex tapestry woven with unpredictable threads, where serendipity often dances hand in.......",
  },
  {
    index: 10,
    profilelogo: profilelogo,
    name: "Hari Sharan",
    title: "How to make most from your business?",
    desc: "Marketing manager Life is a complex tapestry woven with unpredictable threads, where serendipity often dances hand in.......",
  },
];
