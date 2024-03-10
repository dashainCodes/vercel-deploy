"use client";
import { AlarmClock, Locate, PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import image1 from "../public/hiringdetailsimage.svg";
import { AxiosInstance } from "@/app/repositories/config";
import { useForm } from "react-hook-form";
import { all } from "axios";
const notify = () =>
  toast.success("Application submitted successfully. Thank you for applying!");

interface OurApplyProps {
  jobId: string;
}
const ApplyModalContent: React.FC<OurApplyProps> = (props) => {
  const {register,watch,handleSubmit}=useForm()
  const allInputField=watch();
  const { jobId } = props;
  const onSubmit=async(e:any)=>{
    e.preventDefault()
try {
  console.log(allInputField)
  const formData=new FormData();
  console.log(allInputField.document)
  formData.append('name',allInputField.name)
  formData.append('phoneNo',allInputField.phoneNo)
  formData.append('email',allInputField.email)
  formData.append('address',allInputField.address)
  formData.append('coverLetter',allInputField.coverLetter[0])
 
  const selectedFiles:any = Array.from(allInputField.document);
  selectedFiles.forEach((element:any,index:any) => {
    formData.append(`document`,element)
  });
 

  console.log(selectedFiles)
  formData.append('job',jobId)
  console.log(formData);
  const {data}=await AxiosInstance.post('/applications',formData)
  console.log(data)
  toast.success(data.data.msg)
} catch (error:any) {
  toast.error(error.message)
}
  }
  return (
    <div>
      <div>
        <p className="text-2xl font-semibold flex justify-center items-center text-secondary-400">
          Apply Now!
        </p>
       <form onSubmit={onSubmit}>
       <div className="px-10">
          <div className=" xl:flex justify-between gap-8">
            <div className="w-full my-2">
              <div className="text-secondary-400">Name</div>
              <input
                type="text"
                className="border-2 w-full h-12  rounded-md pl-5"
                placeholder="Name"
                {...register("name",{required:true})}
              />
            </div>
            <div className="w-full my-2">
              <div className="text-secondary-400">Email</div>
              <input
                type="text"
                className="border-2 w-full  h-12 rounded-md pl-5"
                placeholder="Email"
                {...register("email",{required:true})}
              />
            </div>
          </div>
          <div className=" xl:flex justify-between gap-8">
            <div className="w-full my-2">
              <div className="text-secondary-400">Phone no</div>
              <input
                type="text"
                className="border-2 w-full  h-12  rounded-md pl-5"
                placeholder="Phone "
                {...register("phoneNo",{required:true})}
              />
            </div>
            <div className="w-full my-4">
              <div className="text-secondary-400">Address</div>
              <input
                type="text"
                className="border-2 w-full  h-12 rounded-md pl-5"
                placeholder="Address"
                {...register("address",{required:true})}
              />
            </div>
          </div>
          <div>
            <div className="text-secondary-400">Choose your files</div>
            <div className="text-secondary-400 ">
              <label
                htmlFor="fileInput"
                className="cursor-pointer flex gap-2 py-3 w-fit"
              >
                <PlusCircle />
                Attach your file here
              </label>
              <input type="file" id="fileInput" className="hidden"  {...register("document",{required:true})} multiple/>
            </div>
          </div>
          <div>
            <div className="text-secondary-400 ">Cover letter</div>
            <div className="text-secondary-400 ">
              <label
                htmlFor="fileInputs"
                className="cursor-pointer flex gap-2 py-3 w-fit"
              >
                <PlusCircle />
                Attach your cover letter here
              </label>
              <input type="file" id="fileInputs" className="hidden"  {...register("coverLetter",{required:true})}/>
            </div>
          </div>
          <button type="submit"
            className="h-12 w-28 mb-2 bg-primary-350 text-white rounded-md"
            
          >
            Submit
          </button>
          <Toaster />
          <p className="text-sm text-primary-350">
            *please wait patiently for reply after application submittion.
          </p>
        </div>
       </form>
      </div>
    </div>
  );
};

interface OurDetailsProps {
  item: {
    position: string;
    qualification: string[];
    salary: string;
    jobDuties: string[];
    contentImage: string;
  };
}
const DetailsModalContent: React.FC<OurDetailsProps> = (props) => {
  const { item } = props;
  return (
    <div>
      {/* <div className="mb-4 flex flex-col items-center justify-center">
        <Image src={item.contentImage} width={50} height={50} alt="img" />
      </div> */}
      <div className="flex flex-col justify-start text-left">
        <div className="mb-2">
          <p className="font-bold">Job:</p>
          <p>{item.position}</p>
        </div>
        <div className="mb-2">
          <p className="font-bold">Job duties:</p>
          <div className="flex flex-col">
            {item.jobDuties.length > 0 && (
              <ul>
                {item.jobDuties.map((item2, index) => (
                  <li key={index}>{item2}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="mb-2">
          <p className="font-bold">Qualifications:</p>
          <div className="flex flex-col">
            {item.qualification && item.qualification.length > 0 && (
              <ul>
                {item.qualification.map((q, index) => (
                  <li key={index}>{q}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div>
          <p className="font-bold">Salary:</p>
          <p>{item.salary}</p>
        </div>
      </div>
    </div>
  );
};

export default function Hiringcard() {
  const [open, setOpen] = useState(false);
  const [openApplyModal, setOpenApplyModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setOpenApplyModal(false);
    setOpenDetailsModal(false);
  };

  const toggleModal = (modalType: "apply" | "details") => {
    onOpenModal();
    if (modalType === "apply") {
      setOpenApplyModal(true);
    } else if (modalType === "details") {
      setOpenDetailsModal(true);
    }
  };

  const [jobData, setJobData] = useState([
    {
      position: "",
      timing: "",
      jobType: "",
      jobId: "",
      qualification: [],
      jobDuties: [],
      salary: "",
      contentImage: "",
      _id: "",
    },
  ]);

  useEffect(() => {
    const jobFetch = async () => {
      try {
        const { data } = await AxiosInstance.get("/jobs");
        setJobData(data.data);
        console.log(data.data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    jobFetch();
  }, []);
  return (
    <div>
      <p className="text-2xl text-secondary-400 font-semibold my-10">
        We are Hiring
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
        {jobData.length > 0 &&
          jobData.map((item, index) => (
            <div
              key={index}
              className="bg-secondary-50 border border-primary-350 rounded-md p-5 xl:max-w-72
            transition-all duration-300 ease-in-out hover:shadow-lg "
            >
              <p className="text-2xl text-secondary-400 font-semibold">
                {item.position}
              </p>
              <div className="text-secondary-400 flex justify-between pt-3 pb-5">
                <div className="flex gap-2">
                  <Locate className="text-primary-350" />
                  <p>{item.jobType}</p>
                </div>
                <div className="flex gap-2">
                  <AlarmClock className="text-primary-350" />
                  <p>{item.timing}</p>
                </div>
              </div>
              <div className="flex justify-between text-primary-350">
                <p
                  onClick={() => toggleModal("apply")}
                  className="cursor-pointer"
                >
                  Apply Now
                </p>
                <p
                  onClick={() => toggleModal("details")}
                  className="cursor-pointer"
                >
                  View details
                </p>
              </div>
              {openApplyModal && (
                <Modal
                  open={open}
                  onClose={onCloseModal}
                  center
                  styles={{
                    modal: {
                      width: "100%",
                      margin: "0px",
                      borderRadius: "8px",
                    },
                  }}
                >
                  <div>
                    <ApplyModalContent jobId={item._id} />
                  </div>
                </Modal>
              )}
              {openDetailsModal && (
                <Modal
                  open={open}
                  onClose={onCloseModal}
                  center
                  styles={{
                    modal: {
                      width: "100%",
                      margin: "0px",
                      borderRadius: "8px",
                    },
                  }}
                >
                  <div className="p-10 h-fit">
                    {/* Pass the item data to the DetailsModalContent component */}
                    <DetailsModalContent item={item} />
                  </div>
                </Modal>
              )}
            </div>
          ))}
      </div>
      {/* here was it before */}
    </div>
  );
}

const hiringitems = [
  {
    index: 1,
    position: "Managing Director",
  },
  {
    index: 2,
    position: "Managing Director",
  },
  {
    index: 3,
    position: "Managing Director",
  },
];
