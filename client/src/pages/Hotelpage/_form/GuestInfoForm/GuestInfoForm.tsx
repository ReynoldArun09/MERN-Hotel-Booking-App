import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";

import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSearchContext } from "@/context/SearchContext";
import { GuestFormProps, GuestInfoFormData } from "@/types.def";
import { useAppContext } from "@/context/AppContext";




  
  export default function GuestInfoForm({hotelId, pricePerNight}: GuestFormProps) {
    const {isLoggedIn} = useAppContext()
    const search = useSearchContext()
    const navigate = useNavigate()
    const location = useLocation()
    const {register, watch, handleSubmit, setValue, formState: {errors}} = useForm<GuestInfoFormData>({
      defaultValues: {
        checkIn: search.checkIn,
        checkOut: search.checkOut,
        adultCount: search.adultCount,
        childCount: search.childCount,
      }
    })
   
    const checkIn = watch("checkIn");
    const checkOut = watch("checkOut");
  
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);


    const onSubmit = (formData: GuestInfoFormData) => {
      search.saveSearchValues(
        "",
        formData.checkIn,
        formData.checkOut,
        formData.adultCount,
        formData.childCount
      );
      navigate(`/hotel/${hotelId}/booking`);
    }

    const SendToLogin = (formData: GuestInfoFormData) => {
      search.saveSearchValues(
        "",
        formData.checkIn,
        formData.checkOut,
        formData.adultCount,
        formData.childCount
      );
      navigate("/login", {state: {from: location}})
    }

    return (
      <div className="flex flex-col p-4 bg-primary-foreground rounded-[10px] gap-4">
      <h3 className="text-md font-bold">£{pricePerNight}</h3>
      <form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(SendToLogin)}>
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date || null)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-inherit border-2 p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-inherit border-2 p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div className="flex px-2 py-1 gap-2">
            <label className="items-center flex">
              Adults:
              <input
                className="w-full p-1 bg-inherit border-2 focus:outline-none font-bold"
                type="number"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className="items-center flex">
              Children:
              <input
                className="w-full p-1 bg-inherit border-2 focus:outline-none font-bold"
                type="number"
                min={0}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <Button className="h-full p-2 font-bold text-xl" variant={'secondary'}>
              Book Now
            </Button>
          ) : (
            <Button className="h-full p-2 font-bold t-xl" variant={'secondary'}>
              Sign in to Book
            </Button>
          )}
        </div>
      </form>
    </div>
    )
  }
  