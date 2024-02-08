import { useQuery } from "react-query";
import { v4 as uuidv4 } from "uuid";
import * as apiClient from "../api-client";
import { LatestDestinationCard } from "@/components/LatestDestinationCard";

export const Home = () => {
  const { data: hotels } = useQuery("fetchQuery", () =>
    apiClient.fetchHotels()
  );

  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent desinations added by our hosts</p>
      <div className="grid gap-4">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {topRowHotels.map((hotel) => (
            <li key={uuidv4()}>
              <LatestDestinationCard hotel={hotel} />
            </li>
          ))}
        </ul>
        <ul className="grid md:grid-cols-3 gap-4">
          {bottomRowHotels.map((hotel) => (
            <li key={uuidv4()}>
              <LatestDestinationCard hotel={hotel} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
