import { ErrorRequestHandler, Response, Request, NextFunction } from "express";
import { ZodError } from "zod";
import AppError from "../utils/AppError";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({ error: 404, message: "Route not found" });
};

const ErrorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  const statusCode = error.statusCode ?? 500;

  if (error instanceof ZodError) {
    return res
      .status(statusCode)
      .json({ success: false, error: error?.flatten().fieldErrors });
  }

  if (error instanceof AppError) {
    return res
      .status(statusCode)
      .json({ success: false, message: error?.message });
  }

  if (error.name === "ValidationError") {
    return res
      .status(statusCode)
      .json({ success: false, message: error.message });
  }
  console.log(error.message)
  res.status(statusCode).send(error.message);
};

export default ErrorMiddleware;