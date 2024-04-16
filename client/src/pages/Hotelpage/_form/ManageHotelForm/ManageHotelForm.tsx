import { FormProvider, useForm } from "react-hook-form";

import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImageSection from "./ImageSection";
import DetailsSEction from "./DetailsSEction";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { HotelFormData, HotelType } from "@/types.def";




type Props = {
  onSave: (hotelFormData: FormData) => void;
  isLoading?: boolean;
  hotel?: HotelType;
};

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;



  useEffect(() => {
    reset(hotel)
  }, [hotel, reset])

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
    if(hotel) {
      formData.append('hotelId', hotel._id)
    }
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

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    if(formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url)
      })
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSEction />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImageSection />
        <span className="flex justify-end">
          <Button
            disabled={isLoading}
            type="submit"
            size={"lg"}
            className="px-8 py-4 font-semibold rounded-[8px] disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
