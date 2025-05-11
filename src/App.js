// React Imports
import React, { useState, useEffect } from "react";

// UI Imports
import { Button } from "./components/ui/button";

// Components Imports
import Filters from "./components/generalComponents/Filters";
import SkipCard from "./components/generalComponents/SkipCard";

// Third party libraries imports
import axios from "axios";

export default function SkipSelector() {
  const [selected, setSelected] = useState([]);
  const [skips, setSkips] = useState([]);
  const [filter, setFilter] = useState("All Sizes");
  const [sort, setSort] = useState("Price");

  const filteredSkips = skips
    .filter((skip) => {
      if (filter === "All Sizes") return true;
      const skipNum = parseInt(skip.size);
      const filterNum = parseInt(filter.split(" ")[2]);
      return skipNum > filterNum;
    })
    .sort((a, b) =>
      sort === "Price"
        ? a.price_before_vat - b.price_before_vat
        : b.size - a.size
    );

  useEffect(() => {
    axios
      .get(
        "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
      )
      .then((response) => {
        const responseData = response.data;

        const skips = responseData.map((skip) => ({
          ...skip,
          image: `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${skip.size}-yarder-skip.jpg`,
        }));
        setSkips(skips);
        setSelected(skips[0]);
      })
      .catch((error) => {
        console.error("Error fetching skips:", error);
      });
  }, []);

  return (
    <>
      <div className="p-6 text-white bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Choose Your Skip Size
        </h1>
        <Filters
          filter={filter}
          setFilter={setFilter}
          sort={sort}
          setSort={setSort}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredSkips.map((skip, index) => (
            <SkipCard
              key={index}
              skip={skip}
              isSelected={selected?.size === skip.size}
              onSelect={() => setSelected(skip)}
            />
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-[#222] px-4 py-4 sm:px-8 ">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between z-50 max-w-[1360px] mx-auto">
          <div className="flex items-baseline text-white text-base font-medium w-full xxs:justify-between sm:justify-start sm:gap-4 ">
            <span>{selected?.size} Skip</span>
            <div className="flex items-center gap-2">
              <span className="text-blue-500 font-bold text-xl sm:text-2xl">
                £{selected?.price_before_vat}
              </span>
              <span className="text-gray-300 text-sm font-normal">
                {selected?.days} days
              </span>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="secondary" className="w-1/2 sm:w-auto">
              Back
            </Button>
            <Button className="flex items-center gap-2 w-1/2 sm:w-auto">
              Continue{" "}
              <span aria-hidden className="xxs:hidden sm:block">
                →
              </span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
