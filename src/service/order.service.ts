import { OrderModel, RestaurantModel, UserModel } from "../models";
import { IOrder, IRestaurant } from "../models/types";

export const insertNewOrder = async (orderData: IOrder, userId: string) => {
  try {
    const newEntity = new OrderModel(orderData);
    const createNewEntity = await newEntity.save();
    const updateUserOrder = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { orders: { $each: [createNewEntity._id] } } }
    );
    console.log(
      "!!!!!!!!!!!!!!! updated user !!!!!!!!!!!!!!!!!!!",
      updateUserOrder,
      userId
    );
    return createNewEntity;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
