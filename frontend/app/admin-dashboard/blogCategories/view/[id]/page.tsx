//view page of each category
"use client";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AxiosInstance } from "@/app/repositories/config";
import toast from "react-hot-toast";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Context } from "@/app/context/context";

interface BlogData {
  author: string;
  title: string;
  content: string;
  category: string;
  blogId: string;
  createdAt: string;
}

export default function Page() {
  const pathname = usePathname();
  const categoryId = pathname.split("/")[4];
  console.log(categoryId);

  const [blogData, setBlogData] = useState<BlogData[]>([]);
  const [categoryData, setCategoryData] = useState<any>();
  const [refresh, setRefresh] = useState(0);
  //to extract id

  useEffect(() => {
    const fetchCategorydata = async () => {
      try {
        const { data } = await AxiosInstance.get(
          `/categories-blog/${categoryId}`
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
    const fetchBlogdata = async () => {
      try {
        setRefresh(0);
        const { data } = await AxiosInstance.get(
          `/blogs/info/${categoryData._id}`
        );
        console.log(data.data);
        setBlogData(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogdata();
  }, [categoryData,refresh]);

  const handleDelete = async (blogId: string) => {
    try {
      const { data } = await AxiosInstance.delete(`/blogs/${blogId}`);
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
              {categoryData ? `Blogs of ${categoryData.category}` : "Blogs"}
            </h3>
          </div>
          <div className="mt-3 md:mt-0">
            <Link
              href={`/admin-dashboard/blogCategories/view/${categoryId}/add`}
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-700 md:text-sm"
            >
              Add Blog
            </Link>
          </div>
        </div>
        <Link href={`/admin-dashboard/blogCategories/`} className="py-2">
          <FontAwesomeIcon icon={faArrowLeft} color="blue"/>
        </Link>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Title</th>
                <th className="py-3 px-6">Author</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {blogData &&
                blogData.length > 0 &&
                blogData.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.createdAt.slice(0, 10)}
                    </td>
                    <td className="text-right px-6 whitespace-nowrap">
                      <Link
                        href={`/admin-dashboard/blogCategories/view/${categoryId}/view/${item.blogId}`}
                        className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        View
                      </Link>
                      {
                        user && user.role=="super-admin" && (  <Link
                          href={`/admin-dashboard/blogCategories/view/${categoryId}/edit/${item.blogId}`}
                          className="py-2 px-3 font-medium text-yellow-600 hover:text-yellow-500 duration-150 hover:bg-gray-50 rounded-lg"
                        >
                          Edit
                        </Link>)
                      }
                    
                      {user && user.role=="super-admin" && (<button
                        className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                        onClick={() => handleDelete(item.blogId)}
                      >
                        Delete
                      </button>)}
                      
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
