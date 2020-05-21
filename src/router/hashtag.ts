import * as express from "express";
import { isLoggedIn } from "./middleware";
const router = express.Router();

router.get("/:tag", isLoggedIn, async (req, res, next) => {
  try {
  } catch (e) {
    console.error(e);
    next();
  }
});

export default router;
