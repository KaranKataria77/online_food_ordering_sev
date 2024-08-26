import { model } from "mongoose";
import {
  IUserDocument,
  IRestaurantDocument,
  IFoodItemDocument,
  IUserModel,
  IFoodItemModel,
  IRestaurantModel,
  IDeliveryUserModel,
  IDeliveryUserDocument,
  IOrderDocument,
  IOrderModel,
  ICartDocument,
  ICartModel,
} from "./types";
import UserSchema from "./user";
import FoodItemSchema from "./foodItem";
import RestaurantSchema from "./restaurant";
import DeliveryUserSchema from "./deliveryUser";
import OrderSchema from "./order";
import CartSchema from "./cart";

export const UserModel = model<IUserDocument, IUserModel>("User", UserSchema);
export const DeliveryUserModel = model<
  IDeliveryUserDocument,
  IDeliveryUserModel
>("DeliveryUser", DeliveryUserSchema);
export const RestaurantModel = model<IRestaurantDocument, IRestaurantModel>(
  "Restaurant",
  RestaurantSchema
);
export const FoodItemModel = model<IFoodItemDocument, IFoodItemModel>(
  "FoodItem",
  FoodItemSchema
);
export const OrderModel = model<IOrderDocument, IOrderModel>(
  "Order",
  OrderSchema
);
export const CartModel = model<ICartDocument, ICartModel>(
  "Cart",
  CartSchema
);
