import styled from "styled-components";
import Button from "@mui/material/Button";
import type { ButtonProps } from "../../types/globalTypes";

const PushButton = ({
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
        fontSize={fontSize}
        height={height}
        type={type}
        width={width}
        onClick={onClick}
      >
        <StyledSpan>{children}</StyledSpan>
      </StyledButton>
    );
  }

  return (
    <StyledButton fontSize={fontSize} height={height} type={type} width={width}>
      <StyledSpan>{children}</StyledSpan>
    </StyledButton>
  );
};

export default PushButton;

const StyledButton = styled(Button)<ButtonProps>`
  background: #6F30C9;
  border: 0;
  border-radius: 15px;
  cursor: pointer;
  font-family: ibmLight;
  font-weight: bold;
  outline-offset: 4px;
  padding: 0;

  &:hover {
    background: #6F30C9;
    transform: translateY(5px);
    transition: transform 0.25s cubic-bezier(.3, .7, .4, 1.5);
  },
`;

const StyledSpan = styled.span`
  background: #9000ff;
  border-radius: 15px;
  color: white;
  display: block;
  font-size: 1.2rem;
  line-height: 50px;
  min-width: 130px;
  transform: translateY(-8px);
  transition: transform 0.4s cubic-bezier(0.3, 0.7, 0.4, 1);
`;
