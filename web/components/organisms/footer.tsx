import styled from "styled-components";
import { Divider } from "@mui/material";

const Footer = () => {
  return (
    <FooterContainer>
      {/* <p>
          길 가는 사람들 | <b>제작자</b> 김영은 | <b>대표번호</b> 010-XXXX-XXXX
          <br />
          <b>주소</b> 서울특별시 성동구 XX동 XX로
        </p> */}
      <p>Published by 0=2</p>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  align-items: center;
  background: ${({ theme }) => theme.menu.bgColor};
  color: ${({ theme }) => theme.global.component.color};
  display: flex;
  justify-content: center;
`;
