import { Share2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import share1 from "../public/svgicons/share1.svg";
import share2 from "../public/svgicons/share2.svg";
import share3 from "../public/svgicons/share3.svg";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

export default function Shareoption() {
  const shareUrl = window.location.href;

  const title = "Blogs";
  return (
    <div className="flex gap-10 justify-center items-center">
      <div className="flex gap-1 text-secondary-300">
        <Share2 />
        <p>Share on:</p>
      </div>
      <div className="flex gap-2">
        <FacebookShareButton url={shareUrl} title={title}>
          <Image src={share1} alt="share icon" className="cursor-pointer" />
        </FacebookShareButton>
        <WhatsappShareButton url={shareUrl} title={title}>
          <Image src={share2} alt="share icon" className="cursor-pointer" />
        </WhatsappShareButton>
        <TwitterShareButton url={shareUrl} title={title}>
          <Image src={share3} alt="share icon" className="cursor-pointer" />
        </TwitterShareButton>
      </div>
    </div>
  );
}
