"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import packageicon1 from "../public/svgicons/packageicon1.svg";
import packageicon2 from "../public/svgicons/packageicon2.svg";
import packageicon3 from "../public/svgicons/packageicon3.svg";
import packageicon4 from "../public/svgicons/packageicon4.svg";
import packageicon5 from "../public/svgicons/packageicon5.svg";
import packageicon6 from "../public/svgicons/packageicon6.svg";
import packageicon7 from "../public/svgicons/packageicon7.svg";
import packageicon8 from "../public/svgicons/packageicon8.svg";
import packageicon9 from "../public/svgicons/packageicon9.svg";
import packageicon10 from "../public/svgicons/packageicon10.svg";
import packageicon11 from "../public/svgicons/packageicon11.svg";
import packageicon12 from "../public/svgicons/packageicon12.svg";
import Link from "next/link";
import { AxiosInstance } from "@/app/repositories/config";


export default function Ourpackages() {
 
  let [packageData,setPackageData]=useState([{
    heading: "",
    descriptionLong:"",
    expertises:[],
    bgImage:"",
    normalImage:"",
    packageId:"",
    name:""
  },])

  useEffect(()=>{
const getData=async()=>{
  try {
    const {data}=await AxiosInstance.get(`/packages/`);
    console.log(data.data);
    setPackageData(data.data)
  } catch (error:any) {
    console.log(error.message)
  }
}
getData();
  },[])

  return (
    <div className="flex justify-center items-center bg-gradient-to-b from-white to bg-secondary-50">
      <div
        className=" pb-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 
      lg:grid-cols-3 2xl:grid-cols-4 gap-4 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 mt-10"
        data-aos="fade-right"
      >
        {packageData && packageData.length>0 && packageData.map((item,index) => (
          <div
            key={index}
            style={{
              backgroundImage: `url(${item.bgImage})`,
              backgroundSize: "cover",
            }}
            className="flex flex-col justify-between rounded-3xl h-60 px-5 pt-10 pb-5 text-white"
          >
            <div>
              <p className="text-xl font-semibold ">{item.heading}</p>
              <p className="text-sm pt-1">{item.descriptionLong}</p>
            </div>
            <div className="flex justify-between items-center">
              <button
                className="h-12 w-32 text-white border-2 hover:bg-primary-350 hover:border-primary-350
            border-white rounded-md  my-4 text-sm"
              >
                <Link href={`/packages/${item.packageId}`}>{item.name}</Link>
              </button>
              {/* <div>
                <Image src={item.icon} alt="icon" />
              </div> */}
            </div>
          </div>
        ))}
        {
          packageData && packageData.length===0 && <><div className="font-bold text-xl">No packages</div></>
        }
      </div>
    </div>
  );
}

const packageitems = [
  {
    index: 1,
    bgimage: "/svgicons/packageimage1.svg",
    title: "Ask the expert",
    desc: "30 minutes one to one consulation",
    name: "Consult Now",
    icon: packageicon1,
  },
  {
    index: 2,
    bgimage: "/svgicons/packageimage2.svg",
    title: "Business Registration",
    desc: "update and compilance related services",
    name: "Register Now",
    icon: packageicon2,
  },
  {
    index: 3,
    bgimage: "/svgicons/packageimage3.svg",
    title: "Tax Registration",
    desc: "Tax return Filing and tax related service",
    name: "Get Now",
    icon: packageicon3,
  },
  {
    index: 4,
    bgimage: "/svgicons/packageimage4.svg",
    title: "Business License and Approval",
    desc: "Business approval and licence approval",
    name: "Approve Now",
    icon: packageicon4,
  },
  {
    index: 5,
    bgimage: "/svgicons/packageimage5.svg",
    title: "Visa Processing",
    desc: "Immigration file / E-channel (Business and Working visa only)",
    name: "Process Now",
    icon: packageicon5,
  },
  {
    index: 6,
    bgimage: "/svgicons/packageimage6.svg",
    title: "Legal Services",
    desc: "Document Draft, Verification, Attestation, Legalization, Translation",
    name: "Legalize Now",
    icon: packageicon6,
  },
  {
    index: 7,
    bgimage: "/svgicons/packageimage7.svg",
    title: "Trademark Registration",
    desc: "Register the trademark for your company and businesses",
    name: "Register Now",
    icon: packageicon7,
  },
  {
    index: 8,
    bgimage: "/svgicons/packageimage8.svg",
    title: "Trademark Objection Management",
    desc: "Legalize the business by managing the trade mark for your company.",
    name: "Manage Now",
    icon: packageicon8,
  },
  {
    index: 9,
    bgimage: "/svgicons/packageimage9.svg",
    title: "Export Import (EXIM) Code",
    desc: "Enhance business in wide with export import code.",
    name: "Process Now",
    icon: packageicon9,
  },
  {
    index: 10,
    bgimage: "/svgicons/packageimage10.svg",
    title: " Accounting Software and Services",
    desc: "Document Draft, Verification, Attestation, Legalization, Translation",
    name: "Get Now",
    icon: packageicon10,
  },
  {
    index: 11,
    bgimage: "/svgicons/packageimage11.svg",
    title: "Bank Account Opening and Loan Documentation",
    desc: "open your bank account and apply for loan that suits you",
    name: "Open Now",
    icon: packageicon11,
  },
  {
    index: 12,
    bgimage: "/svgicons/packageimage12.svg",
    title: "Management Advisory",
    desc: "Manage and deal with legal, Account and Tax related matters",
    name: "Manage Now",
    icon: packageicon12,
  },
];
