"use client";
import {
  AlertOctagon,
  CircleUserRound,
  HandPlatter,
  Handshake,
  LogOut,
  Mail,
  MessageCircleQuestion,
  MessageSquareMore,
  Search,
  SquarePen,
  Users,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosInstance } from "../repositories/config";
import expertLogo from "../../public/svgicons/expertlogo.svg";
import Image from "next/image";
import { Context } from "../context/context";

export default function Layout({ children }: { children: React.ReactNode }) {
  const profileRef = useRef<any>();
  const [isProfileActive, setIsProfileActive] = useState(false);
  const { user }: any = useContext(Context);
  const router = useRouter();
  console.log(user);

  const navigationSuper = [
    {
      href: "/admin-dashboard/admins",
      name: "Admins",
      icon: <Users />,
    },
    {
      href: "/admin-dashboard/categories",
      name: "Deal-Match",
      icon: <Handshake />,
    },
    {
      href: "/admin-dashboard/service",
      name: "Service",
      icon: <HandPlatter />,
    },
    {
      href: "/admin-dashboard/testimonial",
      name: "Testimonial",
      icon: <MessageSquareMore />,
    },
    {
      href: "/admin-dashboard/faq",
      name: "FAQ",
      icon: <MessageCircleQuestion />,
    },
    {
      href: "/admin-dashboard/enquiry/",
      name: "Enquiry",
      icon: <Mail />,
    },
    {
      href: "/admin-dashboard/blogCategories",
      name: "Blog",
      icon: <SquarePen />,
    },
    {
      href: "/admin-dashboard/Contacts",
      name: "Contact",
      icon: <CircleUserRound />,
    },
    {
      href: "/admin-dashboard/jobs",
      name: "Job Application",
      icon: <Search />,
    },
  ];

  const navigationOther = [
    {
      href: "/admin-dashboard/categories",
      name: "Deal-Match",
      icon: <Handshake />,
    },
    {
      href: "/admin-dashboard/service",
      name: "Service",
      icon: <HandPlatter />,
    },
    {
      href: "/admin-dashboard/testimonial",
      name: "Testimonial",
      icon: <MessageSquareMore />,
    },
    {
      href: "/admin-dashboard/faq",
      name: "FAQ",
      icon: <MessageCircleQuestion />,
    },
    // {
    //   href: "/admin-dashboard/enquiry/inbox",
    //   name: "Enquiry",
    //   icon: <Mail />,
    // },
    {
      href: "/admin-dashboard/blogCategories",
      name: "Blog",
      icon: <SquarePen />,
    },
    {
      href: "/admin-dashboard/Contacts",
      name: "Contact",
      icon: <CircleUserRound />,
    },
    {
      href: "/admin-dashboard/jobs",
      name: "Job Application",
      icon: <Search />,
    },
  ];

  const navsFooter = [
    {
      href: "/admin-dashboard",
      name: "Logout",
      icon: <LogOut />,
    },
  ];

  useEffect(() => {
    const handleProfile = (e: any) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setIsProfileActive(false);
    };
    document.addEventListener("click", handleProfile);
  }, []);

  const pathName = usePathname();
  console.log(pathName);

  const handleLogOut = async () => {
    try {
      const { data } = await AxiosInstance.get("/users/logout");
      console.log(data);
      toast.success(data.msg);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {pathName !== "/admin-dashboard" && (
        <nav className="fixed top-0 left-0 w-30 h-full border-r bg-white space-y-8 ">
          <div className="flex flex-col h-full">
            <div className="h-20 flex items-center justify-center px-8">
              <a href="/" className="flex-none">
                <Image src={expertLogo} alt="Logo" width={120} height={60} />
              </a>
            </div>
            <div className="flex-1 flex flex-col h-full ">
              {user && user.role === "super-admin" && (
                <>
                  <ul className="px-4 text-sm font-medium flex-1 flex flex-col justify-center items-center">
                    {navigationSuper.map((item, idx) => (
                      <li key={idx} className="py-1">
                        <a
                          href={item.href}
                          className={`relative flex items-center  justify-center gap-x-2 py-3 text-gray-600 w-20  rounded-lg  hover:bg-blue-500  active:bg-gray-100 duration-150 group ${
                            pathName === item.href ? "bg-blue-500" : ""
                          }`}
                        >
                          <div
                            className={`text-gray-500 hover:text-white ${
                              pathName === item.href ? "text-white" : ""
                            } `}
                          >
                            {item.icon}
                          </div>
                          <span className="absolute left-14 p-1 px-1.5 rounded-md whitespace-nowrap text-xs text-white bg-gray-800 hidden group-hover:inline-block group-focus:hidden duration-150">
                            {item.name}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {user && user.role !== "super-admin" && (
                <>
                  <ul className="px-4 text-sm font-medium flex-1 flex flex-col justify-center items-center">
                    {navigationOther.map((item, idx) => (
                      <li key={idx} className="py-1 ">
                        <a
                          href={item.href}
                          className={`relative flex items-center  justify-center gap-x-2 py-3 text-gray-600 w-20  rounded-lg  hover:bg-blue-500 active:bg-gray-100 duration-150 group ${
                            pathName === item.href ? "bg-blue-500" : ""
                          }`}
                        >
                          <div
                            className={`text-gray-500 hover:text-white ${
                              pathName === item.href ? "text-white" : ""
                            } `}
                          >
                            {item.icon}
                          </div>
                          <span className="absolute left-14 p-1 px-1.5 rounded-md whitespace-nowrap text-xs text-white bg-gray-800 hidden group-hover:inline-block group-focus:hidden duration-150">
                            {item.name}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div>
                <ul className="px-4 pb-4 text-sm font-medium">
                  {navsFooter.map((item, idx) => (
                    <li key={idx}>
                      <a
                        href={item.href}
                        onClick={handleLogOut}
                        className="relative flex items-center justify-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150 group"
                      >
                        <div className="text-gray-500">{item.icon}</div>
                        <span className="absolute left-14 p-1 px-1.5 rounded-md whitespace-nowrap text-xs text-white bg-gray-800 hidden group-hover:inline-block group-focus:hidden duration-150">
                          {item.name}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                {/* <div className="relative py-4 px-4 border-t">
                  <div className="absolute bottom-4 left-20 w-64 rounded-lg bg-white shadow-md border text-sm text-gray-600">
                    <div className="p-2">
                      <button
                        className="block w-full p-2 text-left rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150"
                        onClick={handleLogOut}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </nav>
      )}
      <ToastContainer />
      <div className={`${pathName === "/admin-dashboard" ? "" : "ml-40"}`}>
        <div className=" py-20 px-7 ">{children}</div>
      </div>
    </div>
  );
}
