import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronsUpDownIcon, Filter } from "lucide-react";
import React from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface SortOption {
  id: number;
  value: string;
  label: string;
}

interface Genre {
  id: number;
  name: string;
}

interface Country {
  code: string;
  name: string;
}

interface Language {
  code: string;
  name: string;
}

const sortOptions: SortOption[] = [
  { id: 1, value: "Popularity", label: "Most Popular" },
  { id: 2, value: "Release Date", label: "Newest" },
  { id: 3, value: "Ratings", label: "Top Rated" },
  { id: 4, value: "A-Z", label: "A-Z (Title)" },
  { id: 5, value: "Z-A", label: "Z-A (Title)" },
];

// TMDB Movie/TV genres (2024)
const GENRES: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
  // TV genres
  { id: 10759, name: "Action & Adventure" },
  { id: 10762, name: "Kids" },
  { id: 10763, name: "News" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
  { id: 10768, name: "War & Politics" },
];

// Example country list (ISO 3166-1 alpha-2)
const COUNTRIES: Country[] = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "FR", name: "France" },
  { code: "IN", name: "India" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "CN", name: "China" },
  { code: "DE", name: "Germany" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "RU", name: "Russia" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "BR", name: "Brazil" },
  { code: "TR", name: "Turkey" },
  { code: "MX", name: "Mexico" },
  { code: "AR", name: "Argentina" },
  { code: "SE", name: "Sweden" },
  { code: "NL", name: "Netherlands" },
  { code: "ZA", name: "South Africa" },
];

const LANGUAGES: Language[] = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "hi", name: "Hindi" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "ru", name: "Russian" },
];

interface ExampleProps {
  setFilter: (filter: {
    sort: string;
    genre: number | null;
    country: string | null;
    language: string | null;
  }) => void;
}

export default function Example({ setFilter }: ExampleProps) {
  const [selectedSort, setSelectedSort] = useState<SortOption>(sortOptions[0]);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Notify parent of sort/filter changes
  const handleChange = (sort: SortOption, genre: Genre | null, country: Country | null, language: Language | null) => {
    setFilter({
      sort: sort.value,
      genre: genre ? genre.id : null,
      country: country ? country.code : null,
      language: language ? language.code : null,
    });
  };

  // When any filter changes, notify parent
  React.useEffect(() => {
    handleChange(selectedSort, selectedGenre, selectedCountry, selectedLanguage);
  }, [selectedSort, selectedGenre, selectedCountry, selectedLanguage]);

  return (
    <div className="flex items-start justify-end gap-4 relative">
      {/* Filter Button and Panel */}
      <div className="relative">
        <button
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
          onClick={() => setShowFilters((v) => !v)}
          type="button"
          aria-expanded={showFilters}
          aria-haspopup="true"
        >
          <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" aria-hidden="true" />
          Filters
        </button>

        <Transition
          show={showFilters}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 p-4 space-y-4 border border-gray-200 dark:border-gray-700">
            {/* Sort Filter */}
            <div className="w-full">
              <Listbox value={selectedSort} onChange={setSelectedSort}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Sort By</Listbox.Label>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-md bg-gray-100 dark:bg-gray-700 py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:outline-none focus:ring-2 focus:ring-lightprimary dark:focus:ring-darkprimary sm:text-sm sm:leading-6 transition-all duration-200">
                        <span className="block truncate text-gray-900 dark:text-gray-100">{selectedSort.label}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          <ChevronsUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </Listbox.Button>
                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {sortOptions.map((option) => (
                            <Listbox.Option
                              key={option.id}
                              value={option}
                              className={({ active }) => classNames(active ? "bg-lightprimary dark:bg-darkprimary text-white" : "text-gray-900 dark:text-gray-100", "relative cursor-default select-none py-2 pl-3 pr-9")}
                            >
                              {option.label}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>

            {/* Genre Filter */}
            <div className="w-full">
              <Listbox value={selectedGenre} onChange={setSelectedGenre as (value: Genre | null) => void}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Genre</Listbox.Label>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-md bg-gray-100 dark:bg-gray-700 py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:outline-none focus:ring-2 focus:ring-lightprimary dark:focus:ring-darkprimary sm:text-sm sm:leading-6 transition-all duration-200">
                        <span className="block truncate text-gray-900 dark:text-gray-100">{selectedGenre ? selectedGenre.name : "All Genres"}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          <ChevronsUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </Listbox.Button>
                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          <Listbox.Option value={null} className={({ active }) => classNames(active ? "bg-lightprimary dark:bg-darkprimary text-white" : "text-gray-900 dark:text-gray-100", "relative cursor-default select-none py-2 pl-3 pr-9")}>All Genres</Listbox.Option>
                          {GENRES.map((genre) => (
                            <Listbox.Option
                              key={genre.id}
                              value={genre}
                              className={({ active }) => classNames(active ? "bg-lightprimary dark:bg-darkprimary text-white" : "text-gray-900 dark:text-gray-100", "relative cursor-default select-none py-2 pl-3 pr-9")}
                            >
                              {genre.name}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>

            {/* Country Filter */}
            <div className="w-full">
              <Listbox value={selectedCountry} onChange={setSelectedCountry as (value: Country | null) => void}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Country</Listbox.Label>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-md bg-gray-100 dark:bg-gray-700 py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:outline-none focus:ring-2 focus:ring-lightprimary dark:focus:ring-darkprimary sm:text-sm sm:leading-6 transition-all duration-200">
                        <span className="block truncate text-gray-900 dark:text-gray-100">{selectedCountry ? selectedCountry.name : "All Countries"}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          <ChevronsUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </Listbox.Button>
                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          <Listbox.Option value={null} className={({ active }) => classNames(active ? "bg-lightprimary dark:bg-darkprimary text-white" : "text-gray-900 dark:text-gray-100", "relative cursor-default select-none py-2 pl-3 pr-9")}>All Countries</Listbox.Option>
                          {COUNTRIES.map((country) => (
                            <Listbox.Option
                              key={country.code}
                              value={country}
                              className={({ active }) => classNames(active ? "bg-lightprimary dark:bg-darkprimary text-white" : "text-gray-900 dark:text-gray-100", "relative cursor-default select-none py-2 pl-3 pr-9")}
                            >
                              {country.name}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>

            {/* Language Filter */}
            <div className="w-full">
              <Listbox value={selectedLanguage} onChange={setSelectedLanguage as (value: Language | null) => void}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Language</Listbox.Label>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-md bg-gray-100 dark:bg-gray-700 py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:outline-none focus:ring-2 focus:ring-lightprimary dark:focus:ring-darkprimary sm:text-sm sm:leading-6 transition-all duration-200">
                        <span className="block truncate text-gray-900 dark:text-gray-100">{selectedLanguage ? selectedLanguage.name : "All Languages"}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          <ChevronsUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </Listbox.Button>
                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          <Listbox.Option value={null} className={({ active }) => classNames(active ? "bg-lightprimary dark:bg-darkprimary text-white" : "text-gray-900 dark:text-gray-100", "relative cursor-default select-none py-2 pl-3 pr-9")}>All Languages</Listbox.Option>
                          {LANGUAGES.map((lang) => (
                            <Listbox.Option
                              key={lang.code}
                              value={lang}
                              className={({ active }) => classNames(active ? "bg-lightprimary dark:bg-darkprimary text-white" : "text-gray-900 dark:text-gray-100", "relative cursor-default select-none py-2 pl-3 pr-9")}
                            >
                              {lang.name}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}
