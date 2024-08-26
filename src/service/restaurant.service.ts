import { FoodItemModel, RestaurantModel } from "../models";
import { IRestaurant } from "../models/types";

export const insertRestaurant = async (restaurantData: IRestaurant) => {
  try {
    const newEntity = new RestaurantModel(restaurantData);
    const createNewEntity = await newEntity.save();
    return createNewEntity;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const findRestaurantByIdAndUpdate = async (
  restaurantId: string,
  updatedRestaurant: IRestaurant
) => {
  try {
    const findExistingEntity = await RestaurantModel.findByIdAndUpdate(
      { _id: restaurantId },
      updatedRestaurant
    );
    return { restaurant: findExistingEntity };
  } catch (err) {
    throw err;
  }
};
export const findRestaurantByIdAndAddFoodItem = async (
  restaurantId: string,
  foodItemId: string
) => {
  try {
    const findExistingEntity = await RestaurantModel.updateOne(
      { _id: restaurantId },
      { $push: { foodItems: { $each: [foodItemId] } } }
    );
    return { restaurant: findExistingEntity };
  } catch (err) {
    throw err;
  }
};
export const findRestaurantById = async (restaurantId: string) => {
  try {
    let findExistingEntity = await RestaurantModel.findById({
      _id: restaurantId,
    });
    const foodItems = await FoodItemModel.find({
      _id: { $in: findExistingEntity?.foodItems },
    });
    if (findExistingEntity) {
      findExistingEntity.foodItems = foodItems;
    }
    return { restaurant: findExistingEntity };
  } catch (err) {
    throw err;
  }
};
export const findAllRestaurants = async () => {
  try {
    const findExistingEntity = await RestaurantModel.find();
    return { restaurant: findExistingEntity };
  } catch (err) {
    throw err;
  }
};
