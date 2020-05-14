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
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const postRepository = getRepository(Post);
    let posts = await postRepository.createQueryBuilder("post").getMany();
    console.dir(posts);
    res.render("post", { list: posts });
  } catch (e) {
    console.error(e);
    next();
  }
});

router.post("/addPost", isLoggedIn, async (req, res, next) => {
  try {
    const postRepository = getRepository(Post);
    let post = postRepository.create({
      title: req.body.title,
      content: req.body.content,
      user: req.user,
    });
    await postRepository.save(post);
    return res.redirect("/post");
  } catch (e) {
    console.error(e);
    next();
  }
});

export default router;
