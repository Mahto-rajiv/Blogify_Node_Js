import { validateToken } from "../utils/auth.js";

export const checkTokenAuthentication = (cookieName) => {
  return (req, res, next) => {
    try {
      const token = req.cookies[cookieName];
      if (!token) {
        req.user = null;
        return next();
      }

      const user = validateToken(token);

      if (!user) {
        req.user = null;
        return next();
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Authentication error:", error);
      req.user = null;
      next();
    }
  };
};
