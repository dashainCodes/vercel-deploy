"use client";
import Image from "next/image";
import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AxiosInstance } from "../../repositories/config";
import { useState, useEffect } from "react";

interface CompanyData {
  companyName: string;
  companyLocation: string;
  companyMail: string;
  companyLogo: string;
  dealId: string;
}

export default function Page() {
  const pathname = usePathname();
  const categoryId=(pathname.split("/")[2])
  console.log(categoryId)
  const [categoryData, setCategoryData] = useState<any>();
  const [dealMatchItems, setDealMatchItems] = useState<CompanyData[]>();
  const [refresh, setRefresh] = useState(0);
  //to extract id

  useEffect(() => {
    const fetchCategorydata = async () => {
      try {
        const { data } = await AxiosInstance.get(
          `/categories-deal/${categoryId}`
        );
        console.log(data.data);
        setCategoryData(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategorydata();
  }, [categoryId]);

 
  useEffect(() => {
    const fetchDealdata = async () => {
      try {
        setRefresh(0);
        const { data } = await AxiosInstance.get(
          `/deals/info/${categoryData._id}`
        );
        console.log(data.data);
        setDealMatchItems(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDealdata();
  }, [categoryData, refresh]);

  return (
    <div className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <p className="text-2xl font-medium text-secondary-250 py-10 ">
        Deal Matched
      </p>
      <div className="grid grod-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 place-items-center md:place-items-stretch">
        {dealMatchItems &&
          dealMatchItems.length > 0 &&
          dealMatchItems.map((item, index) => (
            <div
              key={index}
              className="flex p-4 mb-4 gap-4 bg-white rounded-3xl border border-gray-300
            transition-all duration-300 ease-in-out hover:shadow-lg 
            "
            >
              <div className="flex flex-col justify-between">
                <div>
                  <Image
                    src={item.companyLogo}
                    width={50}
                    height={50}
                    alt="logo"
                    className="min-h-20 min-w-20"
                  />
                </div>
                {/* <div className="flex gap-3 pl-5">
                <Image
                  src={instraicon}
                  alt="social icon"
                  className="cursor-pointer h-8 w-8 opacity-50 hover:opacity-100"
                />
                <Image
                  src={facebookicon}
                  alt="social icon"
                  className="cursor-pointer opacity-50 hover:opacity-100"
                />
              </div> */}
              </div>
              <div className="xl:w-64">
                <p className="text-2xl font-bold pb-4">{item.companyName}</p>
                {/* <p className="pb-8">{item.desc}</p> */}
                <div className="flex justify-between gap-5">
                  <p className="text-secondary-300">jan.11.2024</p>
                  <button className="h-8 w-20 bg-primary-250 text-white rounded-md">
                    <Link
                      href={`/dealmatch/${categoryId}/dealMatchedCompany/${item.dealId}`}
                    >
                      View
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
