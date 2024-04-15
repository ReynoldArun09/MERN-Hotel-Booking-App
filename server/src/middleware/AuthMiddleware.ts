import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import AppError from '../utils/AppError'
import { ErrorMessage, HttpStatusCode } from '../helper/Enum'



export const AuthMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const token = req.cookies['booking.com']
    if(!token) {
        throw new AppError(ErrorMessage.INVALID_TOKEN, HttpStatusCode.UNAUTHORIZED)
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string)
        req.userId = (decoded as JwtPayload).userId
        next()
    } catch (error) {
        throw new AppError(ErrorMessage.INVALID_TOKEN, HttpStatusCode.UNAUTHORIZED)
    }
}