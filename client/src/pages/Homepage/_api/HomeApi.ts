
import { HotelType } from "@/types.def";
import { BASE_URL } from "@/utils/constants";


export const FetchAllHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${BASE_URL}/hotel`);

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  
  return responseBody;
};
