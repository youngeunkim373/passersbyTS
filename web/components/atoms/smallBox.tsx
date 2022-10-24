import styled from "styled-components";
import Box from "@mui/material/Box";
import type { BoxProps } from "../../types/globalTypes";

const SmallBox = ({ children }: BoxProps) => {
  return <StyledBox>{children}</StyledBox>;
};

export default SmallBox;

const StyledBox = styled(Box)<BoxProps>`
  align-items: center;
  background: ${(props) => props.theme.box.bgColor};
  box-shadow: 5px 15px 20px 5px #eaeaea;
  color: ${(props) => props.theme.box.color};
  display: flex;
  height: auto;
  max-width: 450px;
  min-width: 300px;
  overflow: hidden;
  padding: 20px;
  text-align: center;
  word-break: break-all;
`;
