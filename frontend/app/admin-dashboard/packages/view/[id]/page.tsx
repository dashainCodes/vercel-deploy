"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AxiosInstance } from "@/app/repositories/config";
import toast from "react-hot-toast";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface PackageData {
  heading: string;
  descriptionLong: string;
  expertises: string[];
  bgImage: string;
  normalImage: string;
  name:string;
}

export default function Page() {
  const pathname = usePathname();
  const packageId = pathname.split("/")[4];
  console.log(packageId);

  const [packageData, setPackageData] = useState<PackageData>();

  
  useEffect(() => {
    const fetchPackagedata = async () => {
      try {
        const { data } = await AxiosInstance.get(`/packages/${packageId}`);
        console.log(data.data);
        setPackageData(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (packageId) {
      fetchPackagedata();
    }
  }, [packageId]);

  return (
    <>
      {packageData && (
        <>
          <div className="flex flex-row justify-between">
            <Link href="/admin-dashboard/packages/" className="px-5 py-2">
              <FontAwesomeIcon icon={faArrowLeft} color="blue"></FontAwesomeIcon>
            </Link>
            
          </div>
          <div className="flex flex-col gap-[1rem] w-full items-center px-5">
          
            <div className="flex flex-col gap-[0.5rem] w-full">
              <div className="font-bold text-gray-800">Heading</div>
              <div className="px-3 py-1 border-2 border-gray-300 ">
                {packageData.heading}
              </div>
            </div>
            <div className="w-full flex flex-row justify-between">
              <div className="flex flex-col gap-[0.5rem] w-full">
                <div className="font-bold text-gray-800">Background Image</div>
                <div className="px-3 py-1 ">
                  <img
                    src={packageData.bgImage}
                    width="75px"
                    height="75px"
                  ></img>
                </div>
              </div>

              <div className="flex flex-col gap-[0.5rem] w-full">
                <div className="font-bold text-gray-800">Content Image</div>
                <div className="px-3 py-1  ">
                  <img
                    src={packageData.normalImage}
                    width="75px"
                    height="75px"
                  ></img>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[0.5rem] w-full">
              <div className="font-bold text-gray-800">Functionality</div>
              <div className="px-3 py-1 border-2 border-gray-300 ">
                {packageData.name}
              </div>
            </div>
            <div className="flex flex-col gap-[0.5rem] w-full">
              <div className="font-bold text-gray-800">Description</div>
              <div className="px-3 py-1 border-2 border-gray-300 ">
                {packageData.descriptionLong}
              </div>
            </div>
            <div className="flex flex-col gap-[0.5rem] w-full">
              <div className="font-bold text-gray-800">Expertises</div>
              <div className="px-3 py-1 border-2 border-gray-300 flex flex-col gap-[0.5rem] ">
                {packageData.expertises.map((item, idx) => (
                  <div key={idx}>{item}</div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {!packageData && <div>No data found</div>}
    </>
  );
}
