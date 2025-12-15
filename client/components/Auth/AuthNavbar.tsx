"use client";

import Image from "next/image";
import Button from "../Button";
import icon from "@/public/images/tixly-icon.png";
import Link from "next/link";

const AuthNavbar = () => {
  return (
    <nav className="p-5 flex justify-between items-center fixed w-full top-0 bg-white z-50 shadow-md">
      <Link href="/">
        <div className="flex gap-1 items-center cursor-pointer">
          <Image src={icon} alt="" width={40} height={40} className="" />
          <h1 className="text-[28px] font-semibold ">Tixly</h1>
        </div>
      </Link>
      <div className="flex gap-3 items-center">
        <h1>Already a member?</h1>
        <Button type="primary" size="medium">
          Log in
        </Button>
      </div>
    </nav>
  );
};

export default AuthNavbar;
