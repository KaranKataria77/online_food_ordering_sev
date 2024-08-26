import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  cartId: { type: Schema.Types.ObjectId, ref: "Cart" },
  isOrderDelivered: { type: Boolean },
});

export default OrderSchema;
