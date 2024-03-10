"use client";
import Image from "next/image";
import React from "react";
import aboutimage1 from "../../public/aboutimage1.png";
import aboutimage2 from "../../public/aboutimage2.png";
import aboutimage3 from "../../public/aboutimage3.png";

export default function Page() {
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
          ABOUT US
        </p>
      </div>

      <div className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 ">
        {aboutusitems.map((item) => (
          <div
            key={item.index}
            className="flex flex-col justify-center items-center"
          >
            <p className="text-2xl font-bold pt-6">{item.name}</p>
            <p className="text-secondary-400 py-5 text-center max-w-6xl mx-auto">
              {item.desc}
            </p>
            <div className="mb-10">
              <Image src={item.logo} alt="img" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const aboutusitems = [
  {
    index: 1,
    name: "Our Story",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Lorem ipsum dolor sit, amet consectetur adipisicing elit.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae ut, modi, voluptatum non tempore atque distinctio ea dolore laudantium pariatur at natus perspiciatis molestias, unde voluptatem quo dolorem itaque nisi",
    logo: aboutimage1,
  },
  {
    index: 2,
    name: "Our Vision",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Lorem ipsum dolor sit, amet consectetur adipisicing elit.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae ut, modi, voluptatum non tempore atque distinctio ea dolore laudantium pariatur at natus perspiciatis molestias, unde voluptatem quo dolorem itaque nisi",
    logo: aboutimage2,
  },
  {
    index: 3,
    name: "Our Mission",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Lorem ipsum dolor sit, amet consectetur adipisicing elit.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae ut, modi, voluptatum non tempore atque distinctio ea dolore laudantium pariatur at natus perspiciatis molestias, unde voluptatem quo dolorem itaque nisi",
    logo: aboutimage3,
  },
];
