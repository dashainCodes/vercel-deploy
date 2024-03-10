"use client";
//edit page of each deal
import React from "react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AxiosInstance } from "@/app/repositories/config";
import toast from "react-hot-toast";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

interface DealData {
  companyName: string;
  companyLocation: string;
  companyMail: string;
  companyLogo: string;
  companyId: string;
  category: string;
  heading: string;
  description: string;
  contentImage: string;
  businessConcept: string;
  conceptOfBusiness: string[];
}

export default function Page() {
  const { register, handleSubmit, watch, reset } = useForm();
  const allInputField = watch();
  console.log(allInputField);

  const [setsubmitting, setSetsubmitting] = useState(false);

  const [cobInput, setCobInput] = useState("");
  const [cobInputs, setCobInputs] = useState<string[]>([]);
  const handleRemove = (element: string) => {
    let newArray = cobInputs.filter((i, idx) => {
      return i !== element;
    });
    setCobInputs(newArray);
  };

  const handleAdd = () => {
    if (cobInput.trim() !== "" && !cobInputs.includes(cobInput)) {
      setCobInputs([...cobInputs, cobInput]);
      setCobInput("");
    }
  };

  const pathname = usePathname();
  const categoryId = pathname.split("/")[4];
  console.log(categoryId);
  const dealId = pathname.split("/")[6];
  console.log(dealId);
  const [categoryData, setCategoryData] = useState<any>();
  const [refresh, setRefresh] = useState(0);
  const [dealData, setDealData] = useState<DealData>();


  useEffect(() => {
    const fetchCategorydata = async () => {
      try {
        const { data } = await AxiosInstance.get(
          `/categories-deal/${categoryId}`
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
    const fetchDealdata = async () => {
      try {
        const { data } = await AxiosInstance.get(`/deals/${dealId}`);
        console.log(data.data);
        setDealData(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDealdata();
  }, [dealId]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      
      setSetsubmitting(true);
      const formData = new FormData();

      formData.append("companyName", allInputField.companyName);
      formData.append("companyLogo", allInputField.companyLogo[0]);
      formData.append("companyMail", allInputField.companyMail);
      formData.append("companyLocation", allInputField.companyLocation);
      formData.append("category", categoryData?._id);
      formData.append("heading", allInputField.heading);
      formData.append("description", allInputField.description);
      formData.append("contentImage", allInputField.contentImage[0]);
      formData.append("businessConcept", allInputField.businessConcept);
      cobInputs.forEach((cob: string, index: number) => {
        formData.append(`conceptOfBusiness[${index}]`, cob);
      });
      console.log(allInputField);
      console.log(formData);
      let { data } =
        categoryData?._id && (await AxiosInstance.patch(`/deals/${dealId}`, formData));
      data && console.log(data.data);
      setDealData(data.data);
      reset();
      setSetsubmitting(false);
    } catch (error: any) {
      setSetsubmitting(false);
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Link
        href={`/admin-dashboard/categories/view/${categoryId}`}
        className="px-5 py-2"
      >
        <FontAwesomeIcon icon={faArrowLeft} color="blue"></FontAwesomeIcon>
      </Link>
      <form onSubmit={onSubmit}>
       {dealData && <div className="flex flex-col gap-[1rem] px-5 w-full items-center">
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Company Name</label>
            <input
              type="text"
              {...register("companyName")}
              defaultValue={dealData?.companyName}
              className="px-3 py-1 border-2 border-gray-600 "
            />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label> Logo</label>
            <img src={dealData?.companyLogo} width="50px" height="50px"></img>
            <input type="file" {...register("companyLogo")} />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Email Address</label>
            <input
              type="text"
              {...register("companyMail")}
              defaultValue={dealData?.companyMail}
              className="px-3 py-1 border-2 border-gray-600 "
            />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Company Location</label>
            <input
              type="text"
              {...register("companyLocation")}
              defaultValue={dealData?.companyLocation}
              className="px-3 py-1 border-2 border-gray-600 "
            />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Heading</label>
            <input
              type="text"
              {...register("heading")}
              defaultValue={dealData?.heading}
              className="px-3 py-1 border-2 border-gray-400"
            />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Description</label>
            <textarea
              {...register("description")}
              defaultValue={dealData?.description}
              className="px-3 py-1 border-2 border-gray-400"
            />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Content Image</label>
            <img src={dealData?.contentImage} width="50px" height="50px"></img>
            <input type="file" {...register("contentImage")} />
          </div>
        
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Business Concept</label>
            <textarea
              {...register("businessConcept")}
              defaultValue={dealData?.businessConcept}
              className="px-3 py-1 border-2 border-gray-400"
            />
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full">
            <label>Concepts of business</label>
            <div className="flex flex-row gap-[1rem]">
              <input
                type="text"
                placeholder="Add concept of business..."
                value={cobInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCobInput(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAdd();
                  }
                }}
              />
              <button
                type="button"
                className="bg-blue-500 text-white hover:bg-blue-600 px-2 py-1 rounded"
                onClick={handleAdd}
              >
                +
              </button>
            </div>
            <div className="flex flex-row gap-1">
              {
                cobInputs?.map((item:string, idx:number) => (
                  <div className="flex flex-row gap-[0.5rem]" key={idx}>
                    <div>{item}</div>
                    <button
                      type="button"
                      className="bg-blue-500 text-white cursor-pointer px-2 py-1 rounded"
                      onClick={() => handleRemove(item)}
                    >
                      -
                    </button>
                  </div>
                ))}
            </div>
            <div className="flex flex-row gap-1">
              {cobInputs.length > 0 &&
                cobInputs.map((item, idx) => (
                  <div className="flex flex-row gap-[0.5rem]" key={idx}>
                    <div>{item}</div>
                    <button
                      type="button"
                      className="bg-blue-500 text-white cursor-pointer px-2 py-1 rounded"
                      onClick={() => handleRemove(item)}
                    >
                      -
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <button
            disabled={setsubmitting}
            type="submit"
            className={`py-1 text-white rounded w-[10%] bg-blue-500 hover:bg-blue-600 ${
              setsubmitting && "bg-gray-400"
            }`}
          >
            {setsubmitting ? "Updating" : "Update"}
          </button>
        </div>}
      </form>
    </>
  );
}
