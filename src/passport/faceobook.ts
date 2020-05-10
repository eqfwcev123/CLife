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
        callbackURL: "http://localhost:3065/user/auth/facebook/callback",
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({
          where: { email: profile.emails[0] },
        });
        // user 가 존재할 경우
        if (user) {
          done(null, user);
        }
        let newUser = userRepository.create({
          id: parseInt(profile.id),
        });
        newUser = await userRepository.save(newUser);
        done(null, newUser);
      }
    )
  );
};
