//view page of contact
"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AxiosInstance } from "@/app/repositories/config";
import toast from "react-hot-toast";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface ContactData{
    name:string;
    email:string;
    subject:string;
    message:string;
    contactId:string;
  }
  

export default function Page() {
  const pathname = usePathname();
  const contactId = pathname.split("/")[4];
  console.log(contactId);

  const [contactData, setContactData] = useState<ContactData>();

 
  useEffect(() => {
    const fetchContactdata = async () => {
      try {
        const { data } = await AxiosInstance.get(`/contacts/${contactId}`);
        console.log(data.data);
        setContactData(data.data);
      } catch (error) {
        console.error(error);
      }
    };
      fetchContactdata();
    
  }, [contactId]);

  return (
    <>
      {contactData && (
        <>
          <Link href="/admin-dashboard/Contacts/" className="px-5 py-2">
            <FontAwesomeIcon icon={faArrowLeft} color="blue"></FontAwesomeIcon>
          </Link>

          <div className="flex flex-col gap-[1rem] w-full items-center px-5">
            <div className="flex flex-col gap-[0.5rem] w-full">
              <div>name</div>
              <div className="px-3 py-1 border-2 border-gray-300 ">{contactData.name}</div>
            </div>
            <div className="flex flex-col gap-[0.5rem] w-full">
              <div>Email</div>
              <div className="px-3 py-1 border-2 border-gray-300 ">
                {contactData.email}
              </div>
            </div>
            <div className="flex flex-col gap-[0.5rem] w-full">
              <div>Subject</div>
              <div className="px-3 py-1 border-2 border-gray-300 ">
                {contactData.subject}
              </div>
            </div>
            <div className="flex flex-col gap-[0.5rem] w-full">
              <div>Subject</div>
              <div className="px-3 py-1 border-2 border-gray-300 ">
                {contactData.message}
              </div>
            </div>
          </div>
        </>
      )}
      {!contactData && <div>No data found</div>}
    </>
  );
}
