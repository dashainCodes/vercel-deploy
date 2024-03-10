import React from "react";
import { Copyright } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from ".././public/footerlogo.png";
import ".././app/globals.css";
import Link from "next/link";
import socialicon1 from ".././public/svgicons/footericon1.svg";
import socialicon2 from ".././public/svgicons/footericon2.svg";
import socialicon3 from ".././public/svgicons/footericon3.svg";
import socialicon4 from ".././public/svgicons/footericon4.svg";

function Footer() {
  const router = useRouter();

  const currentYear = new Date().getFullYear();
  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0 hidden xl:block"
        style={{
          backgroundImage: "url(/svgicons/footerbg.gif)",
          backgroundSize: "cover",
          zIndex: -1,
        }}
      ></div>
      <div
        className="absolute inset-0 bg-opacity-75 bg-primary-400"
        style={{ zIndex: -1 }}
      ></div>
      <div className="relative text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div data-aos="fade-right ">
          <div className="pt-10 sm:pt-16 pb-5 sm:pb-10 ">
            <Image src={logo} alt="logo" />
          </div>
          <div>
            Expert Business provides expert guidance and representation to
            individuals and organizatioins navigating the complexities of legal
            matters.
          </div>
          <div className="mt-6 mb-10 sm:my-10">
            <p>01-4425368 +977 9851051666</p>
            <p>info@expertbusiness.com.np</p>
          </div>
        </div>

        <div className="flex flex-col lg:items-center mb-10">
          <div data-aos="fade-right ">
            <div className="sm:pt-16 sm:pb-8 text-2xl w-fit">Deal Match</div>
            <div>
              {footeritems.slice(0, 5).map((item) => (
                <div
                  key={item.index}
                  className="cursor-pointer flex flex-col leading-10 hover:text-black"
                  onClick={() => {
                    router.push("/dealmatch");
                  }}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:items-center col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2">
          <div data-aos="fade-left">
            <div className="lg:pt-16 sm:pb-8 text-2xl w-fit">Our Services</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              {footeritems.slice(7, 20).map((item) => (
                <div key={item.index} className="cursor-pointer leading-10 ">
                  <a
                    onClick={() => {
                      router.push(
                        "/ourservices" +
                          "?" +
                          createQueryString("title", item.name)
                      );
                    }}
                    className="cursor-pointer leading-10 hover:text-black"
                  >
                    {item.name}
                  </a>
                </div>
              ))}
              <p
                className="cursor-pointer leading-10 hover:text-black"
                onClick={() => {
                  router.push("/loan");
                }}
              >
                Loan
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-6 mx-20" />
      <div className="sm:flex justify-between pb-5 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="text-white flex gap-1 relative py-4 sm:py-0">
          <Copyright className="min-h-4 min-w-4" />
          <div>
            All Right Reserved {currentYear} | Expert Business Pvt. Ltd |
            <Link
              href="https://webxnep.com/"
              target="_blank"
              className="cursor-pointer hover:font-semibold pl-1"
            >
              Designed by WebX
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center my-auto gap-3">
          <Link
            href="https://www.youtube.com/"
            target="_blank"
            className="cursor-pointer"
          >
            <Image
              src={socialicon1}
              alt="social icon"
              className="min-h-6 min-w-6 sm:min-w-8 sm:min-h-8"
            />
          </Link>
          <Link
            href="https://www.facebook.com/"
            target="_blank"
            className="cursor-pointer"
          >
            <Image
              src={socialicon2}
              alt="social icon"
              className="min-h-6 min-w-6 sm:min-w-8 sm:min-h-8"
            />
          </Link>
          <Link
            href="https://www.whatsapp.com/"
            target="_blank"
            className="cursor-pointer"
          >
            <Image
              src={socialicon3}
              alt="social icon"
              className="min-h-6 min-w-6 sm:min-w-8 sm:min-h-8"
            />
          </Link>
          <Link
            href="https://twitter.com/"
            target="_blank"
            className="cursor-pointer"
          >
            <Image
              src={socialicon4}
              alt="social icon"
              className="min-h-6 min-w-6 sm:min-w-8 sm:min-h-8"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;

const footeritems = [
  { index: 2, href: "/aboutus", name: "Business for Sale" },
  { index: 3, href: "/aboutus", name: "Existing Business" },
  { index: 4, href: "/dealcategory", name: "Franchise" },
  { index: 5, href: "/contactus", name: "Collaboration" },
  { index: 6, href: "/contactus", name: "Seeking Seller" },
  { index: 7, name: "Audit and Assurance" },
  { index: 8, name: "Legal Services" },
  { index: 9, name: "Human Resources" },
  { index: 10, name: "Taxation" },
  { index: 16, name: "Foreign Business Consultancy" },
  { index: 11, name: "Valuation and Business Modeling" },
  { index: 12, name: "IFRS / NFRS Consulting" },
  { index: 13, name: "System Setup and Enhancement" },
  { index: 14, name: "Merge and Acquisition" },
  { index: 15, name: "Risk and Investigations" },
  { index: 17, name: "Taxation and Other Regulatory Compliance" },
  { index: 18, name: "Project Evaluation" },
];
