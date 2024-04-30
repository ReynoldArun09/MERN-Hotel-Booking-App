
import { HotelSearchResponse, SearchParams } from "@/types.def";
import { BASE_URL } from "@/utils/constants";


export const searchHotels = async (
    searchParams: SearchParams
  ): Promise<HotelSearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");
  
    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");
  
    searchParams.facilities?.forEach((facility) =>
      queryParams.append("facilities", facility)
    );
  
    searchParams.types?.forEach((type) => queryParams.append("types", type));
    searchParams.stars?.forEach((star) => queryParams.append("stars", star));
  
    const response = await fetch(
      `${BASE_URL}/hotel/search?${queryParams}`
    );
  
    if (!response.ok) {
      throw new Error("Error fetching hotels");
    }
  
    return response.json();
  };