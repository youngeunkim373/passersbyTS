import { forwardRef } from "react";
import type { InputType } from "../../types/globalTypes";
import styled from "styled-components";

interface InputProps {
  type: InputType;
  id?: string;
  placeholder?: string;
  value?: string | number;
  readOnly?: boolean;
  width?: string;
  lineHeight?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  submitOnEnter?: boolean;
  required?: boolean;
  autoFocus?: boolean;
}

const StyledInput = styled.input<InputProps>`
  width: ${({ width }) => (width ? width : "300px")};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : "50px")};
  background: ${({ readOnly }) => (readOnly ? "#EAEAEA" : "white")};

  font-family: "ibmLight";
  font-size: 15px;
  box-sizing: border-box;
  border: 1px solid #cccccc;
  border-radius: 5px;
  outline: none;

  &:focus {
    border: 1px solid #9000ff;
  }
`;

const BasicInput = (
  {
    type,
    id,
    placeholder,
    value,
    readOnly = false,
    width,
    lineHeight,
    onChange,
    onKeyPress,
    submitOnEnter = false,
    required = false,
    autoFocus = false,
  }: InputProps,
  ref: any
) => {
  const handleKeyPress = (e: any) => {
    if (!submitOnEnter && e.key === "Enter") e.preventDefault();
    if (typeof onKeyPress === "function") onKeyPress(e.key);
  };

  return (
    <StyledInput
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyPress={handleKeyPress}
      readOnly={readOnly}
      width={width}
      lineHeight={lineHeight}
      required={required}
      ref={ref}
      autoFocus={autoFocus}
    />
  );
};
export default forwardRef(BasicInput);
