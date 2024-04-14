import { NextFunction, Request, Response } from "express";

const AsyncWrapper =
  (fn: CallableFunction) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };

export default AsyncWrapper;
