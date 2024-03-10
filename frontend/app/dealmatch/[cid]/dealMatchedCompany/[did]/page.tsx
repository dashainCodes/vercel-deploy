"use client";
import Image from "next/image";
import React, { useContext } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import ideaicon from "../../../../../public/svgicons/el_idea-alt.svg";
import BusinessFAQ from "@/components/businessfaq";
import DealEnquiry from "@/components/dealInquiry";
import Shareoption from "@/components/shareoption";
import { Context } from "../../../../context/context";
import { useState,useEffect } from "react";
import { AxiosInstance } from "@/app/repositories/config";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
interface dealData {
  companyName: string;
  companyMail: string;
  companyLocation: string;
  heading: string;
  description: string;
  businessConcept: string;
  contentImage: string;
  dealId: string;
  companyLogo: string;
  conceptOfBusiness: string[];
  _id:string;
}
export default function Page() {
  const { openForm, setOpenForm, isOpenInquery, setIsOpenInquery }: any =
    useContext(Context);
    const pathName=usePathname()
const dealId=pathName.split('/')[4]
console.log(dealId)
  const toggleDrawer = () => {
    setOpenForm(true);
    setIsOpenInquery(true);
  };
  const onCloseModal = () => {
    setOpenForm(false);
    setIsOpenInquery(false);
  };

  const [dealData, setDealData] = useState<dealData>();
  const [refresh, setRefresh] = useState(0);
  //to extract id

 
  useEffect(() => {
    const fetchDealData = async () => {
      try {
        const { data } = await AxiosInstance.get(`/deals/${dealId}`);
        console.log(data.data);
        setDealData(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDealData();
  }, [dealId]);

  return (
    <>
    {
      dealData && (<>
      <div className="flex justify-center items-center px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 ">
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:gap-20">
        <div className="flex flex-col justify-center items-center lg:sticky top-40 bg-white rounded-3xl border border-gray-300 w-80 h-fit py-7 sm:px-10 mt-12 lg:mb-12 ">
          <div >
            <Image src={dealData.companyLogo} alt="logo"  width={75} height={75}/>
          </div>
          <p className="text-2xl font-bold py-5">{dealData.companyName}</p>
          <div className="flex flex-col items-center">
            <p className="text-secondary-350 font-normal ">
              {dealData.companyLocation}
            </p>
            <p className="text-secondary-350 font-normal ">
             {dealData.companyMail}
            </p>
          </div>
        </div>
        <div>
          <div>
            <p className="text-4xl font-semibold py-7 ">
              {dealData.heading}
            </p>
            <p className="flex items-center justify-center">
              {dealData.description}
            </p>
            <div className="flex items-center justify-center">
              <Image src={dealData.contentImage} alt="banner"  width={300} height={300} className="my-12" />
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row justify-between items-center">
              <div className="flex gap-4 items-center mb-10">
                <p className="font-bold text-2xl">Business Idea</p>
                <Image src={ideaicon} alt="idea icon" width={30} height={30}/>
              </div>
              <Shareoption />
            </div>
            <div className="flex py-6 gap-2">
              <p className="text-primary-300 font-semibold text-2xl">
                Concept:
              </p>
              <p className="font-normal text-2xl text-secondary-300">
               {dealData.businessConcept}
              </p>
            </div>
            <button
              className="h-8 w-28 bg-primary-350 text-white rounded-md mb-10"
              onClick={toggleDrawer}
            >
              Enquiry
            </button>
          </div>

          <BusinessFAQ />
          {/* <div className="flex flex-col">
            <div className="font-bold text-2xl">Concept of Business</div>
<div className="flex flex-col">
{dealData.conceptOfBusiness.map((item,index)=>(
  <li key={index}>
{item}
    </li>
))}
</div>
          </div> */}
        </div>
      </div>
      {isOpenInquery && (
        <Modal
          open={openForm}
          onClose={onCloseModal}
          center
          styles={{ modal: { height: "100vh", width: "100%", margin: "0px" } }}
        >
          <div className=" h-fit">
            <DealEnquiry dealId={dealData._id} />
          </div>
        </Modal>
      )}
    </div>
      </>)
    }
    </>
  );
}
