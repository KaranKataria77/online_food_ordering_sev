import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  name: { type: String },
  type: { type: [String] },
  GSTNo: {
    type: String,
  },
  foodItems: { type: [{ type: Schema.Types.ObjectId, ref: "FoodItem" }] },
});

export default RestaurantSchema;
