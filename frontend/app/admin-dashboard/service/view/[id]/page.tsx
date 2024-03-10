"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AxiosInstance } from "@/app/repositories/config";
import toast from "react-hot-toast";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface ServiceData {
  heading: string;
  descriptionLong: string;
  expertises: string[];
  bgImage: string;
  normalImage: string;
}

export default function Page() {
  const pathname = usePathname();
  const serviceId = pathname.split("/")[4];
  console.log(serviceId);

  const [serviceData, setServiceData] = useState<ServiceData>();

  
  useEffect(() => {
    const fetchServicedata = async () => {
      try {
        const { data } = await AxiosInstance.get(`/services/${serviceId}`);
        console.log(data.data);
        setServiceData(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (serviceId) {
      fetchServicedata();
    }
  }, [serviceId]);

  return (
    <>
      {serviceData && (
        <>
          <div className="flex flex-row justify-between">
            <Link href="/admin-dashboard/service/" className="px-5 py-2">
              <FontAwesomeIcon icon={faArrowLeft} color="blue"></FontAwesomeIcon>
            </Link>
            
          </div>
          <div className="flex flex-col gap-[1rem] w-full items-center px-5">
          
            <div className="flex flex-col gap-[0.5rem] w-full">
              <div className="font-bold text-gray-800">Heading</div>
              <div className="px-3 py-1 border-2 border-gray-300 ">
                {serviceData.heading}
              </div>
            </div>
            <div className="w-full flex flex-row justify-between">
              <div className="flex flex-col gap-[0.5rem] w-full">
                <div className="font-bold text-gray-800">Background Image</div>
                <div className="px-3 py-1 ">
                  <img
                    src={serviceData.bgImage}
                    width="75px"
                    height="75px"
                  ></img>
                </div>
              </div>

              <div className="flex flex-col gap-[0.5rem] w-full">
                <div className="font-bold text-gray-800">Content Image</div>
                <div className="px-3 py-1  ">
                  <img
                    src={serviceData.normalImage}
                    width="75px"
                    height="75px"
                  ></img>
                </div>
              </div>
            </div>
           
            <div className="flex flex-col gap-[0.5rem] w-full">
              <div className="font-bold text-gray-800">Description</div>
              <div className="px-3 py-1 border-2 border-gray-300 ">
                {serviceData.descriptionLong}
              </div>
            </div>
            <div className="flex flex-col gap-[0.5rem] w-full">
              <div className="font-bold text-gray-800">Expertises</div>
              <div className="px-3 py-1 border-2 border-gray-300 flex flex-col gap-[0.5rem] ">
                {serviceData.expertises.map((item, idx) => (
                  <div key={idx}>{item}</div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {!serviceData && <div>No data found</div>}
    </>
  );
}
