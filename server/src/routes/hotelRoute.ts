import {Router} from 'express'
import multer from 'multer';
import { AuthMiddleware } from '../middleware/AuthMiddleware';
import { CreateHotel, GetAllHotels, GetAllUserHotels, GetHotelById, GetUserHotelById, MyBookings, UpdateHotel } from '../controllers/hotel.ctrl';
import { SeachHotels } from '../controllers/search.ctrl';
import { BookingPaymentIntent, Bookings } from '../controllers/stripe';

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
hotelRoutes.put("/:hotelId", AuthMiddleware, upload.array("imageFiles"), UpdateHotel);
hotelRoutes.get("/user/:id", AuthMiddleware, GetUserHotelById);
hotelRoutes.get("/:id", GetHotelById);
hotelRoutes.post("/:hotelId/bookings/payment-intent", AuthMiddleware, BookingPaymentIntent);
hotelRoutes.post("/:hotelId/bookings", AuthMiddleware, Bookings);
hotelRoutes.post("/mybookings", AuthMiddleware, MyBookings);


export default hotelRoutes