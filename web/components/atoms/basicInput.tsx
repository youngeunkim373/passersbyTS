import { forwardRef } from "react";
import styled from "styled-components";
import type { InputProps } from "../../types/globalTypes";

const BasicInput = (
  {
    autoFocus = false,
    defaultValue,
    id,
    lineHeight,
    name,
    onChange,
    onKeyPress,
    placeholder,
    readOnly = false,
    required = false,
    submitOnEnter = false,
    type,
    value,
    width,
  }: InputProps,
  ref: any
) => {
  const handleKeyPress = (e: any) => {
    if (!submitOnEnter && e.key === "Enter") e.preventDefault();
    if (typeof onKeyPress === "function") onKeyPress(e.key);
  };

  return (
    <StyledInput
      autoFocus={autoFocus}
      defaultValue={defaultValue}
      id={id}
      lineHeight={lineHeight}
      name={name}
      onChange={onChange}
      onKeyPress={handleKeyPress}
      placeholder={placeholder}
      readOnly={readOnly}
      ref={ref}
      required={required}
      type={type}
      value={value}
      width={width}
    />
  );
};
export default forwardRef(BasicInput);

const StyledInput = styled.input<InputProps>`
  background: ${(props) => props.theme.basicInput.bgColor};
  border: ${(props) => props.theme.basicInput.border};
  border-radius: 5px;
  box-sizing: border-box;
  color: ${(props) => props.theme.basicInput.color};
  font-family: "ibmLight";
  font-size: 15px;
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : "50px")};
  outline: none;
  width: ${({ width }) => (width ? width : "300px")};

  &:focus {
    border: 1px solid #9000ff;
  }
`;
