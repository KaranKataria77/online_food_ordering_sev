import { Router } from "express";
import {
  createNewRestaurant,
  restaurantUpdate,
  getRestaurant,
  uploadImage,
  appendNewFoodItem,
  reviewItem,
} from "../controllers/restaurant.ctrl";
import { restaurantValidator } from "../middleware/validator";
import { checkToken } from "../middleware/auth";
// import { getDataFromCache } from "../config/redisClient";

const router = Router();

// upload image
router.get("/upload", uploadImage);

// sign up or create new restaurant
router.post("/create", checkToken, restaurantValidator, createNewRestaurant);

// update restaurant
router.put("/:restaurantId", checkToken, restaurantUpdate);

// add new food item
router.put("/food-item/:restaurantId", checkToken, appendNewFoodItem);

// get restaurants
router.get(["/", "/:restaurantId"], getRestaurant);

// get restaurants
router.post("/review", reviewItem);

export default router;
