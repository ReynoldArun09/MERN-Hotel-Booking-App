import { Request, Response } from "express";
import AsyncWrapper from "../utils/AsyncWrapper";
import { HotelModeltype } from "../../types.def";
import uploadImages from "./uploadImages";
import Hotel from "../models/hotel";

export const CreateHotel = AsyncWrapper(async (req: Request, res: Response) => {
  const imageFiles = req.files as Express.Multer.File[];
  const newHotel: HotelModeltype = req.body;
  const imageUrls = await uploadImages(imageFiles);

  newHotel.imageUrls = imageUrls;
  newHotel.lastUpdated = new Date();
  newHotel.userId = req?.userId;

  const hotel = new Hotel(newHotel);
  await hotel.save();

  res.status(200).json({success: true, data: hotel})
});

export const GetAllHotels = AsyncWrapper(
    async (req: Request, res: Response) => {
      const hotels = await Hotel.find().sort("-lastUpdated");
      res.json(hotels);
    }
);

export const GetAllUserHotels = AsyncWrapper(
  async (req: Request, res: Response) => {
    const hotels = await Hotel.find({ userId: req?.userId })
    res.json(hotels);
  }
);
