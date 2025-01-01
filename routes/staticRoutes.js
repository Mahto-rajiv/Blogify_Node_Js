import { Router } from "express";

const staticRouter = Router();

staticRouter.get("/", (req, res) => {
  return res.render("home", { user: req.user });
});

staticRouter.get("/login", (req, res) => {
  return res.render("login");
});

staticRouter.get("/signup", (req, res) => {
  return res.render("signup");
});

staticRouter.get("/forgot-password", (req, res) => {
  return res.render("forgot-password");
});

export default staticRouter;
