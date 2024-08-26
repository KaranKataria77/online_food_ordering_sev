import { Router, Request, Response } from "express";
import { IUser, IRestaurant, IFoodItem } from "../models/types";
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
// import { redis } from "../config/redisClient";
import { callMe } from "../utils/promt";

export const createNewRestaurant = async (req: Request, res: Response) => {
  try {
    let restaurantData: IRestaurant = req.body;
    const resp = await insertRestaurant(restaurantData);
    res.status(200).send({
      message: ENTITY_CREATED_SUCCESSFULLY("Restaurant"),
      data: resp,
    });
  } catch (e) {
    res.status(400).send({
      message: e,
      data: {},
    });
  }
};
export const appendNewFoodItem = async (req: Request, res: Response) => {
  try {
    let { restaurantId = "" } = req.params;
    if (!restaurantId) {
      res.status(400).send({
        message: "Id is missing",
        data: {},
      });
    }
    const { foodItemId = "" } = req.body;
    if (!foodItemId) {
      res.status(400).send({
        message: "FoodItem Id is missing",
        data: {},
      });
    }

    const resp = await findRestaurantByIdAndAddFoodItem(
      restaurantId,
      foodItemId
    );
    if (!resp.restaurant) {
      res.status(400).send({
        message: ENTITY_UPDATE_ERROR("Restaurant"),
        data: {},
      });
    } else {
      res.status(200).send({
        message: ENTITY_UPDATE("Restaurant"),
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
export const restaurantUpdate = async (req: Request, res: Response) => {
  try {
    let restaurantData: IRestaurant = req.body;
    let { restaurantId = "" } = req.params;
    if (!restaurantId) {
      res.status(400).send({
        message: "Id is missing",
        data: {},
      });
    }
    const resp = await findRestaurantByIdAndUpdate(
      restaurantId,
      restaurantData
    );
    if (!resp.restaurant) {
      res.status(400).send({
        message: ENTITY_UPDATE_ERROR("Restaurant"),
        data: {},
      });
    } else {
      res.status(200).send({
        message: ENTITY_UPDATE("Restaurant"),
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
export const getRestaurant = async (req: Request, res: Response) => {
  try {
    let { restaurantId = "" } = req.params;
    let resp = null;
    if (restaurantId) {
      resp = await findRestaurantById(restaurantId);
    } else {
      resp = await findAllRestaurants();
    }
    if (!resp || !resp.restaurant) {
      res.status(400).send({
        message: ENTITY_NOT_FOUND_ERROR("User"),
        data: {},
      });
    } else {
      // await redis.set("restaurants", JSON.stringify(resp), "EX", 20);
      res.status(200).send({
        message: ENTITY_FETCHED("User"),
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
export const uploadImage = (req: Request, res: Response) => {
  const key = `123/${uuidv4()}.png`;
  s3.getSignedUrl(
    "putObject",
    {
      Bucket: "swiggy-clone-123",
      ContentType: "image/*",
      Key: key,
    },
    (err: any, url: any) => {
      if (err) {
        res.send({ key, err });
      } else {
        res.send({ key, url });
      }
    }
  );
};

export const reviewItem = async (req: Request, res: Response) => {
  try {
    let { review = "" } = req.body;
    const response = await callMe(review);
    console.log("--------------- ", response);
    res.status(200).send({
      message: "Review for fooditem",
      data: response,
    });
  } catch (e) {
    res.status(400).send({
      message: e,
      data: {},
    });
  }
};
