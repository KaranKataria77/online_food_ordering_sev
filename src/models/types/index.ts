import { Document, Model } from "mongoose";

// interfaces
export interface IUser {
  name: string;
  email: string;
  mobile_no: number;
  restaurantId?: string;
  location?: [number];
  orders: [string];
}
export interface IDeliveryUser {
  name: string;
  email: string;
  mobile_no: number;
}
export interface IRestaurant {
  name: string;
  type: string[];
  foodItems?: IFoodItem[];
  GSTNo: string;
}
export interface IFoodItem {
  name: string;
  type: string[];
  restaurantId: string;
  price: number;
  imageUrl: string;
}
export interface ICart {
  userId: string;
  foodItems: [string];
  restaurantId: string;
  location?: [number];
  isCartActive: boolean;
}
export interface IOrder {
  cartId: string;
  isOrderDelivered: boolean;
}

// documents
export interface IUserDocument extends IUser, Document {}
export interface IDeliveryUserDocument extends IDeliveryUser, Document {}
export interface IRestaurantDocument extends IRestaurant, Document {}
export interface IFoodItemDocument extends IFoodItem, Document {}
export interface IOrderDocument extends IOrder, Document {}
export interface ICartDocument extends ICart, Document {}

// models
export interface IUserModel extends Model<IUserDocument> {}
export interface IDeliveryUserModel extends Model<IDeliveryUserDocument> {}
export interface IRestaurantModel extends Model<IRestaurantDocument> {}
export interface IFoodItemModel extends Model<IFoodItemDocument> {}
export interface IOrderModel extends Model<IOrderDocument> {}
export interface ICartModel extends Model<ICartDocument> {}
