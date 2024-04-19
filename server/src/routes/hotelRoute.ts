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

hotelRoutes.get("/mybookings", AuthMiddleware, MyBookings);
hotelRoutes.get('/search', SeachHotels)
hotelRoutes.get('/', GetAllHotels)
hotelRoutes.get('/users', AuthMiddleware, GetAllUserHotels)
hotelRoutes.get("/:id", GetHotelById);
hotelRoutes.post('/add', AuthMiddleware, upload.array("imageFiles", 6), CreateHotel)
hotelRoutes.get("/user/:id", AuthMiddleware, GetUserHotelById);
hotelRoutes.put("/:hotelId", AuthMiddleware, upload.array("imageFiles"), UpdateHotel);
hotelRoutes.post("/:hotelId/bookings", AuthMiddleware, Bookings);
hotelRoutes.post("/:hotelId/bookings/payment-intent", AuthMiddleware, BookingPaymentIntent);




export default hotelRoutes