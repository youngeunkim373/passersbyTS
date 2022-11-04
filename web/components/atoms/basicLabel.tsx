import styled from "styled-components";
import type { LabelProps } from "../../types/globalTypes";

const BasicLabel = ({ children, fontSize }: LabelProps) => {
  return <StyledLabel fontSize={fontSize}>{children}</StyledLabel>;
};

export default BasicLabel;

const StyledLabel = styled.h1<LabelProps>`
  color: ${({ theme }) => theme.global.component.pointColor};
  font-family: ibmLight;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "17px")};
  font-weight: 700;
  width: 130px;
`;
