import type { ButtonType } from "../../types/globalTypes";
import styled from "styled-components";

interface ButtonProps {
  type: ButtonType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  width?: string;
  height?: string;
  fontSize?: string;
}

const StyledButton = styled.button<ButtonProps>`
  width: ${({ width }) => (width ? width : "80px")};
  height: ${({ height }) => (height ? height : "30px")};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "17px")};

  font-family: ibmLight;
  font-weight: bold;
  color: #9000ff;
  border: 1px solid #9000ff;
  border-radius: 20px;
  margin: 0px 10px;
  background: white;
  cursor: pointer;

  &:hover {
    color: white;
    background: #9000ff;
  }
`;

const BasicButton = ({
  type,
  onClick,
  children,
  width,
  height,
  fontSize,
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
