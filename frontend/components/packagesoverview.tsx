import Image from "next/image";
import React from "react";
import auditimage from ".././public/auditimage.svg";
import { useState,useEffect } from "react";
import { AxiosInstance } from "@/app/repositories/config";

interface PackagesOverviewProps {
  packageId: string;
}
interface PackageData {
  heading: string;
  descriptionLong: string;
  expertises: string[];
  bgImage: string;
  normalImage: string;
}

const Packagesoverview: React.FC<PackagesOverviewProps> = ({ packageId })=> {

  
  const [packageData, setPackageData] = useState<PackageData>();
const [loading,setLoading]=useState(false)
 
  useEffect(() => {
    const fetchPackagedata = async () => {
      try {
        setLoading(true)
        const { data } = await AxiosInstance.get(`/packages/${packageId}`);
        console.log(data.data);
        setPackageData(data.data);
      } catch (error) {
        console.error(error);
      }
      finally{
        setLoading(false)
      }
    };
    if (packageId) {
      fetchPackagedata();
    }
  }, [packageId]);
  return (
   <>
   {
    !loading && (<>
     {packageData? (<>
      <div className="flex flex-col lg:flex-row my-10 gap-10 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="lg:w-3/5">
        <p className="pb-8 text-3xl font-bold">Overview</p>
        <p className="text-secondary-450 font-normal mb-4">
         {
          packageData.descriptionLong
         }
        </p>
      </div>
      <div className="lg:w-2/5">
        <Image src={packageData.normalImage} alt="contentimage" width={200} height={200}/>
      </div>
    </div>
     </>):(<>No data found</>)}
    </>)
   }
  
   </>
  );
}

export default Packagesoverview