"use client";
//main page of testimonial

import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { AxiosInstance } from "@/app/repositories/config";
import toast from "react-hot-toast";
import Link from "next/link";
import { Context } from "@/app/context/context";

export default function Page() {
  const [userData, setUserData] = useState([
    {
      fullName: "",
      email: "",
      role: "",
      userId: "",
    },
  ]);


  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { data } = await AxiosInstance.get("/users/all/admin");
        console.log(data);
        setUserData(data.data);
        setRefresh(0);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    loadUserData();
  }, [refresh]);

  useEffect(() => {
    setLoading(false);
  }, [userData]);

  const handleDelete = async (userId: string) => {
    try {
      const { data } = await AxiosInstance.delete(`/users/${userId}`);
      console.log(data.data);
      setRefresh(1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoleChange=async(selectedRole:string,userId:string)=>{
    try {
        const {data}=await AxiosInstance.patch(`/admin/${userId}`,{role:selectedRole});
        console.log(data.data)
        toast.success(data.data.msg)
    } catch (error:any) {
        console.log(error.message)
        toast.error(error.message)
    }
  }

  const { user,loading,setLoading }: any = useContext(Context);
  return (
    <>
      {loading ? (
        <>
          <div>Loading</div>
        </>
      ) : (
        <>
          <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="items-start justify-between md:flex">
              <div className="max-w-lg">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                  Admins
                </h3>
              </div>
              <div className="mt-3 md:mt-0">
                <Link
                  href="/admin-dashboard/admins/add"
                  className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-700 md:text-sm"
                >
                  Create admins
                </Link>
              </div>
            </div>
           
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
              <table className="w-full table-auto text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                  <tr>
                    <th className="py-3 px-6">Full Name</th>
                    <th className="py-3 px-6">Email</th>
                    <th className="py-3 px-6">Role</th>
                    <th className="py-3 px-6"></th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
                  {userData &&
                    userData.length > 0 &&
                    userData.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.fullName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {/* {item.email} */}
                          {/* <select defaultValue={item.role}  onChange={(e) => handleRoleChange(e.target.value,item.userId)}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select> */}
                          {item.role}
                        </td>

                        <td className="text-right px-6 whitespace-nowrap">
                          <button
                            className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                            onClick={() => handleDelete(item.userId)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}
