// React Imports
import React, { useState, useEffect } from "react";

// Components Imports
import Filters from "./components/generalComponents/Filters";
import SkipCard from "./components/generalComponents/SkipCard";
import BottomBar from "./components/generalComponents/BottomBar";

// Third party libraries imports
import axios from "axios";

export default function SkipSelector() {
  const [selectedSkip, setSelectedSkip] = useState(null);
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
          {filteredSkips.map((skip) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              isSelected={selectedSkip?.size === skip.size}
              onSelect={() => setSelectedSkip(skip)}
            />
          ))}
        </div>
      </div>
      {selectedSkip && <BottomBar selectedSkip={selectedSkip} />}
    </>
  );
}
