"use client";
import Hiringcard from "@/components/hiringcard";
import Ourmission from "@/components/ourmission";
import React from "react";

export default function Page() {
  return (
    <div>
      <div
        style={{
          backgroundImage: "url(/carrerpagebanner.svg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className=" px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8">
          <p className="text-4xl font-medium text-white max-w-80">Start your career with us.</p>
          <p className="text-xl my-4 text-secondary-150 max-w-96">
            Submit you applications and show your skill and start working with
            us.
          </p>
          <button className="h-8 w-32 bg-primary-350 text-white rounded-md my-4">
            Enroll Now
          </button>
        </div>
      </div>
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <Ourmission />
        <Hiringcard />
      </div>
    </div>
  );
}
