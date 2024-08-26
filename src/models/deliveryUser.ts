import mongoose from "mongoose";
const Schema = mongoose.Schema;

const DeliveryUserSchema = new Schema({
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
  },
});

export default DeliveryUserSchema;
