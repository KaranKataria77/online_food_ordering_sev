import mongoose from "mongoose";

const databaseURL = process.env.MONGO_URL ?? "";

const setupDB = async () => {
  try {
    // connect to mongodb
    mongoose
      .connect(databaseURL)
      .then(() => {
        console.log("MongoDB connected");
      })
      .catch((e) => console.log(e));
  } catch (e) {
    console.log("error while connecting to mongodb ", e);
    return null;
  }
};

export default setupDB;
