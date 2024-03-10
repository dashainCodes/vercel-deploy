import React from "react";

export default function Loandetails() {
  return (
    <div>
      <div
        className="bg-secondary-50 mx-5 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20  mb-10 rounded-md pt-10 pb-20 
     border-t-0 transition-all duration-300 ease-in-out"
      >
        <p className="text-lg md:text-xl xl:text-2xl font-semibold px-10">
          Personal Loan Details
        </p>
        <p className="pt-3 pb-6 px-10 text-secondary-350">
          A personal loan is a type of unsecured loan that you can borrow from
          bank or finantial institution if you required fond to pay financial
          needs.
        </p>
        <div className="px-10">
          <table className="border border-collapse border-secondary-400 w-full  bg-white">
            <tbody>
              {tableitems.map((item) => (
                <tr
                  key={item.index}
                  className="border border-collapse border-secondary-400"
                >
                  <td className="border border-collapse border-secondary-400 py-2">
                    <p className="flex px-4 items-center font-medium">
                      {item.title}
                    </p>
                  </td>
                  <td className="border border-collapse border-secondary-400">
                    <p className="flex px-4 items-center text-secondary-450">
                      {item.desc}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const tableitems = [
  {
    index: 1,
    title: "Interest Rate",
    desc: "10.25 p.a onwards",
  },
  {
    index: 2,
    title: "Loan Amount",
    desc: "up to 1 cr",
  },
  {
    index: 3,
    title: "Loan Tenure",
    desc: "up to 6 year",
  },
  {
    index: 4,
    title: "Processing Fee",
    desc: "0% - 6 % of the loan amount + GST",
  },
];
