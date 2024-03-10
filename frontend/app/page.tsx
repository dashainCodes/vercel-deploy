import React from "react";
import Ourpackages from "@/components/ourpackages";
import Aboutussection from "@/components/aboutussection";
import Oursupportssection from "@/components/oursupportssection";
import Investmentopportunities from "@/components/investmentopportunities";
import FAQ from "@/components/faq";
import Clientfeedback from "@/components/clientfeedback";
import Herosection from "@/components/herosection";

const page = () => {
  return (
    <div className="overflow-x-hidden">
      <Herosection />
      <Ourpackages />
      <Aboutussection />
      <div className="flex whitespace-nowrap bg-secondary-50 mb-12 py-10 ">
        <Oursupportssection />
      </div>
      <Investmentopportunities />
      <FAQ />
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 sm:py-10">
        <div data-aos="fade-right">
          <p className="text-4xl font-semibold text-secondary-350 py-6">
            What our
          </p>
          <p className="text-4xl font-bold text-secondary-500 pb-4">
            Clients say?
          </p>
        </div>
        <Clientfeedback />
      </div>
    </div>
  );
};

export default page;
