import mongoose from "mongoose";

const databaseURL =
  "mongodb+srv://karankataria771801:7718010801@cluster0.tydt9cl.mongodb.net/restaurant?retryWrites=true&w=majority";

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
