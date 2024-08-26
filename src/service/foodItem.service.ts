import { RestaurantModel, FoodItemModel } from "../models";
import { IRestaurant, IFoodItem } from "../models/types";

export const insertFoodItem = async (foodItemData: IFoodItem) => {
  try {
    const newEntity = new FoodItemModel(foodItemData);
    const createNewEntity = await newEntity.save();
    return createNewEntity;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const findFoodItemByIdAndUpdate = async (
  foodItemId: string,
  updateFoodItem: IFoodItem
) => {
  try {
    const findExistingEntity = await RestaurantModel.findByIdAndUpdate(
      { _id: foodItemId },
      updateFoodItem
    );
    return { foodItem: findExistingEntity };
  } catch (err) {
    throw err;
  }
};
export const findFoodItemById = async (foodItemId: string) => {
  try {
    const findExistingEntity = await FoodItemModel.findById({
      _id: foodItemId,
    });
    return { foodItem: findExistingEntity };
  } catch (err) {
    throw err;
  }
};
export const findFoodItemByRestaurantId = async (restaurantId: string) => {
  try {
    const findExistingEntity = await FoodItemModel.find({
      restaurantId,
    });
    return { foodItems: findExistingEntity };
  } catch (err) {
    throw err;
  }
};
export const findAllFoodItems = async () => {
  try {
    const findExistingEntity = await FoodItemModel.find();
    return { foodItem: findExistingEntity };
  } catch (err) {
    throw err;
  }
};
