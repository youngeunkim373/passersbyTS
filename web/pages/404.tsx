import Image from "next/image";
import Link from "next/link";
import styled, { keyframes } from "styled-components";

const Custom404 = () => {
  return (
    <>
      {" "}
      <Container>
        <TextContainer>
          <ErrorText>404 Error</ErrorText>
          <LargeText>어머!</LargeText>
          <MediumText>길을 잃으셨군요?</MediumText>
          <SmallText>괜찮아요. 모든 길은 이어져 있답니다.</SmallText>
          <Link href={"/"}>
            <StyledAnchor>홈화면</StyledAnchor>
          </Link>
          <Link href={"member/signIn"}>
            <StyledAnchor>로그인</StyledAnchor>
          </Link>
          <Link href={"/board"}>
            <StyledAnchor>게시글</StyledAnchor>
          </Link>
        </TextContainer>
        <ImageContainer>
          <Image
            alt="404"
            height="450px"
            id="door"
            src="/images/door.png"
            width="450px"
            style={{ margin: "0" }}
          />
          <AnimationContainer>
            <Image
              alt="404"
              height="450px"
              id="person"
              src="/images/symbol.png"
              width="450px"
              style={{ margin: "0" }}
            />
          </AnimationContainer>
        </ImageContainer>
      </Container>
    </>
  );
};

export default Custom404;

const move = keyframes`
  100%{
    transform: translateX(-100px);
  }
`;

const AnimationContainer = styled.div`
  animation: ${move} 2s 1s 1;
  animation-fill-mode: forwards;
  float: left;
  height: 450px;
  position: absolute;
  left: 100px;
  top: 8px;
  width: 450px;
  z-index: 999;
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  min-width: 1000px;
  margin: 100px;
  padding-top: 100px;
  width: 100%;
`;

const ErrorText = styled.p`
  color: #bdbdbd;
  font-size: 15px;
  margin: 0;
  padding-bottom: 10px;
`;

const ImageContainer = styled.div`
  position: relative;
  #door {
    filter: ${({ theme }) =>
      theme.global.component.bgColor === "#ffffff" && "invert(15%)"};
  }
`;

const LargeText = styled.p`
  font-size: 40px;
  margin: 0;
`;

const MediumText = styled.p`
  font-size: 30px;
  margin: 0;
`;

const SmallText = styled.p`
  font-size: 20px;
  margin: 0;
  padding-top: 50px;
  padding-bottom: 10px;
`;

const StyledAnchor = styled.a`
  color: #9000ff;
  cursor: pointer;
  font-size: 17px;
  padding-right: 30px;
`;

const TextContainer = styled.div`
  float: left;
  min-width: 300px;
  padding-bottom: 70px;
`;
