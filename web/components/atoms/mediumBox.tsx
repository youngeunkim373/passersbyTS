import styled from "styled-components";
import Box from "@mui/material/Box";
import type { BoxProps } from "../../types/globalTypes";

const MediumBox = ({ children }: BoxProps) => {
  return <StyledBox>{children}</StyledBox>;
};

export default MediumBox;

const StyledBox = styled(Box)<BoxProps>`
  align-items: center;
  background: ${(props) => props.theme.box.bgColor};
  //box-shadow: 5px 15px 20px 5px #eaeaea;
  color: ${(props) => props.theme.box.color};
  display: flex;
  min-width: 500px;
  max-width: 1000px;
  min-height: 400px;
  overflow: hidden;
  text-align: center;
  word-break: break-all;
`;
