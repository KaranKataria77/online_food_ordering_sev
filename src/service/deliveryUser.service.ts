import { UserModel, DeliveryUserModel } from "../models";
import { IUser, IUserModel, IDeliveryUser } from "../models/types";
import jwt from "jsonwebtoken";

export const insertDeliveryUser = async (userData: IDeliveryUser) => {
  try {
    const newEntity = new DeliveryUserModel(userData);
    const createNewEntity = await newEntity.save();
    return createNewEntity;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const findDeliveryUserByEmail = async (userEmail: string) => {
  try {
    const existingEntity = await DeliveryUserModel.findOne({
      email: userEmail,
    });
    let token = null;
    if (existingEntity) {
      const key = process.env.JWT_SECRET_KEY;
      token = jwt.sign({ id: existingEntity._id }, key as string);
    }
    return { user: existingEntity, token };
  } catch (err) {
    throw err;
  }
};
export const findDeliveryUserByIdAndUpdate = async (
  userId: string,
  updatedUser: IUser
) => {
  try {
    const findExistingEntity = await DeliveryUserModel.findByIdAndUpdate(
      { _id: userId },
      updatedUser
    );
    return { user: findExistingEntity };
  } catch (err) {
    throw err;
  }
};
export const findDeliveryUserById = async (userId: string) => {
  try {
    const findExistingEntity = await DeliveryUserModel.findById({
      _id: userId,
    });
    return { user: findExistingEntity };
  } catch (err) {
    throw err;
  }
};
export const findAllDeliveryUsers = async () => {
  try {
    const findExistingEntity = await DeliveryUserModel.find();
    return { user: findExistingEntity };
  } catch (err) {
    throw err;
  }
};
