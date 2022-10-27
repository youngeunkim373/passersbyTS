import { useState, forwardRef } from "react";
import styled from "styled-components";
import type { SelectProps } from "../../types/globalTypes";

const BasicSelect = (
  {
    currentValue = {
      id: "unselected",
      text: "선택",
    },
    options,
    setOption,
  }: SelectProps,
  ref: any
) => {
  const [isShowOptions, setShowOptions] = useState(false);
  const [currentOption, setCurrentOption] = useState(currentValue);

  const handleChangeOption = (e: React.MouseEvent) => {
    const eventTarget = e.target as HTMLElement;
    setCurrentOption({ id: eventTarget.id, text: eventTarget.innerText });
    setOption && setOption(eventTarget.id);
  };

  return (
    <Container
      onClick={() => setShowOptions((prev) => !prev)}
      options={options}
    >
      <SelectedOption htmlFor={`${currentOption.id}`} ref={ref}>
        {currentOption.text}
      </SelectedOption>
      <SelectList isShowOptions={isShowOptions} options={options}>
        <SelectItem id={"unselected"} onClick={handleChangeOption}>
          &nbsp;&nbsp;&nbsp;선택
        </SelectItem>
        {Object.keys(options).map((option) => (
          <SelectItem key={option} id={option} onClick={handleChangeOption}>
            &nbsp;&nbsp;&nbsp;{options[option]}
          </SelectItem>
        ))}
      </SelectList>
    </Container>
  );
};

export default forwardRef(BasicSelect);

const Container = styled.div<SelectProps>`
  align-items: center;
  align-self: center;
  background: ${(props) => props.theme.basicSelect.bgColor};
  border-radius: 8px;
  color: ${(props) => props.theme.basicSelect.color};
  cursor: pointer;
  display: flex;
  height: 35px;
  max-width: 400px;
  min-width: 100px;
  position: relative;
  width: ${({ options }) =>
    options
      ? `${
          Object.values(options).reduce((acc, cur) => {
            return Math.max(acc, cur.length);
          }, 0) * 20
        }px`
      : "300px"};

  ::before {
    content: "⌵";
    position: absolute;
    top: -4px;
    right: 8px;
    color: #9000ff;
    font-size: 20px;
  }
`;

const SelectedOption = styled.label`
  font-size: 18px;
  margin-left: 10px;
`;

const SelectList = styled.ul<{
  isShowOptions?: boolean;
  options: { [k: string]: string };
}>`
  background: ${(props) => props.theme.basicSelect.bgColor};
  border-radius: 8px;
  color: ${(props) => props.theme.basicSelect.color};
  display: ${({ isShowOptions }) => (isShowOptions ? "block" : "none")};
  height: ${({ options }) =>
    Object.keys(options).length >= 5
      ? "180px"
      : 33 * Object.keys(options).length};
  left: 0;
  list-style: none;
  margin-top: 23px;
  min-width: 100px;
  max-width: 400px;
  overflow: ${({ options }) =>
    Object.keys(options).length >= 5 ? "auto" : "hidden"};
  padding: 0px;
  position: absolute;
  top: 18px;
  width: ${({ options }) =>
    options
      ? `${
          Object.values(options).reduce((acc, cur) => {
            return Math.max(acc, cur.length);
          }, 0) * 20
        }px`
      : "300px"};
  z-index: 999;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    height: 30%;
    background: #9000ff;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(144, 0, 255, 0.1);
  }
`;

const SelectItem = styled.li`
  font-size: 16px;
  padding: 6px 0px;
  transition: background-color 0.1s ease-in;

  &:hover {
    background: #ffe8f5;
  }
`;
