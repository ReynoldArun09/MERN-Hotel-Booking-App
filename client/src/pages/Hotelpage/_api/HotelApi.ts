import { BASE_URL } from "@/main";
import { HotelType } from "@/types.def";


export const CreateHotel = async(formData:FormData) => {
    const response = await fetch(`${BASE_URL}/hotel/add`, {
        method: 'POST',
        credentials: 'include',
        body: formData
    })
    if (!response.ok) {
        throw new Error("Failed to add hotel");
      }
     
      const data =  await response.json();

      return data
}


export const GetAllUsersHotels = async() => {
    const response = await fetch(`${BASE_URL}/hotel/users`, {
        method: 'GET',
        credentials: 'include',
    });


    if(!response.ok) {
        throw new Error("Error fetching hotel")
    }


    return response.json()
}



export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${BASE_URL}/hotel/${hotelId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching Hotels");
  }

  const responseBody = await response.json();
  return responseBody
};

export const UpdateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(`${BASE_URL}/hotel/${hotelFormData.get("hotelId")}`, {
    method: 'PUT',
    body: hotelFormData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching Hotels");
  }

  const responseBody = await response.json();
  return responseBody
};