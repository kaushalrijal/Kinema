"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../img/logo.png";
import { usePathname } from "next/navigation";
import { Close, CloseRounded, CloseSharp, Search } from "@mui/icons-material";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Menu } from "@mui/material";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";
import Recomm from "./searchRecoms";
import { getSearch } from "@/utils/request";

const navLinks = [
  { key: "1", path: "/", name: "Home" },
  { key: "2", path: "/movies", name: "Movies" },
  { key: "3", path: "/shows", name: "Shows" },
  { key: "4", path: "/about", name: "About" },
];

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    getSearch(search).then((result) => {
      const filteredResult = result.filter((x) => {
        return x.media_type == "movie" || x.media_type == "tv";
      });
      setRecommendations(filteredResult);
      console.log(result);
    });
  }, [search]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (search.length > 0) {
      router.push(`/search?query=${search}`);
    }
  };

  return (
    <div className="flex flex-col w-full md:h-16 h-auto bg-secondary md:flex-row justify-between px-8 md:items-center py-auto flex-wrap">
      <div className="flex flex-row items-center justify-between ">
        <Link href="/">
          <Image
            src={logo}
            alt="kinema logo"
            className={"h-[40px] w-auto"}
            unoptimized
          />
        </Link>
        <div
          className="md:hidden p-2.5 "
          onClick={() => {
            setOpen(!isOpen);
          }}
        >
          {isOpen ? (
            <CloseSharp className="text-lg" />
          ) : (
            <HamburgerMenuIcon className="text-lg" />
          )}
        </div>
      </div>
      <div
        className={`py-4 md:flex ${
          isOpen ? "visible" : "hidden"
        } duration-75 ease-in-out delay-75 `}
      >
        <ul className="items-center lg:pl-48 text-black gap-2 flex flex-col w-full md:flex-row">
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
                } md:px-1 md:py-0.5 p-1 rounded-sm w-full md:w-auto`}
                key={navItem.key}
              >
                {navItem.name}
              </Link>
            );
          })}
        </ul>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div
          className={`flex flex-col h-fit sm:h-auto  mb-4 md:m-0 relative ${
            isOpen ? "visible" : "hidden"
          } md:flex text-sm`}
        >
          <div className="flex justify-center items-center gap-2 my-2 mb-4 md:m-0">
            <input
              type="search"
              className="block w-full rounded bg-[#1100b3] px-6 py-2 text-sm font-medium text-white shadow focus:outline-none focus:ring  placeholder:text-secondary placeholder:text-xs"
              placeholder="Enter a movie/series title"
              onChange={(query) => {
                setSearch(query.target.value);
              }}
              required
            />
            <button
              type="submit"
              className="p-[6px] text-xs lg:p-2 w-9 h-9 justify-center items-center flex bg-primary text-white rounded-md hover:bg-white hover:text-primary cursor-pointer hover:border-2 border-black relative"
            >
              <SearchIcon className="h-5 w-5" />
            </button>
          </div>
          {recommendations.length !== 0 && (
            <div className={`sm:absolute top-10 z-10 w-full`}>
              <Recomm results={recommendations.slice(0, 5)} />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Navbar;
