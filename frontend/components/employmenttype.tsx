"use client";
import React, { useState } from "react";
import tickicon1 from "../public/svgicons/tick.svg";
import tickicon2 from "../public/svgicons/filled-tick.svg";
import Image from "next/image";

export default function Employmenttype() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setSelectedItem(index);
  };

  return (
    <div className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 pb-10 flex flex-col justify-center items-center">
      <p className="text-xl font-medium text-[#34495E]">Type of Employment</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10 w-full">
        {employmentitems.map((item) => (
          <div
            key={item.index}
            className="bg-white rounded-3xl border border-primary-350 w-full lg:w-72 p-4 cursor-pointer"
            onClick={() => handleItemClick(item.index)}
          >
            <div className="flex items-center gap-3">
              <div>
                <Image
                  src={selectedItem === item.index ? tickicon2 : tickicon1}
                  alt="icon"
                  className="min-h-12 min-w-12 "
                />
              </div>
              <div>
                <p className="text-xl font-semibold">{item.name}</p>
                <p className="text-secondary-400 text-sm">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const employmentitems = [
  {
    index: 1,
    name: "Salaried",
    desc: "Earn regular monthly income.",
  },
  {
    index: 2,
    name: "Salaried",
    desc: "Earn regular monthly income.",
  },
  {
    index: 3,
    name: "Salaried",
    desc: "Earn regular monthly income.",
  },
  {
    index: 4,
    name: "Salaried",
    desc: "Earn regular monthly income.",
  },
  {
    index: 5,
    name: "Salaried",
    desc: "Earn regular monthly income.",
  },
  {
    index: 6,
    name: "Salaried",
    desc: "Earn regular monthly income.",
  },
  {
    index: 7,
    name: "Salaried",
    desc: "Earn regular monthly income.",
  },
];
