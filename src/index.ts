import { createConnection } from "typeorm";
import * as express from "express";
import * as morgan from "morgan";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as expressSession from "express-session";
import * as dotenv from "dotenv";
import * as hpp from "hpp";
import * as helmet from "helmet";
import * as passport from "passport";
import * as cors from "cors";
import "reflect-metadata";
import logger from "./logger";

//Router
import userRouter from "./router/user";
import postRouter from "./router/post";
import hashTagRouter from "./router/hashtag";
import passportConfig from "./passport/index";
passportConfig();

dotenv.config();
const app = express();
const prod = process.env.NODE_ENV === "production";
app.set("port", prod ? process.env.PORT : 3065);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

createConnection()
  .then(async (connection) => {
    if (prod) {
      app.use(hpp());
      app.use(helmet());
      app.use(morgan("combined"));
      app.use((req, res, next) => {
        const err = new Error("Not Found");
        logger.info("hello");
        logger.error(err.message);
        next(err);
      });
    } else {
      app.use(morgan("dev"));
    }

    app.use("/", express.static("uploads"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use(
      expressSession({
        resave: true,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET!,
        cookie: {
          httpOnly: true,
          secure: false,
        },
      })
    );
    app.use(cors());
    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/user", userRouter);
    app.use("/post", postRouter);
    app.use("/hashtag", hashTagRouter);
  })
  .catch((error) => console.log(error));

app.listen(app.get("port"), () => {
  console.log(`server listening at port ${app.get("port")}`);
});
