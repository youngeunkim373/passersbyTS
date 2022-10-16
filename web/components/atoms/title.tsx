import styled from "styled-components";

interface TitleProps {
  children: string;
  color?: string;
}

const StyledH1 = styled.h1<TitleProps>`
  color: ${({ color }) => (color ? color : "#101820")};

  font-family: "ibmRegular";
  font-size: 34px;
  font-weight: bold;
  text-align: center;
`;

const Title = ({ children, color }: TitleProps) => {
  return <StyledH1 color={color}>{children}</StyledH1>;
};

export default Title;
