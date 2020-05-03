import { createConnection } from "typeorm";
import * as express from "express";
import * as morgan from "morgan";
import * as cookieParser from "cookie-parser";
import * as expressSession from "express-session";
import * as dotenv from "dotenv";
import * as hpp from "hpp";
import * as helmet from "helmet";
import * as cors from "cors";
import * as reflectMetadata from "reflect-metadata";

//Router
import userRouter from "./router/index";

dotenv.config();
const app = express();
const prod = process.env.NODE_ENV === "production";
app.set("port", prod ? process.env.PORT : 3065);

createConnection()
  .then(async (connection) => {
    console.log(`connected to Database :D`);
  })
  .catch((error) => console.log(error));

// TODO cors 설정 나중에하기
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

app.get("/", (req, res, next) => {
  res.send("코로나 짤 프로젝트 정상 동작중!!!!");
});

app.use("/user", userRouter);

app.listen(app.get("port"), () => {
  console.log(`server listening at port ${app.get("port")}`);
});
