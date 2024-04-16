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

export const UpdateHotel = AsyncWrapper(async (req: Request, res: Response) => {

  const updatedHotel: HotelModeltype = req.body;
  updatedHotel.lastUpdated = new Date();

  const hotel = await Hotel.findOneAndUpdate(
    {
      _id: req.params.hotelId,
      userId: req.userId,
    },
    updatedHotel,
    { new: true }
  );

  if (!hotel) {
    return res.status(404).json({ message: "Hotel not found" });
  }

  const files = req.files as Express.Multer.File[];
  const updatedImageUrls = await uploadImages(files);

  hotel.imageUrls = [
    ...updatedImageUrls,
    ...(updatedHotel.imageUrls || []),
  ];

  await hotel.save();
  res.status(201).json(hotel);

})

export const GetUserHotelById = AsyncWrapper(
  async (req: Request, res: Response) => {
    const id = req.params.id.toString();
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });
    res.json(hotel);
  }
);

export const GetHotelById = AsyncWrapper(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const hotel = await Hotel.findById(id);
    res.json(hotel);
  }
);
