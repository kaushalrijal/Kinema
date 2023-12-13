"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../img/logo.png";
import { usePathname } from "next/navigation";

const navLinks = [
  { key: "1", path: "/", name: "Home" },
  { key: "2", path: "/movies", name: "Movies" },
  { key: "3", path: "/shows", name: "Shows" },
  { key: "4", path: "/about", name: "About" },
];

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col w-screen md:h-16 h-auto bg-slate-100 md:flex-row justify-between px-8 items-center py-auto flex-wrap">
      <Image src={logo} alt="kinema logo" className={"h-[40px] w-auto"} />
      <div className="justify-between text-black gap-2 hidden md:flex">
        {navLinks.map((navItem) => {
          const isActive =
            pathname === navItem.path && pathname.startsWith(navItem.path);

          return (
            <Link
              href={navItem.path}
              className={`${
                isActive
                  ? `bg-[#1000b3] text-white`
                  : `hover:bg-[#1000b3] hover:text-white `
              } px-1 py-0.5 rounded-sm`}
              key={navItem.key}
            >
              {navItem.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
