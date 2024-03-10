"use client";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import { Collapse } from "react-collapse";
import { useEffect } from "react";
import { AxiosInstance } from "@/app/repositories/config";
import {toast} from 'react-toastify';

interface OutFaq{
  heading:string,
  description:string,
  faqId:string,
}

export default function FAQ() {
  const [openItemIndex, setOpenItemIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setOpenItemIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const [faqDatas,setFaqDatas]=useState<OutFaq[]>([]);
  const [refresh,setRefresh]=useState(0)
  const [loading, setLoading] = useState(false);
  //load faq data

  useEffect(() => {
    const loadFaqData = async () => {
      try {
        setLoading(true);
        const { data } = await AxiosInstance.get("/faqs");
        console.log(data);
        setFaqDatas(data.data);
        setLoading(false);
        setRefresh(0)
      } catch (error: any) {
        toast.error(error.response.data.msg);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    loadFaqData();
  }, [refresh]);
  return (
    <div className="bg-secondary-50 flex items-center justify-center">
      <div className=" px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 pb-14" data-aos="fade-up">
        <p className=" text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold pt-16 pb-8">
          Frequently Asked Questions
        </p>
        {faqDatas && faqDatas.length>0 && faqDatas.map((item: OutFaq,index:number) => (
          <div key={index}>
            <div
              onClick={() => handleItemClick(index)}
              className="cursor-pointer flex justify-between items-center"
            >
              <p className="text-md md:text-xl xl:text-2xl text-secondary-500 font-medium">
                {item.heading}
              </p>
              <div className="text-primary-350">
                {openItemIndex === index ? <Minus /> : <Plus />}
              </div>
            </div>
            <Collapse isOpened={openItemIndex === index}>
              <div className="text-secondary-400 text-md font-normal py-2">
                {item.description}
              </div>
            </Collapse>
            <hr className="border-white my-2" />
          </div>
        ))}
        {
          faqDatas && faqDatas.length==0 && (<><div className="font-bold text-xl">No faqs yet.</div></>)
        }
      </div>
    </div>
  );
}

// const faqitems: FAQItem[] = [
//   {
//     index: 1,
//     name: "How does Expert Business service's work ?",
//     desc: "Expert Business products are innovative digital business cards designed to make sharing and exchanging your contact information quicker and more effective. With a simple tap on an NFS-enabled phone a link with your contact details will instandly open, ready to be saved.",
//   },
//   {
//     index: 2,
//     name: "How do I add my details ?",
//     desc: "Expert Business products are innovative digital business cards designed to make sharing and exchanging your contact information quicker and more effective. With a simple tap on an NFS-enabled phone a link with your contact details will instandly open, ready to be saved.",
//   },
//   {
//     index: 3,
//     name: "Does the other person need an app to receive my info ?",
//     desc: "Expert Business products are innovative digital business cards designed to make sharing and exchanging your contact information quicker and more effective. With a simple tap on an NFS-enabled phone a link with your contact details will instandly open, ready to be saved.",
//   },
//   {
//     index: 4,
//     name: "Is there a monthly subscription fee ?",
//     desc: "Expert Business products are innovative digital business cards designed to make sharing and exchanging your contact information quicker and more effective. With a simple tap on an NFS-enabled phone a link with your contact details will instandly open, ready to be saved.",
//   },
//   {
//     index: 5,
//     name: "What are the benefits of using Expert Business Services ?",
//     desc: "Expert Business products are innovative digital business cards designed to make sharing and exchanging your contact information quicker and more effective. With a simple tap on an NFS-enabled phone a link with your contact details will instandly open, ready to be saved.",
//   },
// ];
