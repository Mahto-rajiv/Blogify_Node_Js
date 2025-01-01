import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Todo - Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// Todo - Verify transporter configuration
const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log("SMTP connection established successfully");
  } catch (error) {
    console.error("Error establishing SMTP connection:", error);
    throw error;
  }
};

export default { transporter, verifyTransporter };
