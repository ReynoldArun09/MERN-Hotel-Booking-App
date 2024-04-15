import { useFormContext } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@hookform/error-message";
import { HotelFormData } from "@/types";


export default function GuestsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300">
        <Label className="text-gray-700 text-sm font-semibold">
          Adults
          <Input
            className="border rounded w-full py-2 px-3 font-normal"
            type="number"
            min={1}
            {...register("adultCount", {
              required: "This field is required",
            })}
          />
          {errors.adultCount?.message && (
            <span className="text-red-500 text-sm fold-bold">
              <ErrorMessage errors={errors} name="adultCount" />
            </span>
          )}
        </Label>
        <Label className="text-gray-700 text-sm font-semibold">
          Children
          <Input
            className="border rounded w-full py-2 px-3 font-normal"
            type="number"
            min={0}
            {...register("childCount", {
              required: "This field is required",
            })}
          />
          {errors.childCount?.message && (
            <span className="text-red-500 text-sm fold-bold">
              <ErrorMessage errors={errors} name="childCount" />
            </span>
          )}
        </Label>
      </div>
    </div>
  );
}
