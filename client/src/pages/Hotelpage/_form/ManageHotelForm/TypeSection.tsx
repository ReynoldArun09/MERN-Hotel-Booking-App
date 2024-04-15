import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HotelFormData } from "@/types";
import { hotelTypes } from "@/utils/hotelsOptions";

export default function TypeSection() {
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
        {hotelTypes.map((type: string) => (
          <Label
           key={type}
            className={
              typeWatch === type
                ? "cursor-pointer bg-foreground text-white text-sm rounded-full px-4 py-2 font-semibold"
                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
            }
          >
            <Input
              type="radio"
              value={type}
              {...register("type", { required: "the field is required" })}
              className="hidden"
            />
            <span>{type}</span>
          </Label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          <ErrorMessage errors={errors} name="type" />
        </span>
      )}
    </div>
  );
}
