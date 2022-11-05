import { MembersKeys } from "../../types/globalTypes";
import { SIGNIN, SIGNOUT } from "./authenticationTypes";

export const signIn = ({
  email,
  nickname,
  sex,
  age,
  region,
  userRole,
  userImage,
}: MembersKeys) => {
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
