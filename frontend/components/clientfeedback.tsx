"use client";
import Image from "next/image";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../public/profile.jpg";
import image2 from "../public/clientimage1.jpg";
import image3 from "../public/clientimage2.jpg";
import { useEffect } from "react";
import { AxiosInstance } from "@/app/repositories/config";
import toast from "react-hot-toast";

const clientitems = [
  {
    index: 1,
    src: image1,
    name: "Hari Sharan",
    desc: '"Lorem est praesenas!"',
  },
  {
    index: 2,
    src: image2,
    name: "Ram",
    desc: '"Lorem est praesentium quae temporibus neque debitis aspernatur voluptatem. Molestias!"',
  },
  {
    index: 3,
    src: image3,
    name: " Sharan",
    desc: '"Lorem est praesentium quae temporibus neque debitis aspernatur voluptatem. Molestias!"',
  },
  {
    index: 4,
    src: image1,
    name: "Hari ",
    desc: '"Lorem est praesentium quae temporibus neque debitis aspernatur voluptatem. Molestias!"',
  },
  {
    index: 5,
    src: image2,
    name: "Ram ",
    desc: "“One of the best service I’ve ever get. So beautiful, so elegant. Just like a wow.”",
  },
];

interface TestimonialData{
  name:string;
  description:string;
  image:string;
  testimonialId:string;
}
export default function Clientfeedback() {

  const [testimonialData,setTestimonialData]=useState<TestimonialData[]>([]);

  const [loading, setLoading] = useState(false);
const [refresh,setRefresh]=useState(0);

 
  useEffect(() => {
    const loadTestimonialData = async () => {
      try {
        const { data } = await AxiosInstance.get("/testimonials");
        console.log(data);
        setTestimonialData(data.data);
        setRefresh(0)
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    loadTestimonialData();
  }, [refresh]);

  useEffect(() => {
    setLoading(false);
  }, [testimonialData]);



  const settings = {
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: true,
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "10%",
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "0%",
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          dots: true,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
   <>
   {loading?<>Loading</>:(
     <div>
     <Slider {...settings}>
       {testimonialData && testimonialData.length>0 && testimonialData.map((item,index) => (
         <div key={index} className="px-1 md:px-3 xl:px-5">
           <div
             className="h-96 md:min-w-64 bg-gradient-to-b from-white to-secondary-50 rounded-md flex 
       flex-col justify-start items-center mb-9 border border-transparent hover:border-primary-350 "
             data-aos="fade-up"
           >
             <div className="max-h-24 max-w-24  md:max-h-36 md:max-w-36 m-4">
               <Image
                 src={item.image}
                 alt={item.name}
                 width={50}
                 height={50}
                 className="rounded-full"
               />
             </div>
             <p className="text-md sm:text-lg text-nowrap md:text-xl font-semibold pb-2">
               {item.name}
             </p>
             <p className="italic text-secondary-450 font-normal p-3">
               {item.description}
             </p>
           </div>
         </div>
       ))}
      
     </Slider>
     {
        testimonialData && testimonialData.length===0 && <><div className="font-bold text-xl">No testimonials yet..</div></>
       }
   </div>
   
   )}
   </>
  );
}
