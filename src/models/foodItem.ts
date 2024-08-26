import mongoose from "mongoose";
const Schema = mongoose.Schema;

const FoodItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  type: {
    type: [String],
  },
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: "restaurant",
  },
  imageUrl: { type: String },
});

export default FoodItemSchema;
