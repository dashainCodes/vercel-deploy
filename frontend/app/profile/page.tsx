"use client";
import { BellRing, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import Image from "next/image";
import React, { Component, useEffect, useState } from "react";
import { ReactElement } from "react";
import profileimage from "../../public/profile.jpg";
import icon1 from "../../public/svgicons/profileicon1.svg";
import icon2 from "../../public/svgicons/profileicon2.svg";
import icon3 from "../../public/svgicons/profileicon3.svg";
import icon4 from "../../public/svgicons/profileicon4.svg";
import { Context } from "../../app/context/context";
import { useContext } from "react";
import { AxiosInstance } from "../repositories/config";
import UpdateProfile from "@/components/updateProfile";
import UpdatePassword from "@/components/updatePassword";

// export default function Page() {
//   const { isLoggedIn, user }: any = useContext(Context);
//   console.log(user);

//   return (
//     <div className="px-5 py-10">
//       <div className="flex justify-between items-center">
//         <div className=" flex gap-2 py-4 cursor-pointer w-fit">
//           <ChevronLeft className="text-primary-350" />
//           <p className="hover:text-primary-350 font-semibold">Profile</p>
//         </div>

//       </div>

//       <div className="flex justify-between items-center">
//         <div className="flex gap-2 items-center">
//           <div className="max-h-16 max-w-16 m-4">
//             <Image
//               src={profileimage}
//               alt="profile image"
//               className="rounded-full"
//             />
//           </div>
//           <div>
//             <p className="text-secondary-300">Welcome</p>
//             <p className="font-semibold">{user.fullName}</p>
//           </div>
//         </div>

//       </div>
//       <div>
//         {profileitems.map((item) => (
//           <div key={item.index}>
//             <div className="flex justify-between py-3 font-semibold">
//               <div className="flex gap-2">
//                 <Image src={item.icon} alt={item.title} />
//                 <p>{item.title}</p>
//               </div>
//               <ChevronRight className="text-primary-350 cursor-pointer" />
//             </div>
//             <hr />
//           </div>
//         ))}
//       </div>
//       <div>
//   {
//     Object.keys(settings).map((key:string) => (
//       <div key={key}>
//     {key} {settings[key]}
//       </div>
//     ))
//   }
// </div>

//     </div>
//   );
// }

const profileitems = [
  {
    index: 1,
    title: "Profile",
    icon: icon1,
  },
  {
    index: 2,
    title: "Change Email",
    icon: icon2,
  },
  {
    index: 3,
    title: "Change Password",
    icon: icon3,
  },
  {
    index: 4,
    title: "Privacy Policy",
    icon: icon4,
  },
];

// Define the type of your settings object with the correct keys
type SettingsType = {
  [key: string]: ReactElement<any, any>; // Define an index signature to accept any string keys
};

// Assuming your settings object is defined somewhere
const settings: SettingsType = {
  "Update Profile": <UpdateProfile />,
  "Update Password": <UpdatePassword />,
  // Other settings...
};

import { ChevronDown, ChevronUp } from "lucide-react"; // Import ChevronDown and ChevronUp icons

export default function Page() {
  const { isLoggedIn, user }: any = useContext(Context);
  console.log(user);

  // State to manage the visibility of each setting
  const [isSettingVisible, setIsSettingVisible] = useState<boolean[]>(
    Array(Object.keys(settings).length).fill(false)
  );

  // Function to toggle the visibility of a setting
  const toggleSettingVisibility = (index: number) => {
    setIsSettingVisible((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="px-5 py-10">
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="max-h-16 max-w-16 m-4">
              <Image
                src={profileimage}
                alt="profile image"
                className="rounded-full"
              />
            </div>
            <div>
              <p className="text-secondary-300">Welcome</p>
              <p className="font-semibold">{user?.fullName}</p>
            </div>
          </div>
        </div>
        <div></div>
      </div>

      {/* Profile items */}
      <div>
        {Object.keys(settings).map((title, index) => (
          <div key={index}>
            {/* Profile item header */}
            <div
              className="flex justify-between py-3 font-semibold"
              onClick={() => toggleSettingVisibility(index)}
            >
              <div className="flex gap-2">
                {/* Render ChevronDown or ChevronUp based on setting visibility */}
                {isSettingVisible[index] ? (
                  <ChevronUp className="text-primary-350 cursor-pointer" />
                ) : (
                  <ChevronDown className="text-primary-350 cursor-pointer" />
                )}
                <p>{title}</p>
              </div>
            </div>
            {/* Render setting content if visible */}
            {isSettingVisible[index] && (
              <div>
                {/* Render the corresponding setting component */}
                {settings[title]}
              </div>
            )}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
