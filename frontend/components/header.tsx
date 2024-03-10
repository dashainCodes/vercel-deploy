"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import logo from ".././public/logo.png";
import Drawer from "react-modern-drawer";
import { useRouter } from "next/navigation";
import { Collapse } from "react-collapse";
import { usePathname, useSearchParams } from "next/navigation";
import "react-modern-drawer/dist/index.css";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import OurServices from "./ourservices";
import Signup from "./signup";
import Loginform from "./loginform";
import Link from "next/link";
import { Context } from "../app/context/context";
import { AxiosInstance } from "@/app/repositories/config";
import { toast } from "react-toastify";

const Header = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenNav, setIsOpenNav] = useState(false);

  const {
    isLogin,
    isSignUp,
    isOpen,
    isSignUPOpen,
    isLoginOpen,
    setIsLogin,
    setIsSignUp,
    setIsSignUPOpen,
    setIsLoginOpen,
    setIsOpen,
    isLoggedIn,setIsLoggedIn,user
  }: any = useContext(Context);

  const title = searchParams.get("title");

  const toggleDrawer = () => {
    setIsOpen(false);
  };
  const toggleDrawerMenu = () => {
    setIsOpenMenu((prevState) => !prevState);
  };

  const toggleDrawerNav = () => {
    setIsOpenNav((prevState) => !prevState);
    setIsOpenMenu(false);
  };

  const toggleSignUPDrawer = () => {
    setIsSignUPOpen(false);
  };

  const toggleLoginDrawer = () => {
    setIsLoginOpen(false);
  };

  const handleSignUp = () => {
    setIsSignUp(true);
    setIsSignUPOpen(true);
  };

  const handleLogin = () => {
    setIsLogin(true);
    setIsLoginOpen(true);
  };
  const handleLogout=async()=>{
    try {
const {data}=await AxiosInstance.get('/users/logout');
console.log(data.data)
      localStorage.removeItem('loggedIn')

      setIsLoggedIn(false)
    } catch (error:any) {
      toast.error(error.message)
    }
  
  }

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };
console.log(isLoggedIn)
  return (
    <div className="sticky top-0 z-10 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 bg-secondary-50">
      <div className="flex justify-between items-center h-20 gap-10">
        <div className="flex justify-between w-full">
          <Link href="/">
            <Image src={logo} alt="logo" className="min-h-8 min-w-48" />
          </Link>
        </div>

        <div className="flex gap-4">
          <div className="hidden xl:flex  gap-6 items-center">
            {navitems.map((item) => (
              <div
                key={item.index}
                className={`${
                  pathName === item.href
                    ? "text-primary-350"
                    : "text-secondary-500"
                } whitespace-nowrap hover:cursor-pointer hover:text-primary-350 text-sm flex font-normal`}
                onClick={() => {
                  if (!item.isOurService) {
                    router.push(`${item.href}`);
                  }
                  item.isOurService && setIsOpen(true);
                }}
              >
                {item.name}
                {item?.isDropDown && (
                  <ChevronDown className="text-primary-350" />
                )}
              </div>
            ))}
          </div>
         { !isLoggedIn?(<> <div className="flex gap-3">
            <button
              className="h-8 w-24 text-secondary-400 text-sm border-2
               border-primary-350 rounded-md mr-2 mt-2 sm:mt-0 hidden sm:block"
              onClick={handleLogin}
            >
              Log In
            </button>

            <button
              className="h-8 w-24 bg-primary-350 text-sm text-white rounded-md mt-2 sm:mt-0 hidden sm:block"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
            <Menu
              className="cursor-pointer xl:hidden flex justify-end items-center min-h-6 min-w-6 my-auto"
              onClick={toggleDrawerNav}
            />
          </div></>):(<>
            <button
              className="h-8 w-24 bg-primary-350 text-sm text-white rounded-md mt-2 sm:mt-0 hidden sm:block"
              onClick={handleLogout}
            >
              Log out
            </button>
          </>)}
        </div>
      </div>

      <Drawer
        open={isOpenNav}
        onClose={toggleDrawerNav}
        direction="right"
        className=" overflow-y-auto "
        overlayColor="rgba(0, 0, 0, 0.5)"
        style={{ height: "100vh", width: "300px", backgroundColor: "#f4f4f4" }}
      >
        <div className="text-secondary-350 flex justify-end pt-7 pr-10 cursor-pointer">
          <X onClick={toggleDrawerNav} />
        </div>
        <div className="flex flex-col ml-10 pb-4">
          {navitems.map((item) => (
            <div
              key={item.index}
              className={`${
                pathName === item.href
                  ? "text-primary-350"
                  : "text-secondary-500"
              } whitespace-nowrap hover:cursor-pointer hover:text-primary-350 text-sm font-normal py-2`}
              onClick={() => {
                if (item.isDropDown) {
                  toggleDrawerMenu();
                } else {
                  router.push(item.href);
                  toggleDrawerNav();
                }
              }}
            >
              <div className="flex font-medium">
                {item.name}

                {item?.isDropDown &&
                  (isOpenMenu ? (
                    <ChevronUp className="text-primary-350" />
                  ) : (
                    <ChevronDown className="text-primary-350" />
                  ))}
              </div>

              {item?.isDropDown && (
                <Collapse isOpened={isOpenMenu}>
                  {servicesItems?.map((serviceItem) => (
                    <div
                      key={serviceItem.index}
                      className={` py-2 px-5 hover:text-primary-350 hover:bg-white rounded-sm text-[12px]
                      ${
                        title === serviceItem.name
                          ? "bg-white text-primary-350"
                          : "text-secondary-450"
                      }
                      ${
                        serviceItem.name.length > 10
                          ? "whitespace-normal"
                          : "whitespace-nowrap"
                      }`}
                    >
                      <a
                        onClick={() => {
                          if (serviceItem.name === "Loan") {
                            router.push("/loan");
                            toggleDrawerNav();
                          } else {
                            router.push(
                              "/ourservices" +
                                "?" +
                                createQueryString("title", serviceItem?.name)
                            );
                            toggleDrawerNav();
                          }
                        }}
                      >
                        {serviceItem.name}
                      </a>
                    </div>
                  ))}
                </Collapse>
              )}
            </div>
          ))}
          <button
            className="h-8 w-32 text-secondary-400 border-2
           border-primary-350 rounded-md  my-4 sm:hidden"
            onClick={() => {
              handleLogin();
              toggleDrawerNav();
            }}
          >
            Log In
          </button>

          <button
            className="h-8 w-32 bg-primary-350 text-white rounded-md my-4 sm:hidden"
            onClick={() => {
              handleSignUp();
              toggleDrawerNav();
            }}
          >
            Sign Up
          </button>
        </div>
      </Drawer>

      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="top"
        className="bla bla bla mt-20"
        overlayColor="transparent"
      >
        <OurServices toggleDrawer={toggleDrawer} />
      </Drawer>

      {isSignUp && (
        <Drawer
          open={isSignUPOpen}
          onClose={toggleSignUPDrawer}
          direction="right"
          className="bla bla bla mx-auto overflow-y-scroll "
          style={{ height: "100vh", width: "100% ", maxWidth: "500px" }}
        >
          <div className="flex justify-end p-4  text-secondary-300">
            <X
              className="cursor-pointer "
              onClick={toggleSignUPDrawer}
              size={30}
            />
          </div>
          <div>
            <Signup />
          </div>
        </Drawer>
      )}
      {isLogin && (
        <Drawer
          open={isLoginOpen}
          onClose={toggleLoginDrawer}
          direction="right"
          className="bla bla bla mx-auto overflow-y-scroll "
          style={{ height: "100vh", width: "100% ", maxWidth: "500px" }}
        >
          <div className="flex justify-end p-4  text-secondary-300">
            <X
              className="cursor-pointer "
              onClick={toggleLoginDrawer}
              size={30}
            />
          </div>
          <div>
            <Loginform />
          </div>
        </Drawer>
      )}
    </div>
  );
};

const navitems = [
  { index: 1, name: "Home", desc: "", href: "/", isDropDown: false },
  { index: 2, name: "About Us", desc: "", href: "/aboutus", isDropDown: false },
  {
    index: 3,
    name: "Our Services",
    desc: "list",
    href: "/ourservices",
    isDropDown: true,
    isOurService: true,
  },

  {
    index: 5,
    name: "Deal Match",
    desc: "",
    href: "/dealcategory",
    isDropDown: false,
  },
  { index: 4, name: "Career", desc: "", href: "/career", isDropDown: false },
  { index: 6, name: "Blogs", desc: "", href: "/blogs", isDropDown: false },
  {
    index: 7,
    name: "Contact Us",
    desc: "",
    href: "/contactus",
    isDropDown: false,
  },
];

const servicesItems = [
  {
    index: 1,
    name: "Audit and Assurance",
    overview:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quisquam suscipit et qui nemo animi necessitatibus veritatis, ipsum deleniti, libero sed reiciendis repudiandae! Aut rem, quia minus maiores obcaecati quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, soluta! Necessitatibus tempora blanditiis at veritatis iste cum pariatur nemo impedit quo molestiae amet, aliquam beatae? Quo odio architecto assumenda laudantium!",
  },
  {
    index: 2,
    name: "Legal Services",
    overview:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quisquam suscipit et qui nemo animi necessitatibus veritatis, ipsum deleniti, libero sed reiciendis repudiandae! Aut rem, quia minus maiores obcaecati quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, soluta! Necessitatibus tempora blanditiis at veritatis iste cum pariatur nemo impedit quo molestiae amet, aliquam beatae? Quo odio architecto assumenda laudantium!",
  },
  {
    index: 3,
    name: "Human Resources",
    overview:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quisquam suscipit et qui nemo animi necessitatibus veritatis, ipsum deleniti, libero sed reiciendis repudiandae! Aut rem, quia minus maiores obcaecati quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, soluta! Necessitatibus tempora blanditiis at veritatis iste cum pariatur nemo impedit quo molestiae amet, aliquam beatae? Quo odio architecto assumenda laudantium!",
  },
  {
    index: 4,
    name: "Taxation and Other Regulatory Compliance",
    overview:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quisquam suscipit et qui nemo animi necessitatibus veritatis, ipsum deleniti, libero sed reiciendis repudiandae! Aut rem, quia minus maiores obcaecati quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, soluta! Necessitatibus tempora blanditiis at veritatis iste cum pariatur nemo impedit quo molestiae amet, aliquam beatae? Quo odio architecto assumenda laudantium!",
  },
  {
    index: 5,
    name: "Valuation and Business Modeling",
    overview:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quisquam suscipit et qui nemo animi necessitatibus veritatis, ipsum deleniti, libero sed reiciendis repudiandae! Aut rem, quia minus maiores obcaecati quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, soluta! Necessitatibus tempora blanditiis at veritatis iste cum pariatur nemo impedit quo molestiae amet, aliquam beatae? Quo odio architecto assumenda laudantium!",
  },
  {
    index: 6,
    name: "IFRS / NFRS Consulting",
    overview:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quisquam suscipit et qui nemo animi necessitatibus veritatis, ipsum deleniti, libero sed reiciendis repudiandae! Aut rem, quia minus maiores obcaecati quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, soluta! Necessitatibus tempora blanditiis at veritatis iste cum pariatur nemo impedit quo molestiae amet, aliquam beatae? Quo odio architecto assumenda laudantium!",
  },
  {
    index: 7,
    name: "System Setup and Enhancement",
    overview:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quisquam suscipit et qui nemo animi necessitatibus veritatis, ipsum deleniti, libero sed reiciendis repudiandae! Aut rem, quia minus maiores obcaecati quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, soluta! Necessitatibus tempora blanditiis at veritatis iste cum pariatur nemo impedit quo molestiae amet, aliquam beatae? Quo odio architecto assumenda laudantium!",
  },
  {
    index: 8,
    name: "Merge and Acquisition",
    overview:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quisquam suscipit et qui nemo animi necessitatibus veritatis, ipsum deleniti, libero sed reiciendis repudiandae! Aut rem, quia minus maiores obcaecati quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, soluta! Necessitatibus tempora blanditiis at veritatis iste cum pariatur nemo impedit quo molestiae amet, aliquam beatae? Quo odio architecto assumenda laudantium!",
  },
  {
    index: 9,
    name: "Risk and Investigations",
    overview:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quisquam suscipit et qui nemo animi necessitatibus veritatis, ipsum deleniti, libero sed reiciendis repudiandae! Aut rem, quia minus maiores obcaecati quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, soluta! Necessitatibus tempora blanditiis at veritatis iste cum pariatur nemo impedit quo molestiae amet, aliquam beatae? Quo odio architecto assumenda laudantium!",
  },
  {
    index: 10,
    name: "Foreign Business Consultancy",
    overview:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quisquam suscipit et qui nemo animi necessitatibus veritatis, ipsum deleniti, libero sed reiciendis repudiandae! Aut rem, quia minus maiores obcaecati quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, soluta! Necessitatibus tempora blanditiis at veritatis iste cum pariatur nemo impedit quo molestiae amet, aliquam beatae? Quo odio architecto assumenda laudantium!",
  },
  {
    index: 11,
    name: "Project Evaluation",
    overview:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quisquam suscipit et qui nemo animi necessitatibus veritatis, ipsum deleniti, libero sed reiciendis repudiandae! Aut rem, quia minus maiores obcaecati quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, soluta! Necessitatibus tempora blanditiis at veritatis iste cum pariatur nemo impedit quo molestiae amet, aliquam beatae? Quo odio architecto assumenda laudantium!",
  },
  {
    index: 12,
    name: "Loan",
    overview:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quisquam suscipit et qui nemo animi necessitatibus veritatis, ipsum deleniti, libero sed reiciendis repudiandae! Aut rem, quia minus maiores obcaecati quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, soluta! Necessitatibus tempora blanditiis at veritatis iste cum pariatur nemo impedit quo molestiae amet, aliquam beatae? Quo odio architecto assumenda laudantium!",
  },
];

export default Header;
