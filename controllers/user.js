import User from "../models/user.model.js";
import mailService from "../utils/mailer.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/auth.js";

const { transporter, verifyTransporter } = mailService;
verifyTransporter();

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const isValidEmail = (email) => {
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  return emailRegex.test(email) && email === email.toLowerCase();
};

export const registerNewUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Server-side email validation
    if (!isValidEmail(email)) {
      return res.render("signup", {
        error: "Invalid email format or contains uppercase letters",
      });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.render("signup", { error: "User already exists" });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Create new user
    user = new User({
      fullName,
      email,
      password,
      otp,
      otpExpires,
    });

    await user.save();

    // Send OTP email
    try {
      await transporter.sendMail({
        to: user.email,
        subject: "Email Verification OTP",
        html: `
            <h1>Email Verification</h1>
            <p>Your OTP for email verification is: <strong>${otp}</strong></p>
            <p>This OTP will expire in 5 minutes.</p>
          `,
      });
    } catch (emailError) {
      // If email fails, delete the user and render error
      await User.findByIdAndDelete(user._id);
      return res.render("signup", {
        error: "Failed to send verification email. Please try again.",
      });
    }

    res.render("verify-otp", { email: user.email });
  } catch (error) {
    res.render("signup", {
      error: "Error registering user. Please try again.",
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.render("verify-otp", {
        email,
        error: "Invalid or expired OTP",
      });
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    res.render("login", {
      message: "Email verified successfully. You can now log in.",
    });
  } catch (error) {
    return res.render("verify-otp", {
      email: req.body.email,
      error: "Error verifying OTP. Please try again.",
      message: null,
    });
  }
};

export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email, isVerified: false });
    if (!user) {
      return res.render("verify-otp", {
        email,
        error: "User not found or already verified",
      });
    }
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Send new OTP email
    await transporter.sendMail({
      to: user.email,
      subject: "New Email Verification OTP",
      html: `Your new OTP for email verification is: <strong>${otp}</strong>. This OTP will expire in 5 minutes.`,
    });

    res.render("verify-otp", {
      email,
      message: "New OTP sent. Please check your email.",
    });
  } catch (error) {
    return res.render("verify-otp", {
      email: req.body.email,
      error: "Error resending OTP. Please try again.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("login", {
        error: "Invalid email or password",
        message: null,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", {
        error: "Invalid email or password",
        message: null,
      });
    }

    if (!user.isVerified) {
      return res.render("login", {
        error: "Please verify your email before logging in",
        message: null,
      });
    }
    const token = generateToken(user);
    res.cookie("token", token);
    return res.redirect("/");
  } catch (error) {
    return res.render("login", {
      error: "Error logging in. Please try again.",
      message: null,
    });
  }
};

export const logout = (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.redirect("/login");
    }
    res.clearCookie("token");
    return res.redirect("/");
  } catch (error) {
    return res.json({ message: "Unable to logout." });
  }
};
