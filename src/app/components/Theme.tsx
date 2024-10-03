import { useState, useEffect } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const Theme = () => {
  const [theme, setTheme] = useState(() => {
    // Check theme from localStorage or system preference
    const savedTheme = localStorage.getItem("hs_theme");
    if (savedTheme) return savedTheme;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
      localStorage.setItem("hs_theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("hs_theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div>
      {theme === "light" ? (
        <button
          type="button"
          onClick={toggleTheme}
          className="hover:text-lightprimary dark:hover:text-darkprimary text-black relative dark:text-white after:bg-lightprimary after:absolute after:h-1 after:w-0 after:-bottom-3 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer active:scale-95 transition transform duration-300"
        >
          <LightModeIcon />
        </button>
      ) : (
        <button
          type="button"
          onClick={toggleTheme}
          className="hover:text-lightprimary dark:hover:text-darkprimary text-black relative dark:text-white dark:after:bg-darkprimary after:absolute after:h-1 after:w-0 after:-bottom-3 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer active:scale-95 transition transform duration-300"
        >
          <DarkModeIcon />
        </button>
      )}
    </div>
  );
};

export default Theme;
