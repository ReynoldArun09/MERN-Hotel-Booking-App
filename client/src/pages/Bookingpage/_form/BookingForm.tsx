import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSearchContext } from "@/context/SearchContext"
import { BookingFormData, PaymnetIntentResponse, UserType } from "@/types.def"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"

import { StripeCardElement } from "@stripe/stripe-js"
import { toast } from "sonner"
import { createRoomBooking } from "../_api/BookingApi"



type BookingFormProps = {
    currentUser: UserType,
    paymentIntent: PaymnetIntentResponse
}

export default function BookingForm({currentUser, paymentIntent}: BookingFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const search = useSearchContext()
  const {hotelId} = useParams()
  const navigate = useNavigate()


  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });



  const { mutate: bookRoom, isPending } = useMutation({
    mutationFn: createRoomBooking,
    onSuccess: () => {
      toast.success("Room booked successfully")
      navigate("/my-bookings")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };


  return (
    <form className="grid grid-cols-1 gap-5 rounded-lg border-2 p-5" onSubmit={handleSubmit(onSubmit)}>
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <Label>
          FirstName
          <Input
            className="w-full mt-1 border rounded px-3"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
        </Label>
        <Label>
          LastName
          <Input
            className="w-full mt-1 border rounded px-3"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </Label>
        <Label>
          Email
          <Input
            className="w-full mt-1 border rounded px-3"
            type="text"
            readOnly
            disabled
            {...register("email")}
          />
        </Label>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>

        <div className="bg-muted py-4 px-2 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: Rs {paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>

        <div className="space-y-2">
        <h3 className="text-xl font-semibold"> Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        />
      </div>
      <div className="flex justify-end">
        <Button
          disabled={isPending}
          type="submit"
          className="p-2 font-bold text-md disabled:bg-gray-500"
        >
           {isPending ? "Saving..." : "Confirm Booking"}
        </Button>
      </div>
      </div>
    </form>
  )
}
