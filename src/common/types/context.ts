import { ToastMessage } from "./toast";
import { Stripe } from "@stripe/stripe-js";

export type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoading: boolean;
  isLoggedIn: boolean;
  stripePromise: Promise<Stripe | null>;
};

export type SearchContext = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number
  ) => void;
};
