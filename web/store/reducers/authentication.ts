import { MembersKeys } from "../../types/globalTypes";
import { SIGNIN, SIGNOUT } from "../actions/authenticationTypes";

const initialState: MembersKeys = {
  email: "",
  nickname: "",
  sex: "",
  age: "",
  region: "",
  userRole: "",
  userImage: "",
};

const auth = (
  state = initialState,
  action: {
    type: string;
    data: MembersKeys;
  }
) => {
  switch (action.type) {
    case SIGNIN:
      return action.data;
    case SIGNOUT:
      return {
        email: "",
        nickname: "",
        sex: "",
        age: "",
        region: "",
        userRole: "",
        userImage: "",
      };
    default:
      return state;
  }
};

export default auth;
