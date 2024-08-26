import { Request, Response } from "express";
import { IUser } from "../models/types";
import {
  ENTITY_NOT_FOUND_ERROR,
  ENTITY_UPDATE_ERROR,
} from "../messages/errorMessage";
import {
  insertUser,
  findUserByIdAndUpdate,
  findUserByEmail,
  findUserById,
  findAllUser,
} from "../service/user.service";
import {
  USER_SIGN_IN,
  ENTITY_CREATED_SUCCESSFULLY,
  ENTITY_UPDATE,
  ENTITY_FETCHED,
} from "../messages/successMessage";

export const userSignUp = async (req: Request, res: Response) => {
  try {
    let userData: IUser = req.body;
    const resp = await insertUser(userData);
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
export const userSignIn = async (req: Request, res: Response) => {
  try {
    let userData: IUser = req.body;
    if (!userData || !userData.email) {
      res.status(400).send({
        message: "Email is missing",
      });
    }
    const resp = await findUserByEmail(userData.email);
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
export const userUpdate = async (req: Request, res: Response) => {
  try {
    let userData: IUser = req.body;
    let { id = "" } = req.params;
    if (!userData || !id) {
      res.status(400).send({
        message: "Id is missing",
        data: {},
      });
    }
    const resp = await findUserByIdAndUpdate(id, userData);
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
export const getUser = async (req: Request, res: Response) => {
  try {
    let { userId = "" } = req.params;
    let resp = null;
    if (userId) {
      resp = await findUserById(userId);
    } else {
      resp = await findAllUser();
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
