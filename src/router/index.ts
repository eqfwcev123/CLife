import { getRepository, getConnection } from "typeorm";
import { isLoggedIn, isLoggedOut } from "./middleware";
import * as express from "express";
import * as bcrypt from "bcrypt";
import * as passport from "passport";
import { User } from "../entity/User";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("사용자 정보 페이지!!!");
  console.log(getConnection());
});

router.post("/login", isLoggedOut, (req, res, next) => {
  passport.authenticate(
    "local",
    (err: Error, user: User, info: { message: string }) => {
      console.log(req.user);
      if (err) {
        console.error(err);
        return next(err);
      }
      if (info) {
        return res.status(401).send(info.message);
      }
      return req.login(user, async (loginError: Error) => {
        try {
          if (loginError) {
            return next(loginError);
          }
          const userRepository = getRepository(User);
          const fullUser = await userRepository.find({
            where: { id: user.id },
          });
          return res.json(fullUser);
        } catch (e) {
          console.error(e);
          return next(e);
        }
      });
    }
  )(req, res, next);
});

router.post("/signup", isLoggedOut, async (req, res, next) => {
  try {
    const userRepository = getRepository(User);

    const existingUser = await userRepository.findOne({
      where: { username: req.body.username },
    });

    if (existingUser) {
      res.status(403).send("이미 존재하는 사용자입니다");
    }

    const hashPassword = await bcrypt.hash(req.body.password, 12);
    const user = userRepository.create({
      username: req.body.username,
      password: hashPassword,
      email: req.body.email,
      name: req.body.name,
    });
    const result = await userRepository.save(user);
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

export default router;
