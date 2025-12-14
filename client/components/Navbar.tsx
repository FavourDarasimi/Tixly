"use client";

import Image from "next/image";
import Button from "./Button";
import icon from "@/public/images/tixly-icon.png";

const Navbar = () => {
  return (
    <nav className="p-5 flex justify-between items-center fixed w-full top-0 bg-white z-50 shadow-md">
      <div className="flex gap-1 items-center">
        <Image src={icon} alt="" width={40} height={40} className="" />
        <h1 className="text-3xl font-semibold ">Tixly</h1>
      </div>
      <ul className="flex gap-10 text-[#3a3a3a] text-lg">
        <li className="hover:text-black cursor-pointer transition duration-300">
          Browse Events
        </li>
        <li className="hover:text-black cursor-pointer transition duration-300">
          How it Works
        </li>
        <li className="hover:text-black cursor-pointer transition duration-300">
          Features
        </li>
        <li className="hover:text-black cursor-pointer transition duration-300">
          FAQs
        </li>
      </ul>
      <Button type="primary" size="medium">
        Log in
      </Button>
    </nav>
  );
};

export default Navbar;
