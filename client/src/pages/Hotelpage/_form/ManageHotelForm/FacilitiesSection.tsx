
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Label } from "@/components/ui/label";
import { hotelFacilities } from "@/utils/hotelsOptions";
import { HotelFormData } from "@/types";


const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facility:string) => (
          <Label className="text-sm flex gap-1 text-gray-700" key={facility}>
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
            />
            {facility}
          </Label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          <ErrorMessage errors={errors} name="facilities" />
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;