import React from "react";
import Image from "next/image";
import icon1 from ".././public/svgicons/icon1.svg";
import icon2 from ".././public/svgicons/icon2.svg";
import icon3 from ".././public/svgicons/icon3.svg";
import icon4 from ".././public/svgicons/icon4.svg";
import icon5 from ".././public/svgicons/icon5.svg";
import icon6 from ".././public/svgicons/icon6.svg";

export default function Ourservicessection() {
  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-7 mt-4">
        {iconitems.map((icon, index) => (
          <div key={index} className="flex flex-col">
            <div
              className="w-32 h-20 lg:w-44 lg:h-24 hover:border border-primary-150 bg-gradient-to-b from-white to-[#E6F7FF] rounded-md flex justify-center items-center mb-2 cursor-pointer"
              data-aos="zoom-in"
            >
              <Image src={icon.src} alt={icon.alt} />
            </div>
            <p className=" flex justify-center text-sm items-center font-semibold">
              {icon.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const iconitems = [
  { index: 1, src: icon1, name: "Legal Services", alt: "Icon 1" },
  { index: 2, src: icon2, name: "Audit & Assurance", alt: "Icon 2" },
  { index: 3, src: icon3, name: "Valuation & Modeling", alt: "Icon 3" },
  { index: 4, src: icon4, name: "Taxation", alt: "Icon 4" },
  { index: 5, src: icon5, name: "Risk Management", alt: "Icon 5" },
  { index: 6, src: icon6, name: "IFRS/NFRS", alt: "Icon 6" },
];
