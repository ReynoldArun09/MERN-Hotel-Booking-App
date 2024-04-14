import { Router } from "express";
import { RegisterUser } from "../controllers/user.ctrl";

const userRouter = Router();

userRouter.post('/register-user', RegisterUser)


export default userRouter;