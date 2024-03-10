"use client";
import { AxiosInstance } from "@/app/repositories/config";
import Ourexperties from "@/components/ourexperties";
import Servicesoverview from "@/components/servicesoverview";
import Shareoption from "@/components/shareoption";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const serviceId = pathname.split("/")[2];
  console.log(serviceId);
const [serviceData,setServiceData]=useState({
  heading: "",
  descriptionLong: "",
  expertises: [],
  bgImage: "",
  normalImage: "",
})
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await AxiosInstance.get(`/services/${serviceId}`);
        console.log(data.data);
        setServiceData(data.data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getData();
  }, [serviceId]);
  return (
    <div className="pb-10">
      <div
        style={{
          backgroundImage: `url(${serviceData.bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <p className=" text-white flex items-center justify-center text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold py-10">
          {serviceData.heading}
        </p>
      </div>

      <Servicesoverview serviceId={serviceId} />
      <Ourexperties serviceId={serviceId} />
      <Shareoption />
    </div>
  );
}
