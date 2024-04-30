import { useQuery } from "@tanstack/react-query"
import { createPaymentIntent, fetchCurrentUser } from "./_api/BookingApi"
import { useSearchContext } from "@/context/SearchContext"
import { useParams } from "react-router-dom";
import BookingDetailsSummary from "./_components/BookingDetails";
import { fetchMyHotelById } from "../Hotelpage/_api/HotelApi";
import { useEffect, useState } from "react";
import BookingForm from "./_form/BookingForm";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/utils/constants";




export default function Bookingpage() {
  const search = useSearchContext()
  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  const {hotelId} = useParams()


  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);


  const {data:paymentIntentData} = useQuery({
    queryKey: ['paymentIntent'],
    queryFn: () => createPaymentIntent(hotelId as string, numberOfNights.toString()),
    enabled: !!hotelId && numberOfNights > 0
  })

  const {data:currentUser} = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser
  })

  

  const {data: hotel} = useQuery({
    queryKey: ['fetchMyHotels'],
    queryFn: () => fetchMyHotelById(hotelId as string),
    enabled: !!hotelId
  })


  if(!hotel) {
    return <></>
  }

  
  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  )
}
