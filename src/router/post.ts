import { getRepository } from "typeorm";
import * as express from "express";
import * as multer from "multer";
import * as path from "path";
import { Post } from "../entity/Post";
import { Comment } from "../entity/Comment";
import { User } from "../entity/User";
import { HashTag } from "../entity/HashTag";
import { Image } from "../entity/Image";
import { isLoggedIn } from "./middleware";
import { appendFile } from "fs";
const router = express.Router();
let upload = multer({
  // 이미지를 저장하는 방법은 서버디스크에 저장하는 방법이 있고
  // 다른 방법으로 S3 나 구글클라우드 스토리지 같은 외부 스토리지에 저장하는 방식이있다
  storage: multer.diskStorage({
    // destination은 파일이 저장될 경로
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    // 우리가 파일명과 확장자를 지정하지 않으면
    // 멀터가 알아서 파일명과 확장자를 설정하기 때문에 우리가 지정 해줘야한다
    filename(req, file, cb) {
      const extension = path.extname(file.originalname);
      cb(
        null,
        path.basename(file.originalname, extension) +
          new Date().valueOf() +
          extension
      );
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

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

router.post(
  "/:id/img",
  isLoggedIn,
  upload.array("img", 5),
  async (req, res) => {
    console.log(req.files);
    const imageRepository = getRepository(Image);
    const postRepository = getRepository(Post);
    let post = await postRepository.findOne({
      where: {
        id: parseInt(req.params.id),
      },
    });
    let image = imageRepository.create({
      src: req.file.path,
      post: post,
    });
    await imageRepository.save(image);
    return res.json(image);
  }
);

// ADD POST
const upload2 = multer();
router.post("/addPost", isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    const postRepository = getRepository(Post);
    const hashtagRepository = getRepository(HashTag);
    let post = postRepository.create({
      title: req.body.title,
      content: req.body.content,
      user: req.user,
    });
    await postRepository.save(post);
    const hashtags = req.body.content.match(/$[^\s]*/g);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag: string) =>
          hashtagRepository.findOne({
            where: {
              title: tag.slice(1).toLowerCase(),
            },
          })
        )
      );
      // result 가 있을경우
      if (result) {
      } else {
      }
    }
    return res.redirect("/post");
  } catch (e) {
    console.error(e);
    next();
  }
});

// 특정 포스트 가지고오기.
router.get("/:id/getPost", isLoggedIn, async (req, res, next) => {
  const postRepository = getRepository(Post);
  let post = await postRepository.findOne({
    where: {
      id: req.params.id,
    },
  });
  return res.json(post);
});

// UPDATE POST. 특정 포스트를 수정할때 해당 포스트는 사용자가 작성한 포스트 이어야한다.
router.patch("/:id/updatePost", isLoggedIn, async (req, res, next) => {
  const postRepository = getRepository(Post);
  let updatePost = await postRepository.update(
    {
      id: parseInt(req.params.id),
    },
    {
      title: req.body.title,
      content: req.body.content,
    }
  );
  let updatedPost = await postRepository.findOne({
    where: {
      id: parseInt(req.params.id),
    },
  });
  return res.json(updatedPost);
});

// 작성한 게시글 삭제
router.delete("/:id/deletePost", isLoggedIn, async (req, res, next) => {
  const postRepository = getRepository(Post);
  let deletePost = postRepository.delete(parseInt(req.params.id));
  return res.json(deletePost);
});

// 좋아요 추가
router.post("/:id/like", isLoggedIn, async (req, res, next) => {
  try {
    const postRepository = getRepository(User);
    const postLike = await postRepository
      .createQueryBuilder("post")
      .relation(Post, "post")
      .of(parseInt(req.params.id))
      .add(req.user!.id);
    res.json("좋아요!");
  } catch (e) {
    console.error(e);
    next();
  }
});

// 좋아요 제거
router.delete("/:id/unlike", isLoggedIn, async (req, res, next) => {
  try {
    const postRepository = getRepository(Post);
    let unlikePost = postRepository
      .createQueryBuilder("post")
      .relation(Post, "post")
      .of(parseInt(req.params.id))
      .remove(req.user!.id);
    return res.json("싫어요!");
  } catch (e) {
    console.error(e);
    next();
  }
});

// 이미지 업로드
// "img" 는 form태그 내부에있는 input태그의 name속성이다.
router.post(
  "/:id/postImage",
  isLoggedIn,
  upload.array("img"),
  (req, res, next) => {}
);

export default router;
