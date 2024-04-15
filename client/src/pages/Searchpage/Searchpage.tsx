import { useState } from "react";
import FacilitiesFilter from "./_components/FacilitiesFilter";
import HotelTypesFilter from "./_components/HotelTypesFilter";
import PriceFilter from "./_components/PriceFilter";
import StarRatingFilter from "./_components/StarRatingFilter";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import SearchResultCard from "./_components/SearchResultCard";
import PaginationComponent from "./_components/Pagination";
import { useSearchContext } from "@/context/SearchContext";
import { searchHotels } from "./_api/SearchApi";

export default function Searchpage() {
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [page, setPage] = useState<number>(1);
  const [sortOption, setSortOption] = useState<string>("");
  const search = useSearchContext();

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };


  const {data:hotelData}= useQuery({
    queryKey: ['search', searchParams],
    queryFn: () => searchHotels(searchParams),
  })


  const handleStarsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = e.target.value;
    setSelectedStars((prevStars) =>
      e.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleHotelTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hotelType = e.target.value;

    setSelectedHotelTypes((prevHotelTypes) =>
      e.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes.filter((hotel) => hotel !== hotelType)
    );
  };

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;

    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((prevFacility) => prevFacility !== facility)
    );
  };


 
  


  return (
    <section className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
    <div className="rounded-lg border-2 p-5 h-fit sticky top-10">
      <div className="space-y-5">
        <h3 className="text-lg font-semibold border-b-2 pb-5">Filter by:</h3>
        <StarRatingFilter
          selectedStars={selectedStars}
          onChange={handleStarsChange}
        />
        <HotelTypesFilter
          selectedHotelTypes={selectedHotelTypes}
          onChange={handleHotelTypeChange}
        />
        <FacilitiesFilter
          selectedFacilities={selectedFacilities}
          onChange={handleFacilityChange}
        />
        <PriceFilter
          selectedPrice={selectedPrice}
          onChange={(value?: number) => setSelectedPrice(value)}
        />
      </div>
    </div>
    <div className="flex flex-col gap-5">
      <div>
        <span>
          {hotelData?.pagination.total} Hotels found
          {search.destination ? ` in ${search.destination}` : ""}
        </span>
        <Select onValueChange={setSortOption} defaultValue={sortOption}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort By</SelectLabel>
              <SelectItem value="pricePerNightAsc">
                Price Per Night (low to high)
              </SelectItem>
              <SelectItem value="pricePerNightDesc">
                Price Per Night (high to low)
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {hotelData?.data?.map((hotel) => (
        <SearchResultCard hotel={hotel} key={hotel._id}/>
      ))}
      <div>
        <PaginationComponent page={hotelData?.pagination?.page || 1}
        pages={hotelData?.pagination.pages || 1}
        onPageChange={(page:number) => setPage(page)}/>
      </div>
    </div>
  </section>
  );
}
