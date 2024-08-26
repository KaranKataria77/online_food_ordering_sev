import { CartModel, FoodItemModel } from "../models";
import { ICart, IFoodItem } from "../models/types";

export const insertCartOrder = async (cartData: ICart) => {
  try {
    const newEntity = new CartModel(cartData);
    const createNewEntity = await newEntity.save();
    return createNewEntity;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const fetchActiveCart = async (userId: string) => {
  try {
    const cartData: {} = await CartModel.find({ userId, isCartActive: true });
    return cartData;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const fetchActiveCartFoodItems = async (userId: string) => {
  try {
    let cartData = (await CartModel.find({
      userId,
      isCartActive: true,
    })) as ICart[];
    const foodItems = await FoodItemModel.find({
      _id: { $in: cartData[0].foodItems },
    });
    cartData[0].foodItems = foodItems as unknown as [string];
    return cartData;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const modifyCartStatus = async (userId: string) => {
  try {
    const cartData = await CartModel.findOneAndUpdate(
      { userId },
      { isCartActive: false }
    );
    return cartData;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const addFoodItems = async (userId: string, foodItems: string[]) => {
  try {
    const cartData = await CartModel.findOneAndUpdate(
      { userId },
      { $addToSet: { foodItems: { $each: foodItems } } }
    );
    return cartData;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const fetchFoodItems = async (foodItemIds: string[]) => {
  try {
    const cartData = await FoodItemModel.find({
      _id: { $in: foodItemIds },
    });
    return cartData;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
