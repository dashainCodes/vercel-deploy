import React from "react";
import Image from "next/image";
import aboutusimage from "../public/svgicons/aboutusimage.svg";
import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";

export default function Aboutussection() {
  return (
    <div className="flex flex-col-reverse md:flex-row md:justify-center md:items-center px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-20 " >
      <div className="md:w-1/2" data-aos="fade-right">
        <p className="text-primary-400 font-semibold">About Us</p>
        <p className="text-4xl font-semibold leading-relaxed md:max-w-80">
          Let us introduce ourself to you.
        </p>
        <p className="text-secondary-350 md:max-w-96 font-semibold py-6">
          Expert Business provides expert guidance and representation to
          individuals and organizations navigation the complexities of legal
          matters.
        </p>
        <Link href="/aboutus" className="flex gap-2 text-primary-400 items-center cursor-pointer font-semibold w-fit">
          <ArrowRightCircle size={50} strokeWidth={0.7} />
          <p>Learn More</p>
        </Link>
      </div>
      <div className="md:w-1/2" data-aos="fade-left">
        <Image src={aboutusimage} alt="aboutusimage" />
      </div>
    </div>
  );
}
