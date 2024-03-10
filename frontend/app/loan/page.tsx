"use client"
import Availableloandetails from "@/components/availableloandetails";
import Employmenttype from "@/components/employmenttype";
import Loandetails from "@/components/loandetails";
import Loaneligibility from "@/components/loaneligibility";
import Loantips from "@/components/loantips";
import Paymentdetails from "@/components/paymentdetails";
import Requireddocuments from "@/components/requireddocuments";
import Image from "next/image";
import React from "react";
import banner from "../../public/aboutusbanner.svg";

export default function Page() {
  return (
    <div>
      <div className="relative  flex justify-center items-center">
        <div className="absolute inset-0 banner-overlay "></div>
        <Image src={banner} alt="banner img" />
        <div className="absolute inset-0 text-white flex  items-center justify-center text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold py-5">
          LOAN
        </div>
      </div>
      <div className="text-xl font-semibold bg-secondary-50 w-full py-2 mb-3 flex justify-center items-center">
        Best Personal Loan For You
      </div>
      <Employmenttype />
      <Availableloandetails />
      <Loandetails />
      <Loaneligibility />
      <Requireddocuments />
      <Paymentdetails />
      <Loantips />
    </div>
  );
}
