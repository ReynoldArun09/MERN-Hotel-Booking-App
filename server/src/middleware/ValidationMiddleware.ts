import { Request, Response, NextFunction } from "express";

export const ValidationMiddleware =
  (schema: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parse({
        body: req.body,
      });
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  };


