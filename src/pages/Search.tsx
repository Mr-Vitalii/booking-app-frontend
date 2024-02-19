import * as React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { IoClose } from "react-icons/io5";

import { useAppContext } from "@/contexts/AppContext";
import { useSearchContext } from "@/contexts/SearchContext";

import { hotelSortOptions } from "@/config/hotel-options-config";
import { sortOptionsType } from "@/common/types/search";

import { FacilitiesFilter } from "@/components/FacilitiesFilter";
import { HotelTypesFilter } from "@/components/HotelTypesFilter";
import { Loader } from "@/components/Loader";
import { Pagination } from "@/components/Pagination";
import { PriceFilter } from "@/components/PriceFilter";
import { SearchResultsCard } from "@/components/SearchResultsCard";
import { SelectMenu } from "@/components/SelectMenu";
import { StarRatingFilter } from "@/components/StarRatingFilter";
import * as apiClient from "../api-client";

export const Search = () => {
  const search = useSearchContext();
  const { isAboveMediumScreens } = useAppContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  const [selected, setSelected] = useState<sortOptionsType>(
    hotelSortOptions[0]
  );

  const [filterHidden, setFilterHidden] = useState<boolean>(false);

  const showFilter = () => {
    setFilterHidden(!filterHidden);
  };

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: hotelData, isLoading } = useQuery(
    ["searchHotels", searchParams],
    () => apiClient.searchHotels(searchParams)
  );

  const handelStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handelHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((prevHotelTypes) =>
      event.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes.filter((hotel) => hotel !== hotelType)
    );
  };

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;

    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((prevFacility) => prevFacility !== facility)
    );
  };

  return (
    <div className="grid grid-cols-1 relative lg:grid-cols-[250px_1fr] gap-5">
      <div
        className={`rounded-lg border border-sky-600 bg-sky-100 absolute top-[128px] h-[40vh] w-full overflow-y-auto  ${
          filterHidden ? "hidden" : "visible"
        } lg:sticky lg:h-[20%]
        `}
      >
        <div className="space-y-5 p-3">
          <span className="flex justify-between">
            <h3 className="text-lg font-semibold border-b border-sky-600 pb-5">
              Filter by:
            </h3>
            {!isAboveMediumScreens && (
              <button onClick={showFilter}>
                <IoClose size={20} />
              </button>
            )}
          </span>

          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handelStarsChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handelHotelTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-3 lg:flex lg:justify-between lg:items-center">
            <span className="col-start-1 col-end-3 text-xl font-bold">
              {hotelData?.pagination.total} Hotels found
              {search.destination ? ` in ${search.destination}` : ""}
            </span>
            {!isAboveMediumScreens && (
              <div>
                <p className="mb-3 text-sm font-medium">Filter by:</p>
                <button
                  onClick={showFilter}
                  className="bg-white py-1.5 px-2 rounded-md w-full"
                >
                  Filter
                </button>
              </div>
            )}
            <SelectMenu
              setSortOption={setSortOption}
              selected={selected}
              setSelected={setSelected}
              hotelSortOptions={hotelSortOptions}
            />
          </div>
          <ul>
            {hotelData?.data.map((hotel) => (
              <li key={hotel._id} className="mb-3">
                <SearchResultsCard hotel={hotel} />
              </li>
            ))}
          </ul>

          <div>
            <Pagination
              page={hotelData?.pagination.page || 1}
              pages={hotelData?.pagination.pages || 1}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
