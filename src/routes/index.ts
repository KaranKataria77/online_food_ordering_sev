import { Router } from "express";

const router = Router();

import UserRouter from "./user";
import RestaurantRouter from "./restaurant";
import FoodItemRouter from "./foodItem";
import OrderRouter from "./order";
import CartRouter from "./cart";

router.use("/user", UserRouter);
router.use("/order", OrderRouter);
router.use("/cart", CartRouter);
router.use("/restaurant", RestaurantRouter);
router.use("/food-item", FoodItemRouter);

export default router;
