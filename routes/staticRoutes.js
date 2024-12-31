import { Router } from "express";

const staticRouter = Router();

staticRouter.get("/", (req, res) => {
  return res.render("home");
});

staticRouter.get("/login", (req, res) => {
  return res.render("login");
});

staticRouter.get("/signup", (req, res) => {
  return res.render("signup");
});

export default staticRouter;
