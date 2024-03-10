import { Dot } from "lucide-react";
import React from "react";

export default function Paymentdetails() {
  return (
    <div className="pb-10 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 ">
      <div>
        <p className="text-lg md:text-xl xl:text-2xl font-semibold">
          Pre-Payment and Part Payment in Personal Loan
        </p>
        <p className="pb-4 text-secondary-300">
          A personal loan is given for a stipulated time period. This period is
          known as the loan repayment tenure. After you have taken a loan, you
          are expected to pay the debt off by the end of the loan repayment
          tenure through EMIs. However, after availing a loan, if you decide to
          pay off your debt before the end of the loan repayment period, it is
          called pre-payment or foreclosure.
        </p>
        <p className="text-lg md:text-xl xl:text-2xl font-semibold">
          Types of Pre-Payment:
        </p>
        <p className=" text-secondary-300">
          A personal loan is given for a stipulated time period. This period is
          known as the loan repayment tenure.
        </p>
      </div>
      <div className="pb-4">
        {listitems1.map((item) => (
          <div key={item.index}>
            <p className="text-lg md:text-xl xl:text-2xl font-semibold">
              {item.title}
            </p>
            <p className="text-lg md:text-xl xl:text-2xl ">Advantage</p>
            {Object.values(item.name).map((name, index) => (
              <div className="flex" key={index}>
                <Dot className="text-primary-350" />
                <p className="text-secondary-300">{name}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        {listitems2.map((item) => (
          <div key={item.index}>
            <p className="text-lg md:text-xl xl:text-2xl font-semibold">
              {item.title}
            </p>
            <p className="text-lg md:text-xl xl:text-2xl ">Advantage</p>
            {Object.values(item.name).map((name, index) => (
              <div className="flex" key={index}>
                <Dot className="text-primary-350" />
                <p className="text-secondary-300">{name}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const listitems1 = [
  {
    index: 1,
    title: "1. Full Pre-Payment",
    name: {
      name1: "Copy of document",
      name2: "Copy of document",
      name3: "Copy of document",
    },
  },
];
const listitems2 = [
  {
    index: 2,
    title: "2. Part Pre-Payment",
    name: {
      name1: "Copy of document",
      name2: "Copy of document",
      name3: "Copy of document",
    },
  },
];
