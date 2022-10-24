import styled from "styled-components";
import type { ButtonProps } from "../../types/globalTypes";

const BasicButton = ({
  children,
  fontSize,
  height,
  type,
  width,
  onClick,
}: ButtonProps) => {
  if (onClick && type !== "submit") {
    return (
      <StyledButton
        type={type}
        onClick={onClick}
        width={width}
        height={height}
        fontSize={fontSize}
      >
        {children}
      </StyledButton>
    );
  }

  return (
    <StyledButton type={type} width={width} height={height} fontSize={fontSize}>
      {children}
    </StyledButton>
  );
};

export default BasicButton;

const StyledButton = styled.button<ButtonProps>`
  background: ${(props) => props.theme.basicButton.bgColor};
  border: 2px solid #9000ff;
  border-radius: 20px;
  color: #9000ff;
  cursor: pointer;
  font-family: ibmLight;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "17px")};
  font-weight: bold;
  height: ${({ height }) => (height ? height : "30px")};
  margin: 0px 10px;
  width: ${({ width }) => (width ? width : "80px")};

  &:hover {
    color: white;
    background: #9000ff;
  }
`;
