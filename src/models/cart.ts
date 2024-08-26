import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant" },
  foodItems: { type: [{ type: Schema.Types.ObjectId, ref: "FoodItem" }] },
  location: {
    type: [Number],
  },
  isCartActive: { type: Boolean },
});

export default CartSchema;
