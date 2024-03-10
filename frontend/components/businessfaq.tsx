"use client";
import { ChevronUp, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { Collapse } from "react-collapse";

interface FAQItem {
  index: number;
  name: string;
  desc: string;
}

export default function BusinessFAQ() {
  const [openItemIndex, setOpenItemIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setOpenItemIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="  pb-14">
      <p className="font-bold text-2xl py-10">Concept of Business</p>

        {faqitems.map((item: FAQItem) => (
          <div key={item.index}>
            <div
              onClick={() => handleItemClick(item.index)}
              className="cursor-pointer flex justify-between items-center"
            >
              <p className="text-2xl text-secondary-500 font-medium">
                {item.name}
              </p>
              <div className="text-primary-350">
                {openItemIndex === item.index ? <ChevronUp/> : <ChevronDown />}
              </div>
            </div>
            <Collapse isOpened={openItemIndex === item.index}>
              <div className="text-secondary-400 font-medium py-2">
                {item.desc}
              </div>
            </Collapse>
            <hr className="border-secondary-350 mt-2 pb-5" />
          </div>
        ))}
      </div>
    </div>
  );
}

const faqitems: FAQItem[] = [
  {
    index: 1,
    name: "How does Expert Business service's work ?",
    desc: "Expert Business products are innovative digital business cards designed to make sharing and exchanging your contact information quicker and more effective. With a simple tap on an NFS-enabled phone a link with your contact details will instandly open, ready to be saved.",
  },
  {
    index: 2,
    name: "How do I add my details ?",
    desc: "Expert Business products are innovative digital business cards designed to make sharing and exchanging your contact information quicker and more effective. With a simple tap on an NFS-enabled phone a link with your contact details will instandly open, ready to be saved.",
  },
  {
    index: 3,
    name: "Does the other person need an app to receive my info ?",
    desc: "Expert Business products are innovative digital business cards designed to make sharing and exchanging your contact information quicker and more effective. With a simple tap on an NFS-enabled phone a link with your contact details will instandly open, ready to be saved.",
  },
  {
    index: 4,
    name: "Is there a monthly subscription fee ?",
    desc: "Expert Business products are innovative digital business cards designed to make sharing and exchanging your contact information quicker and more effective. With a simple tap on an NFS-enabled phone a link with your contact details will instandly open, ready to be saved.",
  },
  {
    index: 5,
    name: "What are the benefits of using Expert Business Services ?",
    desc: "Expert Business products are innovative digital business cards designed to make sharing and exchanging your contact information quicker and more effective. With a simple tap on an NFS-enabled phone a link with your contact details will instandly open, ready to be saved.",
  },
];
