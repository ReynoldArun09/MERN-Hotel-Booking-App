import { Router } from "express";
import { GetUser, LoginUser, LogoutUser, RegisterUser, ValidateUser } from "../controllers/user.ctrl";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { ValidationMiddleware } from "../middleware/ValidationMiddleware";
import { LoginSchema, RegisterSchema } from "../helper/schema";

const userRouter = Router();

userRouter.post('/register-user', ValidationMiddleware(RegisterSchema), RegisterUser)
userRouter.post('/login-user', ValidationMiddleware(LoginSchema), LoginUser)
userRouter.post('/logout-user', LogoutUser)
userRouter.get('/validate-user', AuthMiddleware, ValidateUser)
userRouter.get('/me', AuthMiddleware, GetUser)


export default userRouter;