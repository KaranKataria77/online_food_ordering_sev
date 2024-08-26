import { Router } from "express";
import { checkToken } from "../middleware/auth";
import {
  createNewCart,
  getActiveCart,
  deactivateCart,
  appendFoodItems,
  getAllFoodItems,
  getActiveCartFoodItems,
} from "../controllers/cart.ctrl";

const router = Router();

// sign up or create new cart
router.post("/create", createNewCart);

// get active cart
router.get("/:userId", getActiveCart);

// get active cart
router.get("/food-items/", getActiveCartFoodItems);

// deactivate active cart
router.patch("/deactivate", deactivateCart);

// append food items
router.patch("/add-food-items", appendFoodItems);

// get all food items detail
router.get("/all-food-items/:userId", getAllFoodItems);

export default router;
