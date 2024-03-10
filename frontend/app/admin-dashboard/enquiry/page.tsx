"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AxiosInstance } from "@/app/repositories/config";
import toast from "react-hot-toast";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Inbox from "./inbox";
import Outbox from "./outbox";


export default function Page() {
  const router = useRouter();
  const [activeComponent, setActiveComponent] = useState("inbox");

  const inboxClick = () => {
    setActiveComponent("inbox");
  };

  const outboxClick = () => {
    setActiveComponent("outbox");
  };

  return (
    <>
      <div className="flex flex-col gap-[1rem] w-full ">
        <div className="flex flex-row w-full">
          <button className={`px-3 py-2 rounded ${activeComponent=="inbox" && "bg-blue-600 text-white"}`} onClick={inboxClick}>Inbox</button>
          <button className={`px-3 py-2 rounded ${activeComponent=="outbox" && "bg-blue-600 text-white"}`} onClick={outboxClick}>History</button>
        </div>
        {activeComponent === "inbox" ? <Inbox /> : <Outbox/>}
      </div>
    </>
  );
}
