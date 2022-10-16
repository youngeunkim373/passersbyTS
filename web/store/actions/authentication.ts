import type { SignInProps } from "../../types/sessionTypes";
import { SIGNIN, SIGNOUT } from "./authenticationTypes";

export const signIn = ({
  email,
  nickname,
  sex,
  age,
  region,
  userRole,
  userImage,
}: SignInProps) => {
  return {
    type: SIGNIN,
    data: {
      email: email,
      nickname: nickname,
      sex: sex,
      age: age,
      region: region,
      userRole: userRole,
      userImage: userImage,
    },
  };
};

export const signOut = () => {
  return {
    type: SIGNOUT,
  };
};
