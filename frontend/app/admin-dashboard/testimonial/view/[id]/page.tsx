"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AxiosInstance } from "@/app/repositories/config";
import toast from "react-hot-toast";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
interface TestimonialData {
  name: string;
  description: string;
  image:string;
}

export default function Page() {
  const pathname = usePathname();
  const testimonialId = pathname.split("/")[4];
  console.log(testimonialId);

  const [testimonialData, setTestimonialData] = useState<TestimonialData>();
  
  
  useEffect(() => {
    const fetchTestimonialdata = async () => {
      try {
        const { data } = await AxiosInstance.get(`/testimonials/${testimonialId}`);
        console.log(data.data);
        setTestimonialData(data.data)
      } catch (error) {
        console.error(error);
      }
    };
    if (testimonialId) {
      fetchTestimonialdata();
    }
  }, [testimonialId]);

  return (
    <>
      {testimonialData && (
        <>
          <Link href="/admin-dashboard/testimonial/" className="px-5 py-2">
            <FontAwesomeIcon icon={faArrowLeft} color="blue"></FontAwesomeIcon>
          </Link>

          <div className="flex flex-row px-5">
          <div className="flex flex-col gap-[1rem] w-full items-center">
            <div className="flex flex-col gap-[0.5rem] w-full">
              <div className="font-bold text-gray-800">Name</div>
              <div className="px-3 py-1 border-2 border-gray-300 ">{testimonialData.name}</div>
            </div>
            <div className="flex flex-col gap-[0.5rem] w-full">
              <div className="font-bold text-gray-800">Description</div>
              <div className="px-3 py-1 border-2 border-gray-300 ">
                {testimonialData.description}
              </div>
          </div>
              <div className="flex flex-col gap-[0.5rem] w-full">
              <div className="font-bold">Content Image</div>
              <div className="px-3 py-1  ">
                <img width="100px" height="100px" src={testimonialData.image}></img>
              </div>
            </div>
            </div>
          </div>
        </>
      )}
      {
        !testimonialData && <div>No data found</div>
      }
    </>
  );
}
