import Image from "next/image";
import React from "react";
import missionimage from "../public/ourmission.svg";

export default function Ourmission() {
  return (
    <div>
      <p className="text-2xl font-semibold text-secondary-400 my-5 sm:my-10">Employee Responsibilities</p>
      <div className="grid grid-cols-1 flex-col-reverse md:grid-cols-2 gap-10 ">
        <div>
          Marketing manager Life is a complex tapestry woven with unpredictable
          threads, where serendipity often dances hand in. Marketing manager
          Life is a complex tapestry woven with unpredictable threads, where
          serendipity often dances hand in. Marketing manager Life is a complex
          tapestry woven with unpredictable threads, where serendipity often
          dances hand in. Marketing manager Life is a complex tapestry woven
          with unpredictable threads, where serendipity often dances hand in.
          Marketing manager Life is a complex tapestry woven with unpredictable
          threads, where serendipity often dances hand in. Marketing manager
          Life is a complex tapestry woven with unpredictable threads, where
          serendipity often dances hand in.
        </div>
        <div>
          <Image src={missionimage} alt="mission and goal" className="w-full" />
        </div>
      </div>
    </div>
  );
}
