import { List, Zap } from "lucide-react";
import React from "react";
import Ourservicessection from "./ourservicessection";
import Refundswiper from "./refundswiper";

export default function Herosection() {
  return (
    <div className="mx-5 sm:mx-8 md:mx-12 lg:mx-18 xl:mx-20">
      <div className=" mt-10 flex flex-col md:flex-row justify-between items-center">
        <div className=" mb-8 " data-aos="fade-up">
          <p className="text-4xl text-secondary-350 ">Let&apos;s find the </p>
          <p className="text-4xl mb-4 font-bold text-secondary-500">
            Best Business for you.
          </p>
          <div className="flex flex-col xl:flex-row xl:items-center gap-5">
            <div className="flex text-green-500 items-center">
              <div
                className="rounded-full p-2 border border-solid border-green-500"
                data-aos="zoom-in"
              >
                <List />
              </div>
              <p className="ml-3 max-w-48">
                20+ legal services with one of the best pieces
              </p>
            </div>
            <div className="flex items-center text-orange-400">
              <div
                className="rounded-full p-2 border border-solid  border-orange-400 "
                data-aos="zoom-in"
              >
                <Zap />
              </div>
              <p className="ml-3 max-w-32">Quick, easy & hassle-free</p>
            </div>
          </div>
        </div>
        <div className="max-w-sm md:max-w-md lg:max-w-lg" data-aos="fade-left">
          <Refundswiper />
        </div>
      </div>
      <Ourservicessection />
    </div>
  );
}
