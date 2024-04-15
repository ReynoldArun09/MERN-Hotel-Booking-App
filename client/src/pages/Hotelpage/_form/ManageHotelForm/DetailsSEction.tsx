import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ErrorMessage } from "@hookform/error-message"
import { HotelFormData } from "@/types"


export default function DetailsSEction() {
  const {register, formState: {errors}} = useFormContext<HotelFormData>()
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <Label className="text-sm font-bold flex-1">
        Name
        <Input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("name", { required: "This field is required" })}
        ></Input>
        {errors.name && (
          <span className="text-red-500">
            <ErrorMessage errors={errors} name="name" />
          </span>
        )}
      </Label>

      <div className="flex gap-4">
        <Label className="text-sm font-bold flex-1">
          City
          <Input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("city", { required: "This field is required" })}
          ></Input>
          {errors.city && (
            <span className="text-red-500">
              <ErrorMessage errors={errors} name="city" />
            </span>
          )}
        </Label>
        <Label className="text-sm font-bold flex-1">
          Country
          <Input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("country", { required: "This field is required" })}
          ></Input>
          {errors.country && (
            <span className="text-red-500">
              <ErrorMessage errors={errors} name="country" />
            </span>
          )}
        </Label>
      </div>
      <Label className="text-sm font-bold flex-1">
        Description
        <textarea
          rows={10}
          className="border bg-inherit rounded w-full py-1 px-2 font-normal"
          {...register("description", { required: "This field is required" })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500">
            <ErrorMessage errors={errors} name="description" />
          </span>
        )}
      </Label>
      <Label className=" text-sm font-bold max-w-[50%]">
        Price Per Night
        <Input
          type="number"
          min={1}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("pricePerNight", { required: "This field is required" })}
        ></Input>
        {errors.pricePerNight && (
          <span className="text-red-500">
            <ErrorMessage errors={errors} name="pricePerNight" />
          </span>
        )}
      </Label>
      <Label className="text-sm font-bold max-w-[50%]">
        Star Rating
        <select
          {...register("starRating", {
            required: "This field is required",
          })}
          className="border bg-inherit rounded w-full p-2 font-normal"
        >
          <option value="" className="text-sm bg-inherit font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((num, i) => (
            <option value={num} className="" key={i}>{num}</option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">
            <ErrorMessage errors={errors} name="starRating" />
          </span>
        )}
      </Label>
    </div>
  )
}
 