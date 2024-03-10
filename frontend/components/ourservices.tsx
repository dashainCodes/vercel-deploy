"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState ,useEffect} from "react";
import { AxiosInstance } from "@/app/repositories/config";
import toast from 'react-toastify'
import Link from "next/link";

interface OurServicesProps {
  toggleDrawer: () => void;
}

const OurServices: React.FC<OurServicesProps> = ({ toggleDrawer }) => {
  const router = useRouter();
  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  let [serviceData,setServiceData]=useState([{
    heading: "",
    descriptionLong:"",
    expertises:[],
    bgImage:"",
    normalImage:"",
    serviceId:""
  },])

  const [loading, setLoading] = useState(false);
  const [refresh,setRefresh]=useState(0);
  //load faq data
  const loadServiceData = async () => {
    try {
      const { data } = await AxiosInstance.get("/services");
      console.log(data);
      setRefresh(0);
      setServiceData(data.data);
    } catch (error: any) {
      // toast.error(error.message);
      console.log(error.message)
    }
  };
  useEffect(() => {
    loadServiceData();
  }, [refresh]);

  useEffect(() => {
    setLoading(false);
  }, [serviceData]);

  return (
    <div
      className="bg-secondary-50 text-secondary-400 grid grid-cols-1 xl:grid-cols-3 gap-4 p-5 xl:pl-20 
    text-sm font-normal
    xl:py-20"
    >
      <div>
        {serviceData.slice(0, 5).map((item,index) => (
          <p key={index}>
            <Link
              onClick={() => {
                // router.push(
                //   "/ourservices" + "?" + createQueryString("title", item.heading)
                // );
                // router.push(`ourservices/${item.serviceId}`)
                toggleDrawer();
              }}
              href={`/ourservices/${item.serviceId}`}
              className="cursor-pointer leading-10  hover:text-primary-350"
            >
              {item.heading}
            </Link>
          </p>
        ))}
      </div>
      <div>
        {serviceData.slice(5, 10).map((item,index) => (
          <p key={index}>
            <Link
              onClick={() => {
                // router.push(
                //   "/ourservices" + "?" + createQueryString("title", item.heading)
                // );
                // router.push(`ourservices/${item.serviceId}`)
                toggleDrawer();
              }}
              href={`/ourservices/${item.serviceId}`}
              className="cursor-pointer leading-10  hover:text-primary-350"
            >
              {item.heading}
            </Link>
          </p>
        ))}
      </div>
      <div>
        {serviceData.slice(10, 15).map((item,index) => (
          <div key={index}>
            <Link
              onClick={() => {
                // router.push(
                //   "/ourservices" + "?" + createQueryString("title", item.heading)
                // );
               
                toggleDrawer();
              }}
              href={`/ourservices/${item.serviceId}`}
              className="cursor-pointer leading-10 hover:text-primary-350"
            >
              {item.heading}
            </Link>
          </div>
        ))}
        {/* <p
          className="cursor-pointer  hover:text-primary-350"
          onClick={() => {
            router.push("/loan");
            toggleDrawer();
          }}
        >
          Loan
        </p> */}
      </div>
    </div>
  );
};

// let serviceData = [
//   {
//     index: 1,
//     name: "Audit and Assurance",
//     overview:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quisquam suscipit et qui nemo animi necessitatibus veritatis, ipsum deleniti, libero sed reiciendis repudiandae! Aut rem, quia minus maiores obcaecati quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, soluta! Necessitatibus tempora blanditiis at veritatis iste cum pariatur nemo impedit quo molestiae amet, aliquam beatae? Quo odio architecto assumenda laudantium!",
//   },
//   {
//     index: 2,
//     name: "Legal Services",
//     overview:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quisquam suscipit et qui nemo animi necessitatibus veritatis, ipsum deleniti, libero sed reiciendis repudiandae! Aut rem, quia minus maiores obcaecati quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, soluta! Necessitatibus tempora blanditiis at veritatis iste cum pariatur nemo impedit quo molestiae amet, aliquam beatae? Quo odio architecto assumenda laudantium!",
//   },
//   {
//     index: 3,
//     name: "Human Resources",
//     overview:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quisquam suscipit et qui nemo animi necessitatibus veritatis, ipsum deleniti, libero sed reiciendis repudiandae! Aut rem, quia minus maiores obcaecati quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, soluta! Necessitatibus tempora blanditiis at veritatis iste cum pariatur nemo impedit quo molestiae amet, aliquam beatae? Quo odio architecto assumenda laudantium!",
//   },
//   {
//     index: 4,
//     name: "Taxation and Other Regulatory Compliance",
//     overview:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quisquam suscipit et qui nemo animi necessitatibus veritatis, ipsum deleniti, libero sed reiciendis repudiandae! Aut rem, quia minus maiores obcaecati quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, soluta! Necessitatibus tempora blanditiis at veritatis iste cum pariatur nemo impedit quo molestiae amet, aliquam beatae? Quo odio architecto assumenda laudantium!",
//   },
//   {
//     index: 5,
//     name: "Valuation and Business Modeling",
//     overview:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quisquam suscipit et qui nemo animi necessitatibus veritatis, ipsum deleniti, libero sed reiciendis repudiandae! Aut rem, quia minus maiores obcaecati quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, soluta! Necessitatibus tempora blanditiis at veritatis iste cum pariatur nemo impedit quo molestiae amet, aliquam beatae? Quo odio architecto assumenda laudantium!",
//   },
//   {
//     index: 6,
//     name: "IFRS / NFRS Consulting",
//     overview:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quisquam suscipit et qui nemo animi necessitatibus veritatis, ipsum deleniti, libero sed reiciendis repudiandae! Aut rem, quia minus maiores obcaecati quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, soluta! Necessitatibus tempora blanditiis at veritatis iste cum pariatur nemo impedit quo molestiae amet, aliquam beatae? Quo odio architecto assumenda laudantium!",
//   },
//   {
//     index: 7,
//     name: "System Setup and Enhancement",
//     overview:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quisquam suscipit et qui nemo animi necessitatibus veritatis, ipsum deleniti, libero sed reiciendis repudiandae! Aut rem, quia minus maiores obcaecati quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, soluta! Necessitatibus tempora blanditiis at veritatis iste cum pariatur nemo impedit quo molestiae amet, aliquam beatae? Quo odio architecto assumenda laudantium!",
//   },
//   {
//     index: 8,
//     name: "Merge and Acquisition",
//     overview:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quisquam suscipit et qui nemo animi necessitatibus veritatis, ipsum deleniti, libero sed reiciendis repudiandae! Aut rem, quia minus maiores obcaecati quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, soluta! Necessitatibus tempora blanditiis at veritatis iste cum pariatur nemo impedit quo molestiae amet, aliquam beatae? Quo odio architecto assumenda laudantium!",
//   },
//   {
//     index: 9,
//     name: "Risk and Investigations",
//     overview:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quisquam suscipit et qui nemo animi necessitatibus veritatis, ipsum deleniti, libero sed reiciendis repudiandae! Aut rem, quia minus maiores obcaecati quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, soluta! Necessitatibus tempora blanditiis at veritatis iste cum pariatur nemo impedit quo molestiae amet, aliquam beatae? Quo odio architecto assumenda laudantium!",
//   },
//   {
//     index: 10,
//     name: "Foreign Business Consultancy",
//     overview:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quisquam suscipit et qui nemo animi necessitatibus veritatis, ipsum deleniti, libero sed reiciendis repudiandae! Aut rem, quia minus maiores obcaecati quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, soluta! Necessitatibus tempora blanditiis at veritatis iste cum pariatur nemo impedit quo molestiae amet, aliquam beatae? Quo odio architecto assumenda laudantium!",
//   },
//   {
//     index: 11,
//     name: "Project Evaluation",
//     overview:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores quisquam suscipit et qui nemo animi necessitatibus veritatis, ipsum deleniti, libero sed reiciendis repudiandae! Aut rem, quia minus maiores obcaecati quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, soluta! Necessitatibus tempora blanditiis at veritatis iste cum pariatur nemo impedit quo molestiae amet, aliquam beatae? Quo odio architecto assumenda laudantium!",
//   },
// ];

export default OurServices;
