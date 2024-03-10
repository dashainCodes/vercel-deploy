import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import icon1 from "../public/svgicons/footernavicon1.svg";
import icon2 from "../public/svgicons/footernavicon2.svg";
import icon3 from "../public/svgicons/footernavicon3.svg";
import icon4 from "../public/svgicons/footernavicon4.svg";
import icon5 from "../public/svgicons/footernavicon5.svg";
import icon6 from "../public/svgicons/footernavicon6.svg";
import icon7 from "../public/svgicons/footernavicon7.svg";
import icon8 from "../public/svgicons/footernavicon8.svg";

export default function Footernav() {
  const pathName = usePathname();

  return (
    <div className="grid grid-cols-4 bg-secondary-50 py-5 px-1 fixed bottom-0 w-full">
      {footernavitems.map((item) => (
        <Link
          href={item.href}
          key={item.index}
          className="flex flex-col justify-between items-center text-sm whitespace-nowrap"
        >
          <div className="flex items-center justify-center">
            <Image
              src={pathName === item.href ? item.activeicon : item.icon}
              alt={item.name}
            />
          </div>
          <div
            className={`flex items-center justify-center
          ${pathName === item.href ? "text-primary-350" : ""}
          `}
          >
            {item.name}
          </div>
        </Link>
      ))}
    </div>
  );
}

const footernavitems = [
  {
    index: 1,
    icon: icon1,
    activeicon: icon5,
    href: "/",
    name: "Home",
  },
  {
    index: 1,
    icon: icon2,
    activeicon: icon6,
    href: "/dealcategory",
    name: "Deal Match",
  },
  {
    index: 1,
    icon: icon3,
    activeicon: icon7,
    href: "/ourservices",
    name: "Our Services",
  },
  {
    index: 1,
    icon: icon4,
    activeicon: icon8,
    href: "/profile",
    name: "Profile",
  },
];
