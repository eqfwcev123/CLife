import { getRepository } from "typeorm";
import * as express from "express";
import { Post } from "../entity/Post";
import { Comment } from "../entity/Comment";
import { User } from "../entity/User";
import { HashTag } from "../entity/HashTag";
import { Image } from "../entity/Image";
import { isLoggedIn } from "./middleware";
const router = express.Router();

// const userRepository = getRepository(User);
// const commentRepository = getRepository(Comment);
// const imageRepository = getRepository(Image);
// const hashtagRepository = getRepository(HashTag);

// User add a post
router.get("/", isLoggedIn, (req, res, next) => {
  try {
    // const postRepository = getRepository(Post);
    //   let post = postRepository.create({
    //     title: req.body.title,
    //     content: req.body.content,
    //   });
    res.send("환영");
  } catch (e) {
    console.error(e);
    next();
  }
});

export default router;
