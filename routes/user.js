import {
  registerNewUser,
  verifyOTP,
  resendOTP,
  login,
  logout,
} from "../controllers/user.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/register", registerNewUser);
userRouter.post("/verify-otp", verifyOTP);
userRouter.post("/resend-otp", resendOTP);
userRouter.post("/login", login);
userRouter.get("/logout", logout);

export default userRouter;
