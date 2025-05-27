"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CloseSharp } from "@mui/icons-material";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";
import Recomm from "@/components/carousel/searchRecoms";
import { getSearch } from "@/utils/request";
import Theme from "@/components/ui/theme/Theme";

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
  const [isSearching, setIsSearching] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!search.trim()) {
        setRecommendations([]);
        return;
      }

      try {
        setIsSearching(true);
        const result = await getSearch(search);
        if (result) {
      const filteredResult = result.filter((x) => {
            return x.media_type === "movie" || x.media_type === "tv";
      });
      setRecommendations(filteredResult);
        } else {
          setRecommendations([]);
        }
      } catch (error) {
        console.error('Search error:', error);
        setRecommendations([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.length > 0) {
      router.push(`/search?query=${search}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-darkbg shadow-md dark:shadow-[#212121]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-lightprimary to-darkprimary bg-clip-text text-transparent">
                KINEMA
              </span>
            </Link>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setOpen(!isOpen)}
            >
              {isOpen ? (
                <CloseSharp className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <HamburgerMenuIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } md:block transition-all duration-300 ease-in-out`}
          >
            <ul className="flex flex-col md:flex-row md:items-center md:space-x-2 space-y-2 md:space-y-0 mt-4 md:mt-0">
              {navLinks.map((navItem) => {
                const isActive = pathname === navItem.path;
                return (
                  <li key={navItem.key}>
                    <Link
                      href={navItem.path}
                      className={`block px-1.5 md:px-2 py-1 md:py-0.5 rounded-lg transition-colors font-medium ${
                        isActive
                          ? "bg-lightprimary dark:bg-darkprimary text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {navItem.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Search and Theme */}
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } md:block mt-4 md:mt-0`}
          >
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <div className="relative w-full md:w-64">
                <input
                  type="search"
                  className="w-full px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lightprimary dark:focus:ring-darkprimary transition-colors"
                  placeholder="Search movies or series..."
                  onChange={(e) => setSearch(e.target.value)}
                  required
                />
                {recommendations.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1">
                    <Recomm results={recommendations.slice(0, 5)} />
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="p-2 rounded-lg bg-lightprimary dark:bg-darkprimary text-white hover:bg-opacity-90 transition-colors"
              >
                <SearchIcon className="h-5 w-5" />
              </button>
              <Theme />
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
