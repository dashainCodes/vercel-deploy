"use client";
import PackageExperties from "@/components/packageExperties";
import Packagesoverview from "@/components/packagesoverview";
import Shareoption from "@/components/shareoption";
import { usePathname } from "next/navigation";
import React from "react";

export default function Page() {
  const pathname=usePathname();
  const packageId=pathname.split('/')[2];

  return (
    <div className="pb-10">
      <div
        style={{
          backgroundImage: "url(/ourservicebanner.svg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <p className=" text-white flex items-center justify-center text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold py-10">
          OUR PACKAGES
        </p>
      </div>
      <Packagesoverview packageId={packageId} />
      <PackageExperties packageId={packageId} />
      <Shareoption />
    </div>
  );
}
