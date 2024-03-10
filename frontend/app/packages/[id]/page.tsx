"use client";
import { AxiosInstance } from "@/app/repositories/config";
import Ourexperties from "@/components/ourexperties";
import PackageExperties from "@/components/packageExperties";
import Packagesoverview from "@/components/packagesoverview";
import Servicesoverview from "@/components/servicesoverview";
import Shareoption from "@/components/shareoption";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const pathname=usePathname()
  const packageId=pathname.split('/')[2];
  console.log(packageId);
  const [packageData,setPackageData]=useState({
    heading: "",
    descriptionLong: "",
    expertises: [],
    bgImage: "",
    normalImage: "",
    name:""
  })
    useEffect(() => {
      const getData = async () => {
        try {
          const { data } = await AxiosInstance.get(`/packages/${packageId}`);
          console.log(data.data);
          setPackageData(data.data);
        } catch (error: any) {
          console.log(error.message);
        }
      };
      getData();
    }, [packageId]);
  return (
    <div className="pb-10">
      <div
        style={{
          backgroundImage: `url(${packageData.bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <p className=" text-white flex items-center justify-center text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold py-10">
          {packageData.heading}
        </p>
      </div>

      <Packagesoverview  packageId={packageId}/>
      <PackageExperties packageId={packageId}/>
      <Shareoption />
    </div>
  );
}
