import { getRepository } from "typeorm";
import * as passport from "passport";
import { Strategy } from "passport-local";
import * as bcrypt from "bcrypt";
import { User } from "../entity/User";

// passport.use(name, strategy)
export default () => {
  console.log("localStrategy Called");
  passport.use(
    "local",
    new Strategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (username, password, done) => {
        try {
          console.log("2. local Strategy 호출");
          let userRepository = await getRepository(User);
          let user = await userRepository.findOne({
            email: username,
          });
          console.dir(user);
          // 사용자가 존재하지 않을 경우
          if (!user) {
            return done(null, false, { message: "User does not exist" });
          }
          const result = await bcrypt.compare(password, user.password);
          console.log(result);
          // 사용자와 비밀번호가 매칭할 경우
          if (result) {
            return done(null, user);
          }
          // 사용자는 있는데 비밀번호와 사용자계정이 맞지 않을 경우
          return done(null, false, {
            message: "Password and username mismatch",
          });
        } catch (e) {
          done(e);
          console.error(e);
        }
      }
    )
  );
};
