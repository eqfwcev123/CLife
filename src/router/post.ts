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

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const postRepository = getRepository(Post);
    let posts = await postRepository.createQueryBuilder("post").getMany();
    res.render("post", { list: posts });
  } catch (e) {
    console.error(e);
    next();
  }
});

// ADD POST
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

// GET POST
router.get("/getPost", isLoggedIn, async (req, res, next) => {
  const postRepository = getRepository(Post);
  let post = await postRepository.findOne({
    where: {
      id: req.user!.id,
    },
  });
  return res.render("postupdate");
});

// UPDATE POST
router.patch("/updatePost", isLoggedIn, async (req, res, next) => {
  const postRepository = getRepository(Post);
  console.dir(req);
  let updatePost = await postRepository.update(
    {
      id: req.user!.id,
    },
    {
      title: req.body.title,
      content: req.body.content,
    }
  );
});

export default router;
