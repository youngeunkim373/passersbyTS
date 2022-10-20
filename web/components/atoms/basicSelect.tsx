import { useState, forwardRef } from "react";
import styled from "styled-components";
import TextBalloon from "./textBalloon";

interface SelectProps {
  options: { [k: string]: string };
  currentValue?: { [k: string]: string | number };
  background?: string;
}

const StyledDiv = styled.div<SelectProps>`
  width: ${({ options }) =>
    options
      ? `${
          Object.values(options).reduce((acc, cur) => {
            return Math.max(acc, cur.length);
          }, 0) * 20
        }px`
      : "300px"};

  height: 35px;
  display: flex;
  align-items: center;
  position: relative;
  background: #fffaff;
  min-width: 100px;
  max-width: 400px;
  border-radius: 8px;
  align-self: center;
  cursor: pointer;

  ::before {
    content: "⌵";
    position: absolute;
    top: -4px;
    right: 8px;
    color: #9000ff;
    font-size: 20px;
  }
`;

const StyledLabel = styled.label`
  font-size: 18px;
  margin-left: 10px;
`;

const StyledUl = styled.ul<{
  isShowOptions?: boolean;
  options: { [k: string]: string };
}>`
  display: ${({ isShowOptions }) => (isShowOptions ? "block" : "none")};
  width: ${({ options }) =>
    options
      ? `${
          Object.values(options).reduce((acc, cur) => {
            return Math.max(acc, cur.length);
          }, 0) * 20
        }px`
      : "300px"};
  height: ${({ options }) =>
    Object.keys(options).length >= 5
      ? "180px"
      : 33 * Object.keys(options).length};
  overflow: ${({ options }) =>
    Object.keys(options).length >= 5 ? "auto" : "hidden"};

  position: absolute;
  background: #fffaff;
  min-width: 100px;
  max-width: 400px;
  list-style: none;
  top: 18px;
  left: 0;
  width: 100%;
  padding: 0px;
  margin-top: 23px;
  border-radius: 8px;
  color: #101820;
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

const StyledLi = styled.li`
  font-size: 16px;
  padding: 6px 0px;
  transition: background-color 0.1s ease-in;

  &:hover {
    background: #ffe8f5;
  }
`;

const BasicSelect = (
  {
    options,
    currentValue = {
      id: "unselected",
      text: "선택",
    },
  }: SelectProps,
  ref: any
) => {
  const [isShowOptions, setShowOptions] = useState(false);
  const [currentOption, setCurrentOption] = useState(currentValue);

  const handleChangeOption = (e: React.MouseEvent) => {
    const eventTarget = e.target as HTMLElement;
    setCurrentOption({ id: eventTarget.id, text: eventTarget.innerText });
  };

  return (
    <StyledDiv
      onClick={() => setShowOptions((prev) => !prev)}
      options={options}
    >
      <StyledLabel htmlFor={`${currentOption.id}`} ref={ref}>
        {currentOption.text}
      </StyledLabel>
      <StyledUl isShowOptions={isShowOptions} options={options}>
        <StyledLi id={"unselected"} onClick={handleChangeOption}>
          &nbsp;&nbsp;&nbsp;선택
        </StyledLi>
        {Object.keys(options).map((option) => (
          <StyledLi key={option} id={option} onClick={handleChangeOption}>
            &nbsp;&nbsp;&nbsp;{options[option]}
          </StyledLi>
        ))}
      </StyledUl>
    </StyledDiv>
  );
};

export default forwardRef(BasicSelect);
