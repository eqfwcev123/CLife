import { createConnection, getManager } from "typeorm";
import * as express from "express";
import * as morgan from "morgan";
import * as cookieParser from "cookie-parser";
import * as expressSession from "express-session";
import * as dotenv from "dotenv";
import * as hpp from "hpp";
import * as helmet from "helmet";
import * as passport from "passport";
import * as cors from "cors";
import "reflect-metadata";

//Router
console.log("라우터 연결전 ");
import userRouter from "./router/index";
import { Post } from "./entity/Post";

dotenv.config();
const app = express();
const prod = process.env.NODE_ENV === "production";
app.set("port", prod ? process.env.PORT : 3065);
app.set("view engine", "pug");

createConnection()
  .then(async (connection) => {
    if (prod) {
      app.use(hpp());
      app.use(helmet());
      app.use(morgan("combined"));
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
          secure: true,
        },
      })
    );
    app.use(cors());
    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/user", userRouter);
  })
  .catch((error) => console.log(error));

app.listen(app.get("port"), () => {
  console.log(`server listening at port ${app.get("port")}`);
});
