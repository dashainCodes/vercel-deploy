"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../repositories/config";
import { useRouter } from "next/navigation";
import {toast} from 'react-toastify';
import image1 from "../../public/dealcategory1.svg";
import image2 from "../../public/dealcategory2.svg";
import image3 from "../../public/dealcategory3.svg";
import image4 from "../../public/dealcategory4.svg";
import image5 from "../../public/dealcategory5.svg";
import image6 from "../../public/dealcategory6.svg";

export default function Page() {
  const router = useRouter();
const [refresh,setRefresh]=useState(0);
const [categoryData,setCategoryData]=useState([{category:"",
categoryImage:"",
categoryId:""
}])
  useEffect(() => {
    const fetchDealCategories=async()=>{
      try {
        const { data } = await AxiosInstance.get("/categories-deal");
        console.log(data);
        setCategoryData(data.data);
        setRefresh(0)
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    fetchDealCategories()
  }, []);

  return (
    <div className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-20">
      <p className=" mb-5 text-2xl font-semibold text-secondary-300">
        Deal Categories
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        { categoryData && categoryData.length>0 && categoryData.map((item,index) => (
          <div
            key={index}
            onClick={() => {
              router.push(`/dealmatch/${item.categoryId}`);
            }}
            className="bg-secondary-50 p-4 rounded-md flex flex-col gap-2
          cursor-pointer justify-center items-center"
          >
            <Image src={item.categoryImage} width={250} height={250}alt="logo" />
            <p className="text-primary-350 text-sm sm:text-md md:text-xl font-semibold">
              {item.category}
            </p>
          </div>
        ))}
        {
          !categoryData || categoryData.length===0 && "No deal categories"
        }
      </div>
    </div>
  );
}

// const categoryData = [
//   {
//     index: 1,
//     name: "Start Up",
//     logo: image4,
//   },

//   {
//     index: 2,
//     name: "Business for Sale",
//     logo: image2,
//   },
//   {
//     index: 3,
//     name: "Existing Business",
//     logo: image5,
//   },
//   {
//     index: 4,
//     name: "Franchise",
//     logo: image1,
//   },
//   {
//     index: 5,
//     name: "Collaboration",
//     logo: image6,
//   },
//   {
//     index: 6,
//     name: "Seeking Seller",
//     logo: image3,
//   },
// ];
