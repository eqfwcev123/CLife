import { getRepository } from "typeorm";
import * as passport from "passport";
import { User } from "../entity/User";
import local from "./local";
import facebook from "./facebook";
import google from "./google";

export default () => {
  passport.serializeUser((user: User, done) => {
    done(null, user.id);
  });

  // user.id 는 세션에 저장됨. 나중에 deserializeUser 과정에서 사용
  // serialieUser는 user객체의 어느 데이터가 세션에 저장될지 지정
  // req.session.papport.user 에 {id: XXX } 로 저장

  // deserializeUser의 id 는 serializeUser의 done()함수의 두번째 인자인 user.id 와 동일하다

  passport.deserializeUser<User, number>(async (id: number, done) => {
    try {
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ id: id });
    } catch (e) {
      console.error(e);
    }
  });
  local();
  facebook();
  google();
};
