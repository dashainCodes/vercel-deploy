import React from "react";

export default function Loaneligibility() {
  return (
    <div className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 mb-10 flex justify-center items-center">
      <div>
        <p className="text-lg md:text-xl xl:text-2xl font-semibold">
          Personal Loan Eligibility
        </p>
        <p className="text-secondary-300 pt-2 pb-4">
          The following factors are taken into consideration when a lender goes
          through your loan application. If you meet these criteria, you are
          eligible for a personal loan:
        </p>
        <div
          className="grid grid-cols-3 bg-primary-350 text-md md:text-xl xl:text-2xl font-semibold
         text-white py-3 xl:px-10 px-3 md:px-5 "
        >
          <p>Criteria</p>
          <p>Salaried</p>
          <p>Self-Employeed</p>
        </div>
        <table className="w-full">
          <tbody>
            {eligibilityitems.map((item) => (
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
      </div>
    </div>
  );
}

const eligibilityitems = [
  {
    index: 1,
    name: "Age",
    des1: "21 years to 60 years",
    des2: "Manager",
  },
  {
    index: 2,
    name: "Net Monthly Mncome",
    des1: "Rs. 15,000",
    des2: "Rs. 25,000",
  },
  {
    index: 3,
    name: "Minimum Loan Amount",
    des1: "Above 750",
    des2: "Above 750",
  },
  {
    index: 4,
    name: "Maximum Loan Amount",
    des1: "Rs. 50,000",
    des2: "Rs. 50 Lakh",
  },
];
