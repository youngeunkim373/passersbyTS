import { HTMLAttributes } from "react";
import { Dispatch, SetStateAction } from "react";
import { StreamOptions } from "stream";

/* -------------------------------------------------- */
/*                        LITERAL                     */
/* -------------------------------------------------- */
export type ButtonType = "button" | "submit" | "reset";

export type InputType =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

export type RegionType =
  | "Seoul"
  | "Gyeonggi"
  | "Gwangju"
  | "Daegu"
  | "Daejeon"
  | "Busan"
  | "Incheon"
  | "Ulsan"
  | "Sejong"
  | "Jeju"
  | "Gangwon"
  | "Gyeongsang"
  | "Jeolla"
  | "Chungcheong";

export type SexType = "F" | "M";

/* -------------------------------------------------- */
/*                   COMPONENT PROPS                  */
/* -------------------------------------------------- */
export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fontSize?: string;
  height?: string;
  type?: ButtonType;
  width?: string;
}

export interface InputProps extends HTMLAttributes<HTMLInputElement> {
  autoFocus?: boolean;
  lineHeight?: string;
  name?: string;
  readOnly?: boolean;
  required?: boolean;
  submitOnEnter?: boolean;
  type: InputType;
  value?: string | number;
  width?: string;
}

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  fontSize?: string;
}

export interface SelectProps extends HTMLAttributes<HTMLDivElement> {
  options: { [k: string]: any };
  currentValue?: { [k: string]: string };
  setOption?: Dispatch<SetStateAction<string>>;
}

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface TitleProps extends HTMLAttributes<HTMLHeadElement> {
  children: string;
  color?: string;
}

export interface ModalProps extends BoxProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface AnchorProps extends HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

/* -------------------------------------------------- */
/*                      TABLE KEYS                    */
/* -------------------------------------------------- */

export interface MembersKeys {
  email: string;
  password?: string;
  nickname: string;
  sex: SexType | "";
  age: string | number;
  region: RegionType | "";
  userRole: string;
  userImage?: string;
}

export interface BoardListKeys {
  listId: string;
  listTitle: string;
  writerEmail: string;
  listContent: string;
  viewCount: number;
  answerCount: number;
  registerId: string;
  registerDate: Date;
  timeDiff?: number | string;
  boardComments?: BoardCommentKeys[];
  boardNestedComments?: BoardCommentKeys[];
  writer: MembersKeys;
}

export interface BoardCommentKeys {
  listId: string;
  commentSequence: number;
  writerEmail: string;
  commentContent: string;
  depth: number;
  registerId: string;
  registerDate: Date;
  writer: MembersKeys;
  nestedCommentSequence: number | string;
}

export interface BoardAnswerKeys {
  listId: string;
  answerCategory: string;
  answerSequence: number;
  answerContent: string;
  answerSelectionCount: number;
  registerId: string;
  registerDate: Date;
}

/* -------------------------------------------------- */
/*                    SESSION DATA                    */
/* -------------------------------------------------- */

export interface SessionDatas {
  id?: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
}

/* -------------------------------------------------- */
/*                      APT RESULT                    */
/* -------------------------------------------------- */

export interface GetBoardCommentProps {
  comments: BoardCommentKeys[];
  pageCount: number;
  commentCount: number;
}
