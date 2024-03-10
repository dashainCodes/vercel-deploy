"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import cardimage from ".././public/refondpolicycard.svg";
import Link from "next/link";

export default function Refundswiper() {
  return (
    <Swiper
      spaceBetween={30}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="mySwiper w-full "
    >{
      carditems.map((item)=>(

        <SwiperSlide className="mb-8 " key={item.index}>
        <Link href="/ourservices">
          <Image src={item.src} alt="card" className="cursor-pointer" />
        </Link>
      </SwiperSlide>
      ))
    }
    </Swiper>
  );
}

const carditems = [
  {
    index:1,
    src:cardimage,
  },
  {
    index:2,
    src:cardimage,
  },
  {
    index:3,
    src:cardimage,
  },{
    index:4,
    src:cardimage,
  },
]