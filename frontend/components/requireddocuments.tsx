import { Dot } from "lucide-react";
import React from "react";

export default function Requireddocuments() {
  return (
    <div className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 mb-10 flex justify-center content-center">
      <div>
        <p className="text-lg md:text-xl xl:text-2xl font-semibold">
          Documents Required to Apply
        </p>
        <p className="text-secondary-300 pt-2 pb-4">
          The following factors are taken into consideration when a lender goes
          through your loan application. If you meet these criteria, you are
          eligible for a personal loan:
        </p>
        <div
          className="grid grid-cols-3 bg-primary-350 text-md md:text-xl xl:text-2xl font-semibold
         text-white py-3 xl:px-10 px-3 md:px-5"
        >
          <p>Criteria</p>
          <p>Salaried</p>
          <p>Self-Employeed</p>
        </div>
        <table className="w-full">
          <tbody>
            {documentitems.map((item) => (
              <tr
                key={item.index}
                className={`grid grid-cols-3 px-10 py-2 ${
                  item.index % 2 === 1
                    ? "text-secondary-300 bg-secondary-50"
                    : "text-primary-350"
                }`}
              >
                <td>{item.name}</td>
                <td>{item.des1}</td>
                <td>{item.des2}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pt-4">
          <p className="font-medium ">
            If you are an NRN looking for borrow a personal loan these are the
            documents that you will need to submit to the lender.
          </p>
          {nrndocuments.map((item) => (
            <li
              key={item.index}
              className="my-2 text-secondary-400 flex gap-2 list-none"
            >
              <Dot className="text-primary-350" />
              <p>{item.name}</p>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}

const documentitems = [
  {
    index: 1,
    name: "Proof of Identity",
    des1: "21 years to 60 years",
    des2: "Manager",
  },
  {
    index: 2,
    name: "Proof of Residence",
    des1: "Rs. 15,000",
    des2: "Rs. 25,000",
  },
  {
    index: 3,
    name: "Proof of Income",
    des1: "Above 750",
    des2: "Above 750",
  },
];

const nrndocuments = [
  {
    index: 1,
    name: "Copy of your passport",
  },
  {
    index: 2,
    name: "Visa Copy",
  },
  {
    index: 3,
    name: "Your official Email ID or the Email ID of the HR",
  },
  {
    index: 4,
    name: "Bank Statement",
  },
  {
    index: 5,
    name: "Salary Certificate or salary slips",
  },
  {
    index: 6,
    name: "NRO/NRE back statement of the last 6 Months",
  },
  {
    index: 7,
    name: "Proff of Identity, Residence, Income, and Assets",
  },
  {
    index: 8,
    name: "Recent passport-size Photographs o f yourself and guarantors",
  },
];
