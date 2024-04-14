import { Router } from "express";
import { LoginUser, RegisterUser } from "../controllers/user.ctrl";

const userRouter = Router();

userRouter.post('/register-user', RegisterUser)
userRouter.post('/login-user', LoginUser)


export default userRouter;