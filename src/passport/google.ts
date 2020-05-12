import { getRepository } from "typeorm";
import * as passport from "passport";
import { Strategy } from "passport-google-oauth20";
import * as dotenv from "dotenv";
import { User } from "../entity/User";
dotenv.config();

export default () => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_APP_ID,
        clientSecret: process.env.GOOGLE_APP_SECRET,
        callbackURL: "http://localhost:3065/auth/google/callback",
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
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
        } catch (e) {
          console.error(e);
          return done(e);
        }
      }
    )
  );
};
