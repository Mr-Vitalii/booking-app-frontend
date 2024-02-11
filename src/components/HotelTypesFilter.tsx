import { HotelTypesFilterProps } from "@/common/types/search";
import { hotelTypes } from "@/config/hotel-options-config";
import { v4 as uuidv4 } from "uuid";

export const HotelTypesFilter = ({
  selectedHotelTypes,
  onChange,
}: HotelTypesFilterProps) => {
  return (
    <div className="border-b border-sky-600 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
      <ul>
        {hotelTypes.map((hotelType) => (
          <li key={uuidv4()}>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded"
                value={hotelType}
                checked={selectedHotelTypes.includes(hotelType)}
                onChange={onChange}
              />
              <span>{hotelType}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
