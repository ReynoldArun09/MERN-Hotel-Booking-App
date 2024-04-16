
import { BASE_URL } from "@/main"
import { BookingFormData, PaymnetIntentResponse, UserType } from "@/types.def"


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
  
    if (!response.ok) {
      throw new Error("Error fetching payment intent");
    }
  
    return response.json();
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
  
    if (!response.ok) {
      throw new Error("Error booking room");
    }
  };

  export const MyBooking = async() => {
    const response = await fetch(`${BASE_URL}/hotel/mybookings`, {
        credentials: "include"
    })
    if(!response.ok) {
        throw new Error(response.statusText)
    }

    const responseBody = response.json()
    return responseBody
}