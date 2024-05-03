import Stripe from "stripe";
import AsyncWrapper from "../utils/AsyncWrapper";
import { Request, Response } from "express";
import Hotel from "../models/hotel";
import { BookingType, PaymnetIntentResponse } from "../types.def";
import { ErrorMessage, HttpStatusCode } from "../helper/Enum";

const stripe = new Stripe(process.env.STRIPE_API_KEY);

export const BookingPaymentIntent = AsyncWrapper(async (req: Request, res: Response) => {
  const hotelId = req.params.hotelId;
  const { numberOfNights } = req.body;

  const hotel = await Hotel.findById(hotelId);
  if (!hotel) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ message: ErrorMessage.HOTEL_NOT_FOUND });
  }

  const totalCost = hotel.pricePerNight * numberOfNights;

  const paymentIntent = await stripe.paymentIntents.create({
    description: "Booking.com",
    amount: totalCost * 100,
    currency: "inr",
    metadata: {
      hotelId,
      userId: req.userId,
    },
    payment_method_types: ["card"],
  });

  if (!paymentIntent.client_secret) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
  const response: PaymnetIntentResponse = {
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret.toString(),
    totalCost,
  };

  return res.status(200).json(response);
});

export const Bookings = AsyncWrapper(async (req: Request, res: Response) => {
  const paymentIntentId = req.body.paymentIntentId;
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId as string);

  if (!paymentIntent) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ message: ErrorMessage.INVALID_PAYMENT_INTENT });
  }

  if (paymentIntent.metadata.hotelId !== req.params.hotelId || paymentIntent.metadata.userId !== req.userId) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ message: ErrorMessage.INVALID_PAYMENT_INTENT });
  }

  if (paymentIntent.status !== "succeeded") {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ message: ErrorMessage.PAYMENT_FAILED });
  }

  const newBooking: BookingType = {
    ...req.body,
    userId: req.userId,
  };

  const hotel = await Hotel.findOneAndUpdate(
    { _id: req.params.hotelId },
    {
      $push: {
        bookings: newBooking,
      },
    }
  );

  if (!hotel) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ message: ErrorMessage.HOTEL_NOT_FOUND });
  }

  await hotel.save();
  res.status(200).json({ message: "payment success" });
});
