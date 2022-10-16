import styled from "styled-components";

interface LabelProps {
  children: string;
}

const StyledLabel = styled.h1<LabelProps>`
  width: 130px;
  color: #9000ff;
  font-family: ibmLight;
  font-size: 17px;
  font-weight: 700;
`;

const BasicLabel = ({ children }: LabelProps) => {
  return <StyledLabel>{children}</StyledLabel>;
};

export default BasicLabel;
