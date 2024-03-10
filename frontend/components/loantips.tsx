import React from "react";

export default function Loantips() {
  return (
    <div className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 mb-10 flex justify-center items-center">
      <div>
        <p className="text-lg md:text-xl xl:text-2xl font-semibold">
          Tips for Successful Personal Loan Application
        </p>
        <p className="text-secondary-300 pt-2 pb-4">
          Thes are a few important things to keep in mind when searching for a
          personal loan. Check out list of most helpful tips that will certainly
          help you with your personal loans.
        </p>
        <div className="grid grid-cols-2 bg-secondary-50 text-lg md:text-xl xl:text-2xl font-semibold text-white py-3 px-10">
          <p className="text-green-600">Do&apos;s</p>
          <p className="text-red-600">Don&apos;ts</p>
        </div>
        <table className="w-full">
          <tbody>
            {loantipsitems?.map((item) => (
              <tr key={item?.index} className="grid grid-cols-2 px-10 py-2 ">
                <td className="text-green-600">{item?.des1}</td>
                <td className="text-red-600">{item?.des2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const loantipsitems = [
  {
    index: 1,
    des1: "Do proper research before you apply for a loan",
    des2: "MaDo not sign your loan documents without understanding evernager",
  },
  {
    index: 2,
    des1: "Do read the fine print carefully",
    des2: "Do not make multiple inquiries regarding loans from different banks",
  },
  {
    index: 3,
    des1: "Do save your money carefully when you are repaying",
    des2: "Do not take a personal loan without any serious purpose",
  },
  {
    index: 4,
    des1: "Do pay your loan instalment promptly every single time",
    des2: "Do not be in a hurry to end your loan comparison process",
  },
  {
    index: 5,
    des1: "Do evaluate your credit score thoroughly",
    des2: "Do not forget to pay your loan instalments",
  },
  {
    index: 6,
    des1: "Do apply for an affordable loan amount",
    des2: "Do not accept bad loan products",
  },
];
