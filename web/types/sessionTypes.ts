import { SexType, RegionType } from "./globalTypes";

export interface SignInProps {
  email: string | null;
  nickname: string | null;
  sex: SexType | null;
  age: string | number | null;
  region: RegionType | null;
  userRole: string | null;
  userImage: string | null;
}
