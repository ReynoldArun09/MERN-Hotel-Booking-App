import { Router } from "express";
import { LoginUser, LogoutUser, RegisterUser, ValidateUser } from "../controllers/user.ctrl";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

const userRouter = Router();

userRouter.post('/register-user', RegisterUser)
userRouter.post('/login-user', LoginUser)
userRouter.post('/logout-user', LogoutUser)
userRouter.get('/validate-user', AuthMiddleware, ValidateUser)


export default userRouter;