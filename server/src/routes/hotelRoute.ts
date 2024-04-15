import {Router} from 'express'
import multer from 'multer';
import { AuthMiddleware } from '../middleware/AuthMiddleware';
import { CreateHotel } from '../controllers/hotel.ctrl';

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const hotelRoutes = Router()

hotelRoutes.post('/add', AuthMiddleware, upload.array("imageFiles", 6), CreateHotel)

export default hotelRoutes