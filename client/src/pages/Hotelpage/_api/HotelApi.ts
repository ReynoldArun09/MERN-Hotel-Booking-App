import { BASE_URL } from "@/main";


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
