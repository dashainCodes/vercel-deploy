"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AxiosInstance } from "@/app/repositories/config";
import {toast} from 'react-toastify'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
interface FaqData {
  heading: string;
  description: string;
}

export default function Page() {
  const pathname = usePathname();
  const faqId = pathname.split("/")[4];
  console.log(faqId);

  const [faqData, setFaqData] = useState<FaqData>();

 
  useEffect(() => {
    const fetchFaqdata = async () => {
      try {
        const { data } = await AxiosInstance.get(`/faqs/${faqId}`);
        console.log(data.data);
        setFaqData(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (faqId) {
      fetchFaqdata();
    }
  }, [faqId]);

  return (
    <>
      {faqData && (
        <>
          <Link href="/admin-dashboard/faq/" className="px-5 py-2">
            <FontAwesomeIcon icon={faArrowLeft} color="blue"></FontAwesomeIcon>
          </Link>

          <div className="flex flex-col gap-[1rem] w-full items-center px-5">
            <div className="flex flex-col gap-[0.5rem] w-full">
              <div className="font-bold text-gray-800">Question</div>
              <div className="px-3 py-1 border-2 border-gray-300 ">{faqData.heading}</div>
            </div>
            <div className="flex flex-col gap-[0.5rem] w-full">
              <div className="font-bold text-gray-800">Description</div>
              <div className="px-3 py-1 border-2 border-gray-300 ">
                {faqData.description}
              </div>
            </div>
          </div>
        </>
      )}
      {!faqData && <div>No data found</div>}
    </>
  );
}
