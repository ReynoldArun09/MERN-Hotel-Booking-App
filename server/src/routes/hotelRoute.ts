import {Router} from 'express'
import multer from 'multer';
import { AuthMiddleware } from '../middleware/AuthMiddleware';
import { CreateHotel, GetAllHotels, GetAllUserHotels } from '../controllers/hotel.ctrl';
import { SeachHotels } from '../controllers/search.ctrl';

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const hotelRoutes = Router()

hotelRoutes.get('/search', SeachHotels)
hotelRoutes.get('/', GetAllHotels)
hotelRoutes.post('/add', AuthMiddleware, upload.array("imageFiles", 6), CreateHotel)
hotelRoutes.get('/users', AuthMiddleware, GetAllUserHotels)

export default hotelRoutes