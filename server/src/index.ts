import { app } from "./app";
import 'dotenv/config'
import AppLogger from "./utils/AppLogger";
import MongoConnection from "./database/MongoConnection";
import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})


const port = process.env.PORT

MongoConnection()
app.listen(port, () => {
  AppLogger.info(`Server started on port ${port}`);
}); 