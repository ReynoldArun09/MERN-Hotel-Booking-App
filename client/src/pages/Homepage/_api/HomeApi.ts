import { BASE_URL } from "@/main";
import { HotelType } from "@/types.def";


export const FetchAllHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${BASE_URL}/hotel`);

  if (!response.ok) {
    throw new Error("Failed to fetch hotels");
  }

  return response.json();
};
