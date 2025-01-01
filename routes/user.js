import {
  registerNewUser,
  verifyOTP,
  resendOTP,
  login,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/user.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/register", registerNewUser);
userRouter.post("/verify-otp", verifyOTP);
userRouter.post("/resend-otp", resendOTP);
userRouter.post("/login", login);
userRouter.get("/logout", logout);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);

export default userRouter;
