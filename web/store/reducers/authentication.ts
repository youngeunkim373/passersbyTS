import type { SignInProps } from "../../types/sessionTypes";
import { SIGNIN, SIGNOUT } from "../actions/authenticationTypes";

const initialState: SignInProps = {
  email: null,
  nickname: null,
  sex: null,
  age: null,
  region: null,
  userRole: null,
  userImage: null,
};

const auth = (
  state = initialState,
  action: {
    type: string;
    data: SignInProps;
  }
) => {
  switch (action.type) {
    case SIGNIN:
      return action.data;
    case SIGNOUT:
      return {
        email: null,
        nickname: null,
        sex: null,
        age: null,
        region: null,
        userRole: null,
        userImage: null,
      };
    default:
      return state;
  }
};

export default auth;
