import { FormProvider, useForm } from "react-hook-form";
import { HotelFormData } from "@/common/types/hotel";
import { DetailsSection } from "./DetailsSection";
import { HotelTypeSection } from "./HotelTypeSection";
import { FacilitiesSection } from "./FacilitiesSection";
import { GuestsSection } from "./GuestsSection";
import { ImagesSection } from "./ImagesSection";

export const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    console.log(formDataJson);

    const formData = new FormData();

    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });
  });
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <HotelTypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
          >
            Save
          </button>
        </span>
      </form>
    </FormProvider>
  );
};
