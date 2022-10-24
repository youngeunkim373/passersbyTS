import styled from "styled-components";
import type { TitleProps } from "../../types/globalTypes";

const Title = ({ children, color }: TitleProps) => {
  return <StyledH1 color={color}>{children}</StyledH1>;
};

export default Title;

const StyledH1 = styled.h1<TitleProps>`
  color: ${(props) => props.theme.basicText.color};
  font-family: "ibmRegular";
  font-size: 34px;
  font-weight: bold;
  text-align: center;
`;
