import { UserModel } from "../models";
import { IUser, IUserModel } from "../models/types";
import jwt from "jsonwebtoken";

export const insertUser = async (userData: IUser) => {
  try {
    const newEntity = new UserModel(userData);
    const createNewEntity = await newEntity.save();
    const key = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ id: createNewEntity._id }, key as string);
    return { user: createNewEntity, token };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const findUserByEmail = async (userEmail: string) => {
  try {
    const existingEntity = await UserModel.findOne({
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
export const findUserByIdAndUpdate = async (
  userId: string,
  updatedUser: IUser
) => {
  try {
    const findExistingEntity = await UserModel.findByIdAndUpdate(
      { _id: userId },
      updatedUser
    );
    return { user: findExistingEntity };
  } catch (err) {
    throw err;
  }
};
export const findUserById = async (userId: string) => {
  try {
    const findExistingEntity = await UserModel.findById({ _id: userId });
    return { user: findExistingEntity };
  } catch (err) {
    throw err;
  }
};
export const findAllUser = async () => {
  try {
    const findExistingEntity = await UserModel.find();
    return { user: findExistingEntity };
  } catch (err) {
    throw err;
  }
};
