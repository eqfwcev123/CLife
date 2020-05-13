import { getRepository } from "typeorm";
import * as passport from "passport";
import { Strategy } from "passport-google-oauth20";
import * as dotenv from "dotenv";
import * as bcrypt from "bcrypt";
import { GoogleUser } from "../entity/GoogleUser";
dotenv.config();

export default () => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: "http://localhost:8000/user/auth/google/callback",
        scope: ["id", "displayName", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const userRepository = getRepository(GoogleUser);
          const user = await userRepository.findOne({
            where: { email: profile.emails![0].value },
          });
          if (user) {
            done(undefined, user);
          } else {
            let newpassword = await bcrypt.hash(profile.id, 12);
            let newUser = userRepository.create({
              email: String(profile.emails![0].value),
              password: newpassword,
            });
            newUser = await userRepository.save(newUser);
            done(undefined, newUser);
          }
        } catch (e) {
          console.error(e);
          return done(e);
        }
      }
    )
  );
};
