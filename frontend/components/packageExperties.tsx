import { Sparkle } from "lucide-react";
import React, { useContext } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
// import Inquiryform from "./inquiryform";
import { Context } from "../app/context/context";
import { useState,useEffect } from "react";
import { AxiosInstance } from "@/app/repositories/config";
import toast from "react-hot-toast";
import ServiceEnquiry from "./service_inquiryform";
import PackageEnquiry from "./packagesInquiry";
interface OurexpertiesProps {
  packageId: string;
}
const PackageExperties: React.FC<OurexpertiesProps> = ({ packageId })=> {
  const { openForm, setOpenForm, isOpenInquery, setIsOpenInquery }: any =
    useContext(Context);

  const toggleDrawer = () => {
    setOpenForm(true);
    setIsOpenInquery(true);
  };
  const onCloseModal = () => {
    setOpenForm(false);
    setIsOpenInquery(false);
  };

  const [refresh,setRefresh]=useState(false)
  interface PackageData {
    heading: string;
    descriptionLong: string;
    expertises: string[]; // Assuming expertises is an array of strings
    bgImage: string;
    normalImage: string;
    packageId: string;
    _id:string;
  }
  const [packageData, setPackageData] = useState<PackageData>();
  
  
  const [loading, setLoading] = useState(false);
  
 
  useEffect(() => {
    const loadPackageData = async () => {
      try {
        setLoading(true)
        const { data } = await AxiosInstance.get(`/packages/${packageId}`);
        console.log(data);
        setRefresh(false);
        setPackageData(data.data);
        console.log(packageData)
        setLoading(false)
      } catch (error: any) {
        toast.error(error.message);
        setLoading(false)
      }
    };
    loadPackageData();
    
  }, [refresh,packageId]);



  return (
    <>
    {
      loading?(<>Loading</>):(<>
      {
        packageData && <div className="bg-secondary-50 mb-10">
        <div className=" flex justify-center items-center">
          <div className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10">
            <p className="text-3xl font-bold">Our Experties</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {packageData?.expertises?.map((item,index) => (
                <div
                  key={index}
                  className="flex gap-3 py-6 items-center "
                >
                  <div>
                    <Sparkle size={40} className="text-primary-250" />
                  </div>
                  <p className="font-semibold">{item}</p>
                </div>
              ))}
            </div>
            <button
              className="h-8 w-28 my-2 bg-primary-350 text-white rounded-md"
              onClick={toggleDrawer}
            >
              Enquiry
            </button>
          </div>
        </div>
        {isOpenInquery && (
          <Modal
            open={openForm}
            onClose={onCloseModal}
            center
            styles={{ modal: { height: "100vh", width: "100%", margin: "0px" } }}
          >
            <div className=" h-fit">
              <PackageEnquiry  packageId={packageData._id}/>
            </div>
          </Modal>
        )}
      </div>
      }
      </>)
    }
    </>
  );
}

const serviceitems = [
  {
    index: 1,
    name: "Internal Audit",
  },
  {
    index: 2,
    name: "Statutory/ External Audit",
  },
  {
    index: 3,
    name: "Forensic Audit and Investigation",
  },
  { index: 4, name: "System Audit" },
  {
    index: 5,
    name: "Income Tax and Value Added Tax Audit",
  },
  {
    index: 6,
    name: "Rist Assessments",
  },
];

export default PackageExperties;