"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import MoneyFormat from "./MoneyFormat";
import _ from "lodash";

import { FiTrendingUp } from "react-icons/fi";
import { FiTrendingDown } from "react-icons/fi";

export default function Filter({
  setType,
  setAvailability,
  setMaxPrice,
  type,
  availability,
  maxPrice,
  setSort,
  minPrice,
  setMinPrice,
  sort,
}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [localMaxValue, setLocalMaxValue] = useState(maxPrice);
  const [localMinValue, setLocalMinValue] = useState(minPrice);

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
  };

  const handleAvailabilityChange = (e) => {
    const selectedAvail = e.target.value;

    setAvailability(selectedAvail);
  };

  const handleMaxChange = (e) => {
    const value = e.target.value;
    setLocalMaxValue(e.target.value);
    debouncedSetMaxPrice(value);
  };

  const handleMinChange = (e) => {
    const value = e.target.value;
    setLocalMinValue(e.target.value);
    debouncedSetMinPrice(value);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    console.log(value);
    setSort(value);
  };

  const debouncedSetMaxPrice = useCallback(
    _.debounce((value) => {
      setMaxPrice(value);
    }, 500),
    [setMaxPrice]
  );

  const debouncedSetMinPrice = useCallback(
    _.debounce((value) => {
      setMinPrice(value);
    }, 500),
    [setMinPrice]
  );

  return (
    <div className="bg-main-white shadow-md">
      <Dialog
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
        className="relative z-40"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto w-full max-w-xs bg-white py-4 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-bold">Filters</h2>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="-mr-2 h-10 w-10 p-2 text-gray-400"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <main className="mx-auto max-w-4xl px-2 sm:px-6 lg:px-8">
        <section aria-labelledby="filters-heading" className="pb-24 pt-6">
          <h2 id="filters-heading" className="sr-only">
            Filters
          </h2>

          <div className="grid grid-cols-1 gap-x-2 gap-y-10 lg:grid-cols-1">
            <form className=" space-y-4 border-b border-gray-200 pb-6">
              <div className="flex flex-col text-gray-500">
                <label className="font-medium text-gray-500">Filter</label>
                <div className="border-gray-200 border-2 w-full my-2"></div>

                <button
                  value="up"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSortChange(e);
                  }}
                  className={`p-0 text-left flex  ${
                    sort == "up" ? "font-bold" : ""
                  } `}
                >
                  Prijs: Laag naar Hoog
                </button>
                <button
                  value="down"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSortChange(e);
                  }}
                  className={`p-0 text-left flex ${
                    sort == "down" ? "font-bold" : ""
                  } `}
                >
                  Prijs: Hoog naar Laag
                </button>
              </div>
              <div>
                <label className="font-medium text-gray-500">Type</label>

                <select
                  value={type}
                  onChange={handleTypeChange}
                  className={`mt-2 block w-100 border border-gray-300 rounded-md p-1 w-full`}
                >
                  <option value="All">Alles</option>
                  <option value="Apartment">Appartement</option>
                  <option value="House">Huis</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-gray-500">
                  Beschikbaarheid
                </label>
                <select
                  value={availability}
                  onChange={handleAvailabilityChange}
                  className="mt-2 block w-100 border border-gray-300 rounded-md p-1 w-full"
                >
                  <option value="All">Alles</option>
                  <option value="1">Beschikbaar</option>
                  <option value="0">Verkocht</option>
                </select>
              </div>

              {/* Slaapkamers */}
              <Disclosure defaultOpen>
                <DisclosureButton className="flex justify-between py-2 text-gray-500">
                  <span>Prijs max</span>
                  <span>
                    <MinusIcon className="h-7 w-7" />
                  </span>
                </DisclosureButton>
                <DisclosurePanel>
                  <input
                    type="range"
                    min="50000"
                    max="2500000"
                    step="10000"
                    className="w-full"
                    value={localMaxValue}
                    onChange={(e) => handleMaxChange(e, setMaxPrice)}
                  />
                  <span className="text-xs text-gray-600">
                    Maximale prijs: <MoneyFormat amount={localMaxValue} />
                  </span>
                </DisclosurePanel>
              </Disclosure>
              <Disclosure defaultOpen>
                <DisclosureButton className="flex justify-between py-2 text-gray-500">
                  <span>Prijs min</span>
                  <span>
                    <MinusIcon className="h-7 w-7" />
                  </span>
                </DisclosureButton>
                <DisclosurePanel>
                  <input
                    type="range"
                    min="50000"
                    max="2500000"
                    step="10000"
                    className="w-full"
                    value={localMinValue}
                    onChange={(e) => handleMinChange(e, setMinPrice)}
                  />
                  <span className="text-xs text-gray-600">
                    Minimale prijs: <MoneyFormat amount={localMinValue} />
                  </span>
                </DisclosurePanel>
              </Disclosure>
            </form>
            {/* <img src="https://i.imgur.com/FL4EKGW.jpeg"></img> */}
          </div>
        </section>
      </main>
    </div>
  );
}
