import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile_no: {
    type: Number,
    unique: true,
    required: true,
  },
  restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant" },
  location: {
    type: [Number],
  },
  orders: { type: [{ type: Schema.Types.ObjectId, ref: "Order" }] },
});

export default UserSchema;
