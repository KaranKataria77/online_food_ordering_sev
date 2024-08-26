import { Router } from "express";
import { checkToken } from "../middleware/auth";
import { userValidator } from "../middleware/validator";
import {
  deliveryUserSignIn,
  deliveryUserSignUp,
  deliveryUserUpdate,
  getDeliveryUser,
} from "../controllers/deliveryUser.ctrl";

const router = Router();

// sign up or create new user
router.post("/signup", userValidator, deliveryUserSignUp);

// sign in
router.put("/signin", deliveryUserSignIn);

// update user
router.post("/update", deliveryUserUpdate);

// get all user for developer purpose, with jwt token authorization
router.get(["/", "/:userId"], getDeliveryUser);

export default router;
