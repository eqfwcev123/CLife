import { getRepository } from "typeorm";
import { Strategy } from "passport-facebook";
import * as passport from "passport";
import * as dotenv from "dotenv";
import { User } from "../entity/User";
dotenv.config();

export default () => {
  console.log("Facebook Strategy");
  passport.use(
    new Strategy(
      {
        clientID: process.env.FACEBOOKE_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "",
      },
      async (accessToken, refreshToken, profile, done) => {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({
          where: { email: profile.emails[0] },
        });
        // user 가 존재할 경우
        if (user) {
          done(null, user);
        }
        const newUser = userRepository.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          username: profile.id,
          password: 
        });
        done(null, newUser);
      }
    )
  );
};
