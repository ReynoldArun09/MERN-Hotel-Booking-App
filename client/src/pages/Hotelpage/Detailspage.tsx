import { Star } from "lucide-react";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import GuestInfoForm from "./_form/GuestInfoForm/GuestInfoForm";
import { GetHotelById } from "./_api/HotelApi";


export default function Detailspage() {
  const {hotelId} = useParams()


  const {data: hotel} = useQuery({
    queryKey: ['hotel', hotelId],
    queryFn: () => GetHotelById(hotelId || ''),
    enabled: !!hotelId
  })




  if (!hotel) {
    return <></>;
  }


  return (
    <div className="space-y-6">
    <div>
      <span className="flex">
        {Array.from({ length: hotel.starRating }).map(() => (
          <Star className="fill-yellow-400" />
        ))}
      </span>
      <h1 className="text-3xl font-bold">{hotel.name}</h1>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {hotel?.imageUrls?.map((image: string | undefined) => (
        <div className="h-[300px]">
          <img
            src={image}
            alt={hotel.name}
            className="rounded-md w-full h-full object-cover object-center"
          />
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
      {hotel?.facilities.map((facility:string) => (
        <div className="border-2 rounded-sm p-3">
          {facility}
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
      <div className="whitespace-pre-line">{hotel.description}</div>
      <div className="h-fit">
        <GuestInfoForm
          pricePerNight={hotel.pricePerNight}
          hotelId={hotel._id}
        />
      </div>
    </div>
  </div>
  )
}