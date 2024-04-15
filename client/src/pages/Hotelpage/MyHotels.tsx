import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { Building, DollarSignIcon, File, Hotel, Map, StarIcon } from "lucide-react";
import { HotelType } from "@/types.def";
import { GetAllUsersHotels } from "./_api/HotelApi";


export default function MyHotels() {

  const {data: hotelData} = useQuery({
    queryKey: ['fetchAlluserHotels'],
    queryFn: GetAllUsersHotels
  })

  if (!hotelData) {
    return <span>No Hotels found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
       <Button asChild size={"lg"} className="font-bold bg-foreground rounded-[8px]">
       <Link
          to="/add-hotel">
           
          <File className="mr-1"/> Add Hotel
        </Link>
       </Button>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData?.map((hotel:HotelType, i:number) => (
          <div
           key={i}
            className="flex flex-col justify-between border-2 rounded-lg p-8 gap-5"
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-5">
              <div className="border-2 rounded-sm p-3 flex items-center">
                <Map className="mr-2" size={20}/>
                {hotel.city}, {hotel.country}
              </div>
              <div className="border-2 rounded-sm p-3 flex items-center">
                <Building className="mr-2" size={20}/>
                {hotel.type}
              </div>
              <div className="border-2 rounded-sm p-3 flex items-center">
                <DollarSignIcon className="mr-2" size={20}/> £{hotel.pricePerNight} per night
              </div>
              <div className="border-2 rounded-sm p-3 flex items-center">
                <Hotel className="mr-2" size={20}/>   
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border-2 rounded-sm p-3 flex items-center">
                <StarIcon className="mr-2" size={20}/>
                {hotel.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Button asChild size={'lg'} className="rounded-[5px]" variant={'default'}>
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex font-bold p-2"
              >
                Edit Details
              </Link>
              </Button>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
