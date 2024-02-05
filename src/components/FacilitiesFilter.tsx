import { FacilitiesFilterProps } from "@/common/types/search";
import { hotelFacilities } from "@/config/hotel-options-config";
import { v4 as uuidv4 } from "uuid";

export const FacilitiesFilter = ({
  selectedFacilities,
  onChange,
}: FacilitiesFilterProps) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Facilities</h4>
      <ul>
        {hotelFacilities.map((facility) => (
          <li key={uuidv4()}>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded"
                value={facility}
                checked={selectedFacilities.includes(facility)}
                onChange={onChange}
              />
              <span>{facility}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
