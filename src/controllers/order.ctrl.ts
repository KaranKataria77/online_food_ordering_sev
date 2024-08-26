import { Router, Request, Response } from "express";
import { IUser, IRestaurant, IFoodItem, IOrder } from "../models/types";
import {
  ENTITY_NOT_FOUND_ERROR,
  ENTITY_ALREADY_EXIST_ERROR,
  DB_ERROR,
  ENTITY_UPDATE_ERROR,
} from "../messages/errorMessage";
import {
  insertRestaurant,
  findRestaurantByIdAndUpdate,
  findRestaurantById,
  findAllRestaurants,
  findRestaurantByIdAndAddFoodItem,
} from "../service/restaurant.service";
import {
  USER_SIGN_IN,
  ENTITY_CREATED_SUCCESSFULLY,
  ENTITY_UPDATE,
  ENTITY_FETCHED,
} from "../messages/successMessage";
import { s3 } from "../config/aws";
import { v4 as uuidv4 } from "uuid";
import { insertNewOrder } from "../service/order.service";

export const createNewOrder = async (req: Request, res: Response) => {
  try {
    let { userId } = req.params;
    let orderData: IOrder = req.body;
    const resp = await insertNewOrder(orderData, userId);
    res.status(200).send({
      message: ENTITY_CREATED_SUCCESSFULLY("Order"),
      data: resp,
    });
  } catch (e) {
    res.status(400).send({
      message: e,
      data: {},
    });
  }
};
