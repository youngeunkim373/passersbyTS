import styled from "styled-components";
import Box from "@mui/material/Box";
import type { BoxProps } from "../../types/globalTypes";

const MediumBox = ({ children }: BoxProps) => {
  return <StyledBox>{children}</StyledBox>;
};

export default MediumBox;

const StyledBox = styled(Box)<BoxProps>`
  align-items: center;
  background: ${({ theme }) => theme.global.component.pointBgColor};
  //box-shadow: 5px 15px 20px 5px #eaeaea;
  color: ${({ theme }) => theme.global.component.color};
  display: flex;
  max-width: 1000px;
  min-height: 400px;
  min-width: 500px;
  overflow: hidden;
  text-align: center;
  word-break: break-all;
`;
