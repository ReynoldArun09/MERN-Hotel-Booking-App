
import { BASE_URL } from "@/main"
import { BookingFormData, HotelType, PaymnetIntentResponse, UserType } from "@/types.def"


export const fetchCurrentUser = async(): Promise<UserType> => {
    const response = await fetch(`${BASE_URL}/user/me`, {
        credentials: "include"
    })
    if(!response.ok) {
        throw new Error(response.statusText)
    }

    const responseBody = response.json()
    return responseBody
}


export const createPaymentIntent = async (
    hotelId: string,
    numberOfNights: string
  ): Promise<PaymnetIntentResponse> => {
    const response = await fetch(
      `${BASE_URL}/hotel/${hotelId}/bookings/payment-intent`,
      {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ numberOfNights }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  
    if(!response.ok) {
      const responseError = await response.json()
      console.log(responseError.message)
      throw new Error(responseError.message)
  }

    const responseBody = response.json()
    console.log(responseBody)
    return responseBody
  };
  
  export const createRoomBooking = async (formData: BookingFormData) => {
    const response = await fetch(
      `${BASE_URL}/hotel/${formData.hotelId}/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      }
    );
  
    if(!response.ok) {
      const responseError = await response.json()
      console.log(responseError.message)
      throw new Error(responseError.message)
  }

    const responseBody = response.json()
    console.log(responseBody)
    return responseBody
  };

  export const MyBooking = async(): Promise<HotelType[]> => {
    const response = await fetch(`${BASE_URL}/hotel/mybookings`, {
        method: "GET",
        credentials: "include"
    })
    if(!response.ok) {
        const responseError = await response.json()
        console.log(responseError)
        throw new Error(responseError.message)
    }

    const responseBody = response.json()
    return responseBody
}