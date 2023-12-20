"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../img/logo.png";
import { usePathname } from "next/navigation";
import { Search } from "@mui/icons-material";

const navLinks = [
  { key: "1", path: "/", name: "Home" },
  { key: "2", path: "/movies", name: "Movies" },
  { key: "3", path: "/shows", name: "Shows" },
  { key: "4", path: "/about", name: "About" },
];

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col w-full md:h-16 h-auto bg-slate-100 md:flex-row justify-between px-8 items-center py-auto flex-wrap">
      <Link href="/">
        <Image
          src={logo}
          alt="kinema logo"
          className={"h-[40px] w-auto basis-1/4"}
        />
      </Link>
      <div className="justify-center pl-48 text-black gap-2 hidden md:flex basis-1/2">
        {navLinks.map((navItem) => {
          const isActive =
            pathname === navItem.path && pathname.startsWith(navItem.path);

          return (
            <Link
              href={navItem.path}
              className={`${
                isActive
                  ? `bg-primary text-white`
                  : `hover:bg-primary hover:text-white `
              } px-1 py-0.5 rounded-sm`}
              key={navItem.key}
            >
              {navItem.name}
            </Link>
          );
        })}
      </div>
      <div className="flex justify-center items-center gap-2 basis-1/4 my-2 mb-4 md:m-0">
        <input
          type="search"
          className="block w-full rounded bg-[#1100b3] px-6 py-2 text-sm font-medium text-white shadow focus:outline-none focus:ring sm:w-auto placeholder:text-slate-100"
          placeholder="Enter a movie/series title"
        />
        <Search className="p-2 w-9 h-9 bg-primary text-white rounded-md hover:bg-white hover:text-primary cursor-pointer hover:border-2 border-black" />
      </div>
    </div>
  );
};

export default Navbar;
