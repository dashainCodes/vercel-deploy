"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import bankicon from "../public/svgicons/bankicon.svg";
import { ChevronDown, ChevronUp } from "lucide-react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Collapse } from "react-collapse";
import "react-modern-drawer/dist/index.css";
import logo from "../public/svgicons/hdfc-bank 2.svg";
// import Inquiryform from "./inquiryform";
import { Context } from "../app/context/context";

interface LoanItem {
  index: number;
  name: string;
  logo: string;
  interest: string;
  fee: string;
  loan: string;
  tenure: string;
}

export default function Availableloandetails() {
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [selectedItem, setSelectedItem] = useState<LoanItem | null>(null);
  const { openForm, setOpenForm, isOpenInquery, setIsOpenInquery }: any =
    useContext(Context);

  const toggleContent = () => {
    setIsContentOpen((prev) => !prev);
  };

  const toggleDrawer = () => {
    setOpenForm(true);
    setIsOpenInquery(true);
  };
  const onCloseModal = () => {
    setOpenForm(false);
    setIsOpenInquery(false);
  };

  const handleItemClick = (item: LoanItem) => {
    setSelectedItem(item);
    setShowTable(true);
  };
  return (
    <div className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 mb-10">
      <div className="bg-secondary-50 p-2 flex gap-6 font-medium text-xl">
        <div>Filter by:</div>
        <button
          className="flex gap-2 justify-center items-center cursor-pointer relative"
          onClick={toggleContent}
        >
          <Image src={bankicon} alt="icon" />
          <span>Bank</span>
          {isContentOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>
      <Collapse isOpened={isContentOpen}>
        <div className="p-5 bg-white border border-gray-200 rounded shadow mb-4">
          <div className="p-10 h-fit w-fit grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-10 gap-y-5 ">
            {modalitems?.map((item) => (
              <div key={item?.index}>
                <div className="flex gap-2 " onClick={toggleContent}>
                  <input type="checkbox" />
                  <div className="flex gap-1 items-center ">
                    <div>
                      <Image
                        src={item?.logo}
                        alt="logo"
                        className="min-h-8 min-w-8"
                      />
                    </div>
                    <p>{item?.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Collapse>

      <p className="py-3 text-secondary-400">we found three loan</p>
      <hr className="pb-2" />
      <>
        <div className="py-10 h-fit w-fit grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-10 gap-y-5 ">
          {modalitems?.map((item) => (
            <div
              key={item?.index}
              className="flex gap-1 items-center cursor-pointer"
              onClick={() => handleItemClick(item)}
            >
              <div>
                <Image
                  src={item?.logo}
                  alt="logo"
                  className="min-h-16 min-w-16"
                />
              </div>
              <p>{item?.name}</p>
            </div>
          ))}
        </div>

        {selectedItem && showTable && (
          <table className="w-full bg-white mb-10">
            <tbody>
              <tr>
                <td className="border border-collapse border-secondary-400 p-3 items-center font-medium">
                  <p className="font-semibold">Name:</p>
                </td>
                <td className="border border-collapse border-secondary-400 p-3 items-center font-medium">
                  <p className="text-secondary-450">{selectedItem?.name}</p>
                </td>
              </tr>
              <tr>
                <td className="border border-collapse border-secondary-400 p-3 items-center font-medium">
                  <p className="font-semibold">Interest Rate:</p>
                </td>
                <td className="border border-collapse border-secondary-400 p-3 items-center font-medium">
                  <p className="text-secondary-450">{selectedItem?.interest}</p>
                </td>
              </tr>
              <tr>
                <td className="border border-collapse border-secondary-400 p-3 items-center font-medium">
                  <p className="font-semibold">Fee:</p>
                </td>
                <td className="border border-collapse border-secondary-400 p-3 items-center font-medium">
                  <p className="text-secondary-450">{selectedItem?.fee}</p>
                </td>
              </tr>
              <tr>
                <td className="border border-collapse border-secondary-400 p-3 items-center font-medium">
                  <p className="font-semibold">Loan:</p>
                </td>
                <td className="border border-collapse border-secondary-400 p-3 items-center font-medium">
                  <p className="text-secondary-450">{selectedItem?.loan}</p>
                </td>
              </tr>
              <tr>
                <td className="border border-collapse border-secondary-400 p-3 items-center font-medium">
                  <p className="font-semibold">Tenure:</p>
                </td>
                <td className="border border-collapse border-secondary-400 p-3 items-center font-medium">
                  <p className="text-secondary-450">{selectedItem?.tenure}</p>
                </td>
              </tr>
            </tbody>
          </table>
        )}

        <button
          className="h-6 w-20 sm:h-8 sm:w-28 bg-primary-350 text-white rounded-md"
          onClick={toggleDrawer}
        >
          Enquiry
        </button>
      </>

      {isOpenInquery && (
        <Modal
          open={openForm}
          onClose={onCloseModal}
          center
          styles={{ modal: { height: "100vh", width: "100%", margin: "0px" } }}
        >
          {/* <div className=" h-fit">
            <Inquiryform />
          </div> */}
        </Modal>
      )}
    </div>
  );
}

const modalitems = [
  {
    index: 1,
    name: "HDFC",
    logo: logo,
    interest: "10.50% - 24.00%",
    fee: "Nrs.4994",
    loan: "Nrs.4533434",
    tenure: "1-3 years",
  },
  {
    index: 2,
    name: "HDFC",
    logo: logo,
    interest: "3.50% - 24.00%",
    fee: "Nrs.4939",
    loan: "Nrs.4533434",
    tenure: "1-5 years",
  },
  {
    index: 3,
    name: "HDFC",
    logo: logo,
    interest: "10.50% - 24.00%",
    fee: "Nrs.4999",
    loan: "Nrs.4533434",
    tenure: "1-6 years",
  },
];
