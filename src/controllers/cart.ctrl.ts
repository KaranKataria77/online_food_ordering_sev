import { Router, Request, Response } from "express";
import { ICart } from "../models/types";
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
  insertCartOrder,
  fetchActiveCart,
  modifyCartStatus,
  addFoodItems,
  fetchFoodItems,
  fetchActiveCartFoodItems,
} from "../service/cart.service";

export const createNewCart = async (req: Request, res: Response) => {
  try {
    let cartData: ICart = req.body;
    const resp = await insertCartOrder(cartData);
    res.status(200).send({
      message: ENTITY_CREATED_SUCCESSFULLY("Cart"),
      data: resp,
    });
  } catch (e) {
    res.status(400).send({
      message: e,
      data: {},
    });
  }
};
export const getActiveCart = async (req: Request, res: Response) => {
  try {
    let userId: string = req.params.userId;
    const resp = await fetchActiveCart(userId);
    res.status(200).send({
      message: "Active Cart",
      data: resp,
    });
  } catch (e) {
    res.status(400).send({
      message: e,
      data: {},
    });
  }
};
export const getActiveCartFoodItems = async (req: Request, res: Response) => {
  try {
    let userId: string = req.params.userId;
    const resp = await fetchActiveCartFoodItems(userId);
    console.log(
      "!!!!!!!!!!!!!!!!!!!!!!!!!!! resp data !!!!!!!!!!!!!!!!! ",
      resp
    );
    res.status(200).send({
      message: "Active Cart",
      data: resp,
    });
  } catch (e) {
    res.status(400).send({
      message: e,
      data: {},
    });
  }
};
export const deactivateCart = async (req: Request, res: Response) => {
  try {
    let userId: string = req.body;
    const resp = await modifyCartStatus(userId);
    res.status(200).send({
      message: ENTITY_CREATED_SUCCESSFULLY("Cart"),
      data: resp,
    });
  } catch (e) {
    res.status(400).send({
      message: e,
      data: {},
    });
  }
};
export const appendFoodItems = async (req: Request, res: Response) => {
  try {
    let { foodItems, userId } = req.body;
    const resp = await addFoodItems(userId, foodItems);
    res.status(200).send({
      message: ENTITY_CREATED_SUCCESSFULLY("Cart"),
      data: resp,
    });
  } catch (e) {
    res.status(400).send({
      message: e,
      data: {},
    });
  }
};
export const getAllFoodItems = async (req: Request, res: Response) => {
  try {
    let { userId } = req.params;
    let activeCart = await fetchActiveCart(userId);
    console.log("********************** ", activeCart);
    // const resp = await fetchFoodItems([]);
    res.status(200).send({
      message: ENTITY_CREATED_SUCCESSFULLY("Cart"),
      data: activeCart,
    });
  } catch (e) {
    res.status(400).send({
      message: e,
      data: {},
    });
  }
};
