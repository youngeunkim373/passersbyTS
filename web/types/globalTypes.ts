import { HTMLAttributes } from "react";
import { Dispatch, SetStateAction } from "react";

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
  readOnly?: boolean;
  required?: boolean;
  submitOnEnter?: boolean;
  type: InputType;
  value?: string | number;
  width?: string;
}

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export interface SelectProps extends HTMLAttributes<HTMLDivElement> {
  options: { [k: string]: string };
  currentValue?: { [k: string]: string | number };
  background?: string;
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
/*                      PAGE PROPS                    */
/* -------------------------------------------------- */

export interface SignInProps {
  email: string | null;
  nickname: string | null;
  sex: SexType | null;
  age: string | number | null;
  region: RegionType | null;
  userRole: string | null;
  userImage: string | null;
}
