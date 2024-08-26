import { Router } from "express";
import { restaurantValidator } from "../middleware/validator";
import { checkToken } from "../middleware/auth";
import { createNewOrder } from "../controllers/order.ctrl";

const router = Router();

// sign up or create new order
router.post("/create/:userId", createNewOrder);

export default router;
