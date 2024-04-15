import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HotelType } from "@/types.def";

export type LatestDestinationProps = {
  hotel: HotelType;
};

export default function LatestDestinationCard({
  hotel,
}: LatestDestinationProps) {
  return (
    <Link to={`/detail/${hotel._id}`} className="cursor-pointer">
      <Card className="rounded-[6px]">
        <CardHeader>
          <CardTitle>{hotel.name}</CardTitle>
          <section className="flex items-center justify-between text-sm gap-4 pt-4">
            <span className="font-bold">
              Country: <Badge variant={"outline"}>{hotel.country}</Badge>
            </span>
            <span className="font-bold">
              City: <Badge variant={"outline"}>{hotel.city}</Badge>
            </span>
          </section>
        </CardHeader>
        <CardContent className="h-[250px]">
          <img
            src={hotel.imageUrls[0]}
            className="w-full h-full object-cover object-center"
          />
        </CardContent>
        <CardFooter className="space-x-2 flex space-y-1 flex-wrap">
          {hotel.facilities.map((facility: string) => (
            <Badge variant="outline" key={facility}>
              {facility}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}
