import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge"
import { HotelType } from "@/types.def";


type SearchResultType = {
  hotel: HotelType
}


export default function SearchResultCard({ hotel }: SearchResultType) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border-2 rounded-lg p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map((_, i) => (
                <Star key={i} className="text-yellow-500"/>
              ))}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
          <Link
            to={`/detail/${hotel._id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {hotel.name}
          </Link>
        </div>

        <div>
          <div className="line-clamp-4">{hotel.description}</div>
        </div>

        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility: string) => (
              <Badge variant="outline" key={facility}>{facility}</Badge>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold">Rs {hotel.pricePerNight} per night</span>
            <Button asChild variant={'outline'}>
              <Link
                to={`/detail/${hotel._id}`}>
                View More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
