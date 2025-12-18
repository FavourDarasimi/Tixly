"use client";

import Image from "next/image";
import Button from "../Button";
import icon from "@/public/images/tixly-icon.png";
import Link from "next/link";

const Navbar = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <nav className="p-5 flex justify-between items-center fixed w-full top-0 bg-white z-50 shadow-md">
      <div
        onClick={scrollToTop}
        className="flex gap-1 items-center cursor-pointer"
      >
        <Image src={icon} alt="" width={40} height={40} className="" />
        <h1 className="text-[28px] font-semibold ">Tixly</h1>
      </div>
      <ul className="flex gap-10 text-[#3a3a3a] text-lg">
        <li className="hover:text-black cursor-pointer transition duration-300">
          Browse Events
        </li>

        <li
          onClick={() => scrollToSection("how-it-works")}
          className="hover:text-black cursor-pointer transition duration-300"
        >
          How it Works
        </li>

        <li
          onClick={() => scrollToSection("features")}
          className="hover:text-black cursor-pointer transition duration-300"
        >
          Features
        </li>
        <li
          onClick={() => scrollToSection("faqs")}
          className="hover:text-black cursor-pointer transition duration-300"
        >
          FAQs
        </li>
      </ul>
      <Link href="/login">
        <Button type="primary" size="medium" className="rounded-lg">
          Log in
        </Button>
      </Link>
    </nav>
  );
};

export default Navbar;
