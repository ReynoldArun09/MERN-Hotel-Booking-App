import { z } from "zod";

export const env = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.string().min(1).max(4),
  MONGO_URI: z.string().min(1),
  ORIGIN: z.string().min(1),
  SECRET: z.string().min(1),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
  STRIPE_API_KEY: z.string().min(1),
});

declare global {
  namespace NodeJS {
    export interface ProcessEnv extends z.infer<typeof env> {}
  }
}

declare global {
  namespace Express {
    interface Request {
      userId: string
    }
  }
}

export type UserModelType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type HotelModeltype = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
};