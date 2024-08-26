import { Router } from "express";
import { checkToken } from "../middleware/auth";
import {
  userSignUp,
  userSignIn,
  userUpdate,
  getUser,
} from "../controllers/user.ctrl";
import { userValidator } from "../middleware/validator";

const router = Router();

// sign up or create new user
router.post("/signup", userValidator, userSignUp);

// sign in
router.post("/signin", userSignIn);

// update user
router.put("/:id", checkToken, userUpdate);

// get all user for developer purpose, with jwt token authorization
router.get(["/", "/:userId"], checkToken, getUser);

export default router;
