import styled from "styled-components";
import Box from "@mui/material/Box";
import type { BoxProps } from "../../types/globalTypes";

const SmallBox = ({ children }: BoxProps) => {
  return <StyledBox>{children}</StyledBox>;
};

export default SmallBox;

const StyledBox = styled(Box)<BoxProps>`
  align-items: center;
  background: ${({ theme }) => theme.box.smallBox.bgColor};
  box-shadow: ${({ theme }) => theme.box.smallBox.shadow};
  color: ${(props) => props.theme.box.smallBox.color};
  display: flex;
  height: auto;
  max-width: 450px;
  min-width: 300px;
  overflow: hidden;
  padding: 20px;
  text-align: center;
  word-break: break-all;
`;
