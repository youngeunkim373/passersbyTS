import styled from "styled-components";
import Box from "@mui/material/Box";

interface BoxProps {
  children: React.ReactNode;
}

const StyledBox = styled(Box)<BoxProps>`
  min-width: 300px;
  max-width: 450px;
  height: auto;
  color: #6f30c9;
  background: #fffaff;
  box-shadow: 5px 15px 20px 5px #eaeaea;
  border-radius: 7px;
  text-align: center;
  padding: 20px;
  display: flex;
  align-items: center;
  overflow: hidden;
  word-break: break-all;
`;

const SmallBox = ({ children }: BoxProps) => {
  return <StyledBox>{children}</StyledBox>;
};

export default SmallBox;
