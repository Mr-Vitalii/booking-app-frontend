import { useFormContext } from "react-hook-form";
import { hotelTypes } from "@/config/hotel-options-config";
import { HotelFormData } from "@/common/types/hotel";

export const HotelTypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={
              typeWatch === type
                ? "cursor-pointer bg-sky-500 text-white text-xs text-center rounded-full px-4 py-2 font-semibold md:text-sm"
                : "cursor-pointer bg-white text-xs text-center rounded-full px-4 py-2 font-semibold md:text-sm"
            }
          >
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};
