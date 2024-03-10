import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import supportlogo1 from "../public/svgicons/supportlogo1.svg";
import supportlogo2 from "../public/svgicons/supportlogo2.svg";
import supportlogo3 from "../public/svgicons/supportlogo3.svg";
import supportlogo4 from "../public/svgicons/supportlogo4.svg";
import supportlogo5 from "../public/svgicons/supportlogo5.svg";
import supportlogo6 from "../public/svgicons/supportlogo6.svg";

export default function Oursupportssection() {
  return (
    <div className="flex justify-center items-center">
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 ">
        <div className="text-4xl font-semibold pb-5" data-aos="fade-right">Our Supports</div>
        <div className="max-w-[88vw] sm:max-w-[87vw] ">
          <Marquee pauseOnHover>
            <div className="flex gap-32">
              {supportitems.map((item) => (
                <div
                  key={item.index}
                  className="min-w-12 min-h-12 flex items-center justify-center"
                >
                  <Image src={item.logo} alt="support logo" />
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
}

const supportitems = [
  {
    index: 1,
    logo: supportlogo1,
  },
  {
    index: 2,
    logo: supportlogo2,
  },
  {
    index: 3,
    logo: supportlogo3,
  },
  {
    index: 4,
    logo: supportlogo4,
  },
  {
    index: 5,
    logo: supportlogo5,
  },
  {
    index: 6,
    logo: supportlogo6,
  },
];
