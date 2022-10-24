import styled from "styled-components";
import type { LabelProps } from "../../types/globalTypes";

const BasicLabel = ({ children }: LabelProps) => {
  return <StyledLabel>{children}</StyledLabel>;
};

export default BasicLabel;

const StyledLabel = styled.h1<LabelProps>`
  color: ${(props) => props.theme.basicLabel.color};
  font-family: ibmLight;
  font-size: 17px;
  font-weight: 700;
  width: 130px;
`;
