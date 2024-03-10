import Image from "next/image";
import React from "react";
import auditimage from ".././public/auditimage.svg";
import { useState,useEffect } from "react";
import { AxiosInstance } from "@/app/repositories/config";

interface ServicesOverviewProps {
  serviceId: string;
}
interface ServiceData {
  heading: string;
  descriptionLong: string;
  expertises: string[];
  bgImage: string;
  normalImage: string;
}

const Servicesoverview: React.FC<ServicesOverviewProps> = ({ serviceId })=> {

  
  const [serviceData, setServiceData] = useState<ServiceData>();
const [loading,setLoading]=useState(false)
 
  useEffect(() => {
    const fetchServicedata = async () => {
      try {
        setLoading(true)
        const { data } = await AxiosInstance.get(`/services/${serviceId}`);
        console.log(data.data);
        setServiceData(data.data);
      } catch (error) {
        console.error(error);
      }
      finally{
        setLoading(false)
      }
    };
    if (serviceId) {
      fetchServicedata();
    }
  }, [serviceId]);
  return (
   <>
   {
    !loading && (<>
     {serviceData? (<>
      <div className="flex flex-col lg:flex-row my-10 gap-10 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="lg:w-3/5">
        <p className="pb-8 text-3xl font-bold">Overview</p>
        <p className="text-secondary-450 font-normal mb-4">
         {
          serviceData.descriptionLong
         }
        </p>
      </div>
      <div className="lg:w-2/5">
        <Image src={serviceData.normalImage} alt="contentimage" width={200} height={200}/>
      </div>
    </div>
     </>):(<>No data found</>)}
    </>)
   }
  
   </>
  );
}

export default Servicesoverview