import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY;

export const generateToken = (user) => {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    role: user.role,
  };

  return jwt.sign(payload, secretKey);
};

export const validateToken = (token) => {
  try {
    if (!token) return null;
    return jwt.verify(token, secretKey);
  } catch (error) {
    console.error("Token validation error:", error.message);
    return null;
  }
};
