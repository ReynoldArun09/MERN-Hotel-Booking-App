import { Router } from "express";
import { LoginUser, LogoutUser, RegisterUser } from "../controllers/user.ctrl";

const userRouter = Router();

userRouter.post('/register-user', RegisterUser)
userRouter.post('/login-user', LoginUser)
userRouter.post('/logout-user', LogoutUser)


export default userRouter;