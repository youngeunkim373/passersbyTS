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
    placeholder,
    readOnly = false,
    required = false,
    submitOnEnter = false,
    type,
    value,
    width,
    onChange,
    onKeyPress,
  }: InputProps,
  ref: React.Ref<HTMLInputElement>
) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!submitOnEnter && e.key === "Enter") e.preventDefault();
    if (typeof onKeyPress === "function") onKeyPress(e);
  };

  return (
    <StyledInput
      autoFocus={autoFocus}
      defaultValue={defaultValue}
      id={id}
      lineHeight={lineHeight}
      name={name}
      placeholder={placeholder}
      readOnly={readOnly}
      ref={ref}
      required={required}
      type={type}
      value={value}
      width={width}
      onChange={onChange}
      onKeyPress={handleKeyPress}
    />
  );
};
export default forwardRef(BasicInput);

const StyledInput = styled.input<InputProps>`
  background: ${({ theme }) => theme.global.component.bgColor};
  border: ${({ theme }) => theme.global.component.border};
  border-radius: 5px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.global.component.color};
  font-family: "ibmLight";
  font-size: 15px;
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : "50px")};
  outline: none;
  width: ${({ width }) => (width ? width : "300px")};

  &:focus {
    border: 1px solid #9000ff;
  }
`;
