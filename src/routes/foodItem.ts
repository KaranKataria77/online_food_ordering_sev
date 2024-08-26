import { Router, Request, Response } from "express";
import {
  createNewFoodItem,
  foodItemUpdate,
  getFoodItem,
  getFoodItemsOfRestaurant,
} from "../controllers/foodItem.ctrl";
import { checkToken } from "../middleware/auth";

const router = Router();

// create new foodItem
router.post("/create", checkToken, createNewFoodItem);

// update food item
router.put("/:foodItemId", checkToken, foodItemUpdate);

// get all food items for developer purpose
router.get(["/", "/:foodItemId"], checkToken, getFoodItem);

// get all food items of particular restaurant
router.get("/restaurant/:restaurantId", checkToken, getFoodItemsOfRestaurant);

export default router;
