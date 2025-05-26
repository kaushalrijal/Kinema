import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const Theme = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Check theme from localStorage or system preference
    const savedTheme = localStorage.getItem("hs_theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

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
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-colors bg-lightprimary dark:bg-darkprimary text-white hover:bg-blue-700 dark:hover:bg-[#d97c13]"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-white transition-colors" />
      ) : (
        <Sun className="h-5 w-5 text-white transition-colors" />
      )}
    </button>
  );
};

export default Theme;