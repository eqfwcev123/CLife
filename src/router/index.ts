import * as express from "express";
import * as bcrypt from "bcrypt";
import * as passport from "passport";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("사용자 정보 페이지!!!");
});

export default router;
