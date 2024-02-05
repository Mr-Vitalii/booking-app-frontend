import { StarRatingFilterProps } from "@/common/types/search";
import { v4 as uuidv4 } from "uuid";

export const StarRatingFilter = ({
  selectedStars,
  onChange,
}: StarRatingFilterProps) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Property Rating</h4>
      <ul>
        {["5", "4", "3", "2", "1"].map((star) => (
          <li key={uuidv4()}>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded"
                value={star}
                checked={selectedStars.includes(star)}
                onChange={onChange}
              />
              <span>{star} Stars</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
