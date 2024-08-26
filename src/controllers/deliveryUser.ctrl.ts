import { Router, Request, Response } from "express";
import { IUser, IDeliveryUser } from "../models/types";
import { UserModel, DeliveryUserModel } from "../models/index";
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
  insertDeliveryUser,
  findDeliveryUserByEmail,
  findDeliveryUserById,
  findAllDeliveryUsers,
  findDeliveryUserByIdAndUpdate,
} from "../service/deliveryUser.service";

export const deliveryUserSignUp = async (req: Request, res: Response) => {
  try {
    let userData: IUser = req.body;
    const resp = await insertDeliveryUser(userData);
    res.status(200).send({
      message: ENTITY_CREATED_SUCCESSFULLY("User"),
      data: resp,
    });
  } catch (e) {
    res.status(400).send({
      message: e,
      data: {},
    });
  }
};
export const deliveryUserSignIn = async (req: Request, res: Response) => {
  try {
    let userData: IUser = req.body;
    if (!userData || !userData.email) {
      res.status(400).send({
        message: "Email is missing",
      });
    }
    const resp = await findDeliveryUserByEmail(userData.email);
    if (!resp.user) {
      res.status(400).send({
        message: ENTITY_NOT_FOUND_ERROR("User"),
        data: {},
      });
    } else {
      res.status(200).send({
        message: USER_SIGN_IN,
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
export const deliveryUserUpdate = async (req: Request, res: Response) => {
  try {
    let userData: IUser = req.body;
    let { id = "" } = req.params;
    if (!userData || !id) {
      res.status(400).send({
        message: "Id is missing",
        data: {},
      });
    }
    const resp = await findDeliveryUserByIdAndUpdate(id, userData);
    if (!resp.user) {
      res.status(400).send({
        message: ENTITY_UPDATE_ERROR("User"),
        data: {},
      });
    } else {
      res.status(200).send({
        message: ENTITY_UPDATE("User"),
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
export const getDeliveryUser = async (req: Request, res: Response) => {
  try {
    let { userId = "" } = req.params;
    let resp = null;
    if (userId) {
      resp = await findDeliveryUserById(userId);
    } else {
      resp = await findAllDeliveryUsers();
    }
    if (!resp || !resp.user) {
      res.status(400).send({
        message: ENTITY_NOT_FOUND_ERROR("User"),
        data: {},
      });
    } else {
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
