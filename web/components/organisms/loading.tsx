import Image from "next/image";
import styled from "styled-components";
import Title from "../atoms/title";

const Loading = () => {
  return (
    <LoadingContainer>
      <Title>&nbsp;Loading...</Title>
      <Image
        src="/images/spinner.gif"
        alt="로딩중"
        height="70px"
        width="70px"
      />
      <div style={{ paddingBottom: "220px" }}></div>
    </LoadingContainer>
  );
};
export default Loading;

const LoadingContainer = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.global.component.bgColor};
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  left: 0;
  opacity: 0.8;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 998;
`;
