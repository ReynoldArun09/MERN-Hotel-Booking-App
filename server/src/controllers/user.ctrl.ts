import AsyncWrapper from "../utils/AsyncWrapper";
import { Request, Response } from "express";
import User from "../models/user";
import AppError from "../utils/AppError";
import { ErrorMessage, HttpStatusCode, SuccessMessage } from "../helper/Enum";
import jwt from 'jsonwebtoken'

export const RegisterUser = AsyncWrapper(
  async (req: Request, res: Response) => {
    const {email} = req.body

    const checkIfExist = await User.findOne({email})

    if(checkIfExist) {
      throw new AppError(ErrorMessage.USER_ALREADY_EXIST, HttpStatusCode.BAD_REQUEST)
    }
    const user = new User(req.body)
    const savedUser = await user.save()

    const token = jwt.sign({userId: savedUser._id}, process.env.SECRET as string, {
      expiresIn: '1h'
    })

    res.cookie('booking.com', token, {
      httpOnly: true,
      maxAge: 86400000,
      secure: false
    })

    return res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: SuccessMessage.USER_REGISTERED
    })
  }
);
