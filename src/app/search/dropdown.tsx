import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import React from "react";

const people = [
  {
    id: 1,
    value: "Popularity",
  },
  {
    id: 2,
    value: "Release Date",
  },
  {
    id: 3,
    value: "Ratings",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example(props) {
  const [selected, setSelected] = useState(people[0]);

  const changeFilter = (arg) => {
    setSelected(arg);
    props.setFilter(arg.value);
  };

  return (
    <Listbox value={selected} onChange={changeFilter}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-black dark:text-white">
            Sort By
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-lightbg dark:bg-darkbg py-1.5 pl-3 pr-10 text-left ttext-black dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-lightprimary  dark:focus:ring-darkprimary sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="ml-3 block truncate text-black dark:text-white ">
                  {selected.value}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronsUpDownIcon
                  className="h-5 w-5 ttext-black dark:text-white"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {people.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-lightprimary dark:bg-darkprimary text-black dark:text-white text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {person.value}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-lightprimary dark:text-darkprimary hover:text-white dark:hover:text-white",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5 text-lightprimary dark:text-darkprimary hover:text-white dark:hover:text-white" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
