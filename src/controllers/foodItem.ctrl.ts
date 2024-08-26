import { Router, Request, Response } from "express";
import { IFoodItem } from "../models/types";
import {
  ENTITY_NOT_FOUND_ERROR,
  ENTITY_ALREADY_EXIST_ERROR,
  DB_ERROR,
  ENTITY_UPDATE_ERROR,
} from "../messages/errorMessage";
import {
  USER_SIGN_IN,
  ENTITY_CREATED_SUCCESSFULLY,
  ENTITY_UPDATE,
  ENTITY_FETCHED,
} from "../messages/successMessage";
import {
  insertFoodItem,
  findFoodItemByIdAndUpdate,
  findAllFoodItems,
  findFoodItemById,
  findFoodItemByRestaurantId,
} from "../service/foodItem.service";

export const createNewFoodItem = async (req: Request, res: Response) => {
  try {
    let foodItemData: IFoodItem = req.body;
    const resp = await insertFoodItem(foodItemData);
    res.status(200).send({
      message: ENTITY_CREATED_SUCCESSFULLY("Food Item"),
      data: resp,
    });
  } catch (e) {
    res.status(400).send({
      message: e,
      data: {},
    });
  }
};
export const foodItemUpdate = async (req: Request, res: Response) => {
  try {
    let foodItemData: IFoodItem = req.body;
    let { foodItemId = "" } = req.params;
    if (!foodItemId) {
      res.status(400).send({
        message: "Id is missing",
        data: {},
      });
    }
    const resp = await findFoodItemByIdAndUpdate(foodItemId, foodItemData);
    if (!resp.foodItem) {
      res.status(400).send({
        message: ENTITY_UPDATE_ERROR("Food Item"),
        data: {},
      });
    } else {
      res.status(200).send({
        message: ENTITY_UPDATE("Food Item"),
        data: resp,
      });
    }
  } catch (e) {
    res.status(400).send({
      message: e,
      data: {},
    });
  }
};
export const getFoodItem = async (req: Request, res: Response) => {
  try {
    let { foodItemId = "" } = req.params;
    let resp = null;
    if (foodItemId) {
      resp = await findFoodItemById(foodItemId);
    } else {
      resp = await findAllFoodItems();
    }
    if (!resp || !resp.foodItem) {
      res.status(400).send({
        message: ENTITY_NOT_FOUND_ERROR("Food Item"),
        data: {},
      });
    } else {
      res.status(200).send({
        message: ENTITY_FETCHED("Food Item"),
        data: resp,
      });
    }
  } catch (e) {
    res.status(400).send({
      message: e,
      data: {},
    });
  }
};
export const getFoodItemsOfRestaurant = async (req: Request, res: Response) => {
  try {
    let { restaurantId = "" } = req.params;
    let resp = await findFoodItemByRestaurantId(restaurantId);
    if (!resp || !resp.foodItems) {
      res.status(400).send({
        message: ENTITY_NOT_FOUND_ERROR("Food Item"),
        data: {},
      });
    } else {
      res.status(200).send({
        message: ENTITY_FETCHED("Food Item"),
        data: resp,
      });
    }
  } catch (e) {
    res.status(400).send({
      message: e,
      data: {},
    });
  }
};
