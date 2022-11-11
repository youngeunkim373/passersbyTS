import { forwardRef, useState } from "react";
import styled from "styled-components";
import type { SelectProps } from "../../types/globalTypes";

const BasicSelect = (
  {
    currentValue = {
      id: "unselected",
      text: "선택",
    },
    height = "35px",
    options,
    width = `${
      Object.values(options).reduce((acc, cur) => {
        return Math.max(acc, cur.length);
      }, 0) * 20
    }px`,
    setOption,
  }: SelectProps,
  ref: React.Ref<HTMLLabelElement>
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
      height={height}
      width={width}
    >
      <SelectedOption htmlFor={`${currentOption.id}`} ref={ref}>
        {currentOption.text}
      </SelectedOption>
      <SelectList
        height={height}
        width={width}
        isShowOptions={isShowOptions}
        options={options}
      >
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
  background: ${({ theme }) => theme.global.component.bgColor};
  border: ${({ theme }) => theme.global.component.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.global.component.color};
  cursor: pointer;
  display: flex;
  height: ${({ height }) => height};
  max-width: 400px;
  min-width: 100px;
  position: relative;
  width: ${({ width }) => width};

  ::before {
    color: #9000ff;
    content: "⌵";
    font-size: 20px;
    position: absolute;
    right: 8px;
    top: ${({ height }) => "calc(" + height + "- 20px)"};
  }
`;

const SelectedOption = styled.label`
  font-size: 18px;
  margin-left: 10px;
`;

const SelectItem = styled.li`
  font-size: 16px;
  padding: 6px 0px;
  transition: background-color 0.1s ease-in;

  &:hover {
    background: ${({ theme }) => theme.basicSelect.hoverBgColor};
  }
`;

const SelectList = styled.ul<{
  height?: string;
  isShowOptions?: boolean;
  options: { [k: string]: string };
  width?: string;
}>`
  background: ${({ theme }) => theme.global.component.bgColor};
  border: ${({ theme }) => theme.global.component.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.global.component.color};
  display: ${({ isShowOptions }) => (isShowOptions ? "block" : "none")};
  height: ${({ options }) =>
    Object.keys(options).length >= 5
      ? "180px"
      : 33 * Object.keys(options).length};
  left: 0;
  list-style: none;
  margin-top: 23px;
  max-width: 400px;
  min-width: 100px;
  overflow: ${({ options }) =>
    Object.keys(options).length >= 5 ? "auto" : "hidden"};
  padding: 0px;
  position: absolute;
  top: ${({ height }) => "calc(" + height + " - 20px)"};
  width: ${({ width }) => width};
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
