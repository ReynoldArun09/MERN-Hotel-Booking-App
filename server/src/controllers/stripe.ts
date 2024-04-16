import Stripe from "stripe"
import AsyncWrapper from "../utils/AsyncWrapper"
import {Request, Response} from 'express'
import Hotel from "../models/hotel"
import { BookingType, PaymnetIntentResponse } from "../../types.def"

const stripe = new Stripe(process.env.STRIPE_API_KEY)


export const BookingPaymentIntent = AsyncWrapper(async(req:Request, res:Response) => {
    const {hotelId} = req.params
    const {numberOfNights}  = req.body
    console.log('testing')

    const hotel = await Hotel.findById(hotelId)
    if(!hotel) {
        return res.status(404).json({
            message: "Hotel not found"
        })
    }

    const totalCost = hotel.pricePerNight * numberOfNights;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalCost,
        currency: "inr",
        metadata: {
            userId: req.userId,
            hotelId
        }
    })

    if(!paymentIntent.client_secret) {
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
    const response: PaymnetIntentResponse = {
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret.toString(),
        totalCost
    }
    console.log(response)
    return res.status(200).json(response)

})

export const Bookings = AsyncWrapper(async(req:Request, res:Response) => {
    console.log('testing1')
    const paymentIntentId = req.body.paymentIntentId
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId as string)

    if(!paymentIntent) {
        return res.status(400).json({
            message: "Invalid payment intent"
        })
    }

    if(paymentIntent.metadata.hotelId !== req.params.hotelId ||
        paymentIntent.metadata.userId !== req.userId) {
          return res.status(400).json({message: "Something went wrong"})
        }

    if(paymentIntent.status!== "succeeded") {
        return res.status(400).json({
            message: "Payment not succeeded"
        })
    }

    const newBooking: BookingType = {
        ...req.body,
        userId: req.userId
      
    }

    const hotel = await Hotel.findOneAndUpdate({_id:req.params.hotelId}, {
        $push: {
            bookings: newBooking
        }
    })

    if(!hotel) {
        return res.status(404).json({
            message: "Hotel not found"
        })
    }
   console.log('testing here1')
    await hotel.save()
    res.status(200).send()

})