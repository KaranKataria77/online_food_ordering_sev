import { IRestaurant, IUser } from "../models/types/index";
import { Request, Response, NextFunction } from "express";

export const userValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let userData: IUser = req.body;
  if (!userData || !userData.email || !userData.name || !userData.mobile_no) {
    res.status(400).send({
      message: "Fields are missing",
      data: {},
    });
  } else {
    next();
  }
};
export const restaurantValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let userData: IRestaurant = req.body;
  if (!userData || !userData.type || !userData.name) {
    res.status(400).send({
      message: "Fields are missing",
      data: {},
    });
  } else {
    next();
  }
};
