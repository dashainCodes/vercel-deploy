"use client";
//all companies, view page of category
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AxiosInstance } from "@/app/repositories/config";
import toast from "react-hot-toast";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Context } from "@/app/context/context";

interface CompanyData {
  companyName: string;
  companyLocation: string;
  companyMail: string;
  companyLogo: string;
  companyId: string;
}

export default function Page() {
  const pathname = usePathname();
  const categoryId = pathname.split("/")[4];
  console.log(categoryId);

  const [categoryData, setCategoryData] = useState<any>();
  const [dealData, setDealData] = useState<any>();
  const [refresh, setRefresh] = useState(0);
  //to extract id

  useEffect(() => {
    const fetchCategorydata = async () => {
      try {
        const { data } = await AxiosInstance.get(
          `/categories-deal/${categoryId}`
        );
        console.log(data.data);
        setCategoryData(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategorydata();
  }, [categoryId]);

  useEffect(() => {
    const fetchDealdata = async () => {
      try {
        setRefresh(0);
        const { data } = await AxiosInstance.get(
          `/deals/info/${categoryData._id}`
        );
        console.log(data.data);
        setDealData(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDealdata();
  }, [categoryData, refresh]);

  const handleDelete = async (dealId: string) => {
    try {
      const { data } = await AxiosInstance.delete(`/deals/${dealId}`);
      console.log(data.data);
      setRefresh(1);
    } catch (error) {
      console.error(error);
    }
  };

  const { user }: any = useContext(Context);

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Companies
            </h3>
          </div>
          <div className="mt-3 md:mt-0">
            <Link
              href={`/admin-dashboard/categories/view/${categoryId}/add`}
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-700 md:text-sm"
            >
              Add Company
            </Link>
          </div>
        </div>
        <Link href={`/admin-dashboard/categories/`} className="py-2">
          <FontAwesomeIcon icon={faArrowLeft} color="blue" />
        </Link>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Logo</th>
                <th className="py-3 px-6">Email Address</th>
                <th className="py-3 px-6">Location</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {dealData &&
                dealData.length > 0 &&
                dealData.map((item: any, idx: any) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.companyName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={item.companyLogo}
                        width="30px"
                        height="30px"
                      ></img>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.companyMail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.companyLocation}
                    </td>
                    <td className="text-right px-6 whitespace-nowrap">
                      <Link
                        href={`/admin-dashboard/categories/view/${categoryId}/view/${item.dealId}`}
                        className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        View
                      </Link>
                      {user && user.role == "super-admin" && (
                        <Link
                          href={`/admin-dashboard/categories/view/${categoryId}/edit/${item.dealId}`}
                          className="py-2 px-3 font-medium text-yellow-600 hover:text-yellow-500 duration-150 hover:bg-gray-50 rounded-lg"
                        >
                          Edit
                        </Link>
                      )}

                      {user && user.role == "super-admin" && (
                        <>
                          <button
                            className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                            onClick={() => handleDelete(item.dealId)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
