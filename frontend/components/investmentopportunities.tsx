"use client"
import React, { useState } from "react";
import Image from "next/image";
import investicon1 from "../public/svgicons/investicon1.svg";
import investicon2 from "../public/svgicons/investicon2.svg";
import investicon3 from "../public/svgicons/investicon3.svg";
import investicon4 from "../public/svgicons/investicon4.svg";
import investicon5 from "../public/svgicons/investicon5.svg";
import Link from "next/link";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { AxiosInstance } from "@/app/repositories/config";

interface CompanyData {
  companyName: string;
  companyLocation: string;
  companyMail: string;
  companyLogo: string;
  companyId: string;
  dealId:string;
}

export default function Investmentopportunities() {
  const [data,setData]=useState<CompanyData[]>([]);

useEffect(()=>{
const getDeals=async()=>{
try {
  const {data}=await AxiosInstance.get('/deals')
console.log(data.data)
setData(data.data)
} catch (error:any) {
  toast.error((error.message));
  
}
}
getDeals()
},[])
  return (
    <div className="flex justify-center items-center">
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <p className="text-primary-350" data-aos="fade-right">
          Deal Match
        </p>
        <p
          className="text-4xl font-semibold text-secondary-350 leading-10"
          data-aos="fade-right"
        >
          Investment
        </p>
        <p
          className="text-4xl font-bold text-secondary-500 leading-10"
          data-aos="fade-right"
        >
          Opportunities
        </p>
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-12 mb-16"
          data-aos="fade-left"
        >
          {data && data.length>0 && data.map((item,index) => (
            <div
              key={index}
              className="bg-secondary-50 px-3 py-2 rounded-md"
            >
              <Image
                src={item.companyLogo}
                width={75}
                height={75}
                alt="logo"
                className="md:min-w-32 md:min-h-32"
              />
              <p className="text-secondary-350 font-medium py-1">{item.companyName}</p>
              <button className="h-6 w-24 md:h-8 md:w-28 mb-1 bg-primary-350 text-white rounded-md">
                <Link href={`/dealMatchedCompany/${item.dealId}`} className="text-sm">
                  Invest Now
                </Link>
              </button>
            </div>
          ))}
{
  data && data.length==0 &&  (<><div className="font-bold text-xl">No deals yet</div></>)
}
        </div>
      </div>
    </div>
  );
}

const investitems = [
  {
    index: 1,
    name: "IT Company",
    logo: investicon1,
  },
  {
    index: 2,
    name: "Clothing Company",
    logo: investicon2,
  },
  {
    index: 3,
    name: "Travel Company",
    logo: investicon3,
  },
  {
    index: 4,
    name: "Steal Company",
    logo: investicon4,
  },
  {
    index: 5,
    name: "Tech Company",
    logo: investicon5,
  },
];
