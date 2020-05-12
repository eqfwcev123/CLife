import { getRepository } from "typeorm";
import { Strategy } from "passport-facebook";
import * as passport from "passport";
import * as dotenv from "dotenv";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
dotenv.config();

export default () => {
  passport.use(
    "facebook",
    new Strategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:8000/user/auth/facebook/callback",
        profileFields: ["id", "displayName", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.dir(profile);
          const userRepository = getRepository(User);
          const user = await userRepository.findOne({
            where: { email: profile.emails[0].value },
          });
          console.log(user);
          // user 가 존재할 경우
          if (user) {
            done(null, user);
          }
          let newpassword = await bcrypt.hash(profile.id, 12);
          let newUser = userRepository.create({
            email: String(profile.emails[0].value),
            password: newpassword,
          });
          newUser = await userRepository.save(newUser);
          done(null, newUser);
        } catch (e) {
          console.error(e);
          return done(e);
        }
      }
    )
  );
};
