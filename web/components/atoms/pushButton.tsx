import type { ButtonType } from "../../types/globalTypes";
import Button from "@mui/material/Button";
import styled from "styled-components";

interface ButtonProps {
  type: ButtonType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  width?: string;
  height?: string;
  fontSize?: string;
}

const StyledButton = styled(Button)<ButtonProps>`
  font-family: ibmLight;
  font-weight: bold;
  background: #6F30C9;
  border: 0;
  padding: 0;
  border-radius: 15px;
  cursor: pointer;
  outline-offset: 4px;

  &:hover {
    transform: translateY(5px);
    transition: transform 0.25s cubic-bezier(.3, .7, .4, 1.5);
    background: #6F30C9;
  },
`;

const StyledSpan = styled.span`
  min-width: 130px;
  display: block;
  border-radius: 15px;
  line-height: 50px;
  font-size: 1.2rem;
  color: white;
  background: #9000ff;
  transform: translateY(-8px);
  transition: transform 0.4s cubic-bezier(0.3, 0.7, 0.4, 1);
`;

const PushButton = ({
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
        <StyledSpan>{children}</StyledSpan>
      </StyledButton>
    );
  }

  return (
    <StyledButton type={type} width={width} height={height} fontSize={fontSize}>
      <StyledSpan>{children}</StyledSpan>
    </StyledButton>
  );
};

export default PushButton;
