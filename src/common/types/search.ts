import { HotelType } from "./hotel";

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type PaginationProps = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

export type StarRatingFilterProps = {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type HotelTypesFilterProps = {
  selectedHotelTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type FacilitiesFilterProps = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type PriceFilterProps = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

export type sortOptionsType = {
  id: number;
  name: string;
  value: string;
};

export type SelectMenuProps = {
  setSortOption: (value: string) => void;
};
