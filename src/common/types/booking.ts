import { HotelType } from "./hotel";
import { UserType } from "./user";

export type BookingFormProps = {
  currentUser: UserType;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
};

export type BookingDetailsSummaryProps = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};
