

import { BookingFormData, HotelType, PaymnetIntentResponse, UserType } from "@/types.def"
import { BASE_URL } from "@/utils/constants"


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
  
    const responseBody = await response.json()


    if(!response.ok) {
        throw new Error(responseBody.message)
    }

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
  
    const responseBody = await response.json()
   

    if(!response.ok) {
        throw new Error(responseBody.message)
    }

    return responseBody
  };

  export const MyBooking = async(): Promise<HotelType[]> => {
    const response = await fetch(`${BASE_URL}/hotel/mybookings`, {
        method: "GET",
        credentials: "include"
    })

    const responseBody = await response.json()

    if(!response.ok) {
        throw new Error(responseBody.message)
    }

    return responseBody
}