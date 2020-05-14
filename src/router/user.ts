import { getRepository } from "typeorm";
import { isLoggedIn, isLoggedOut } from "./middleware";
import * as express from "express";
import * as bcrypt from "bcrypt";
import * as passport from "passport";
import { User } from "../entity/User";
const router = express.Router();

router.get("", (req, res, next) => {
  return res.render("index");
});

router.post("/login", isLoggedOut, (req, res, next) => {
  console.log("1. router.post 에서 사용자 인증함수 호출");
  passport.authenticate(
    "local",
    (err: Error, user: User, info: { message: string }) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (info) {
        return res.status(401).send(info.message);
      }
      return req.login(user, (loginError: Error) => {
        try {
          if (loginError) {
            return next(loginError);
          }
          return res.redirect("/post");
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

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/auth/facebook/callback",
  isLoggedOut,
  passport.authenticate("facebook", {
    failureRedirect: "/user",
    successRedirect: "/main",
  })
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email"] })
);

router.get(
  "/auth/google/callback",
  isLoggedOut,
  passport.authenticate("google", {
    failureRedirect: "/user",
    successRedirect: "/main",
  })
);

router.get("/logout", (req, res, next) => {
  req.logout();
  req.session!.destroy(() => {
    res.send("you have successfully logged out from CLife");
  });
});

// 모든 사용자 정보 가지고 오기
router.get("/list", async (req, res, next) => {
  const userRepository = getRepository(User);
  const users = await userRepository.createQueryBuilder("users").getMany();
  return res.json(users);
});

// 특정 사용자 정보 가지고 오기
router.get("/:id", async (req, res, next) => {
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!user) {
      res.send("해당 사용자는 존재자하지 않습니다");
    }
    res.json(user);
  } catch (e) {
    console.error(e);
    next();
  }
});

export default router;