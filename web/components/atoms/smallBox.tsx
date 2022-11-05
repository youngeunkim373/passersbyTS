import styled from "styled-components";
import Box from "@mui/material/Box";
import type { BoxProps } from "../../types/globalTypes";

interface SmallBoxProps extends BoxProps {
  background?: string;
  color?: string;
  height?: string;
  width?: string;
}

const SmallBox = ({
  background,
  children,
  color,
  height,
  width,
}: SmallBoxProps) => {
  return (
    <StyledBox
      background={background}
      color={color}
      height={height}
      width={width}
    >
      {children}
    </StyledBox>
  );
};

export default SmallBox;

const StyledBox = styled(Box)<SmallBoxProps>`
  align-items: center;
  background: ${({ background, theme }) =>
    background ? background : theme.box.smallBox.bgColor};
  border-radius: 7px;
  box-shadow: ${({ theme }) => theme.box.smallBox.shadow};
  color: ${({ color, theme }) => (color ? color : theme.box.smallBox.color)};
  display: flex;
  height: ${({ height }) => (height ? height : "auto")};
  max-width: 450px;
  overflow: hidden;
  padding: 20px;
  text-align: center;
  width: ${({ width }) => (width ? width : "auto")};
  word-break: break-all;
`;
