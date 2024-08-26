import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("authorization");
  const key = process.env.JWT_SECRET_KEY;
  try {
    const verify = jwt.verify(token as string, key as string);
    if (verify) {
      return next();
    } else {
      return res.status(400).send({
        message: "Something went wrong while authorization",
      });
    }
  } catch (e) {
    return res.status(401).send({ msg: "Auth failed", error: e });
  }
};
