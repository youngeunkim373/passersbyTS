import { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import styled from "styled-components";

import useMediaQuery from "@mui/material/useMediaQuery";
import { Divider } from "@mui/material";

import Alert from "../components/molecules/alert";
import BasicButton from "../components/atoms/basicButton";
import FullCarousel from "../components/molecules/fullCarousel";
import List from "../components/organisms/list";
import PushButton from "../components/atoms/pushButton";
import SmallBox from "../components/atoms/smallBox";
import Title from "../components/atoms/title";
import { BoardListKeys } from "../types/globalTypes";

import LoadingContext from "../context/loading";

const Home = () => {
  const [alert, setAlert] = useState({ open: false, text: "" });
  const [boardList, setBoardList] = useState<BoardListKeys[]>([]);
  const [criteria, setCriteria] = useState("registerDate");

  const matches2 = useMediaQuery("(max-width:850px)");
  const matches3 = useMediaQuery("(max-width:1200px)");

  const router = useRouter();

  const { setLoading }: any = useContext(LoadingContext);

  const onClickCategory = useMemo(() => {
    return async (e: React.MouseEvent) => {
      router.push({
        pathname: "/board",
        query: { category: e.currentTarget.id },
      });
    };
  }, [router]);

  function bindCategory(arr: any[], number: number): any[] {
    let bind = [];
    for (var i = 0; i < arr.length; i += number)
      bind.push(arr.slice(i, i + number));
    return bind;
  }

  const categories = useMemo(() => {
    return [
      <CategoryBox key="job" id="job" onClick={onClickCategory}>
        <SmallBox
          background="#c2bae2"
          color="#151515"
          height="210px"
          width="150px"
        >
          <CardContainer>
            <CardTitle>직장/일</CardTitle>
            <Image
              alt="job"
              height="100px"
              src="/images/briefcase.png"
              width="100px"
            />
            <CardDescription>우당탕탕 직장생활</CardDescription>
            <br />
          </CardContainer>
        </SmallBox>
      </CategoryBox>,
      <CategoryBox key="love" id="love" onClick={onClickCategory}>
        <SmallBox
          background="#f3c1cc"
          color="#151515"
          height="210px"
          width="150px"
        >
          <CardContainer>
            <CardTitle>연애/결혼</CardTitle>
            <Image
              alt="love"
              height="100px"
              src="/images/heart-attack.png"
              width="100px"
            />
            <CardDescription>연애 나만 힘들어?</CardDescription>
            <br />
          </CardContainer>
        </SmallBox>
      </CategoryBox>,
      <CategoryBox key="family" id="family" onClick={onClickCategory}>
        <SmallBox
          background="#1390d9"
          color="#151515"
          height="210px"
          width="150px"
        >
          <CardContainer>
            <CardTitle>가족</CardTitle>
            <Image
              alt="family"
              height="100px"
              src="/images/family.png"
              width="100px"
            />
            <CardDescription>가족, 가깝고도 먼...!</CardDescription>
            <br />
          </CardContainer>
        </SmallBox>
      </CategoryBox>,
      <CategoryBox
        key="relationship"
        id="relationship"
        onClick={onClickCategory}
      >
        <SmallBox
          background="#f0c872"
          color="#151515"
          height="210px"
          width="150px"
        >
          <CardContainer>
            <CardTitle>인간관계</CardTitle>
            <Image
              alt="relationship"
              height="100px"
              src="/images/planet-earth.png"
              width="100px"
            />
            <CardDescription>
              우리 같은 행성인...
              <br />
              <br />
              맞죠?
            </CardDescription>
            <br />
          </CardContainer>
        </SmallBox>
      </CategoryBox>,
      <CategoryBox key="parenting" id="parenting" onClick={onClickCategory}>
        <SmallBox
          background="#84d9b7"
          color="#151515"
          height="210px"
          width="150px"
        >
          <CardContainer>
            <CardTitle>임신/육아</CardTitle>
            <Image
              alt="parenting"
              height="100px"
              src="/images/rocking-horse.png"
              width="100px"
            />
            <CardDescription>
              성인체력 x 3<br />
              <br />= 애들체력
            </CardDescription>
            <br />
          </CardContainer>
        </SmallBox>
      </CategoryBox>,
      <CategoryBox key="school" id="school" onClick={onClickCategory}>
        <SmallBox
          background="#ec9ca3"
          color="#151515"
          height="210px"
          width="150px"
        >
          <CardContainer>
            <CardTitle>학교생활</CardTitle>
            <Image
              alt="school"
              height="100px"
              src="/images/school.png"
              width="100px"
            />
            <CardDescription>졸업이라는 출소를..!</CardDescription>
            <br />
          </CardContainer>
        </SmallBox>
      </CategoryBox>,
      <CategoryBox key="culture" id="culture" onClick={onClickCategory}>
        <SmallBox
          background="#4979cc"
          color="#151515"
          height="210px"
          width="150px"
        >
          <CardContainer>
            <CardTitle>문화생활</CardTitle>
            <Image
              alt="culture"
              height="100px"
              src="/images/color-palette.png"
              width="100px"
            />
            <CardDescription>이거 하려고 돈 번다</CardDescription>
            <br />
          </CardContainer>
        </SmallBox>
      </CategoryBox>,
      <CategoryBox key="etc" id="etc" onClick={onClickCategory}>
        <SmallBox
          background="#27aa80"
          color="#151515"
          height="210px"
          width="150px"
        >
          <CardContainer>
            <CardTitle>기타</CardTitle>
            <Image
              alt="etc"
              height="100px"
              src="/images/guitar.png"
              width="100px"
            />
            <CardDescription>기타 ^^!</CardDescription>
            <br />
          </CardContainer>
        </SmallBox>
      </CategoryBox>,
    ];
  }, [onClickCategory]);

  useEffect(() => {
    async function fetchBoardList() {
      setLoading(true);
      await axios
        .get("/api/board", {
          params: {
            path: "getBoardList",
            category: undefined,
            criteria: criteria,
            page: 1,
            search: "",
            take: 5,
          },
        })
        .then((res) => {
          if (res.data.boardList.length > 0) {
            setBoardList(res.data.boardList);
          }
          setLoading(false);
        })
        .catch((error) => console.log(error.response));
    }

    fetchBoardList();
  }, [criteria, setLoading]);

  return (
    <Container>
      <Alert open={alert.open} setOpen={setAlert}>
        {alert.text}
      </Alert>
      <CarouselContainer>
        <FullCarousel banners={banners} />
      </CarouselContainer>
      <MembershipContainer>
        <Membershiptitle>결정하기가 쉽지 않으신가요?</Membershiptitle>
        <StyledDivider />
        <h3>
          결정을 내렸다고 생각했지만 막상 행동으로 옮기기가 머뭇거려질 때가
          있죠.
          <br /> 주변사람들과 얘기를 나눠봐도 뾰족한 해답은 없고,
          <br /> 나와 다른 환경에 있는 사람들의 조언은 시원하지 않죠.
          <br />
          <span className="purple">길 가는 사람들</span>과 함께라면 나와 비슷한
          고민을 하는 사람들을 쉽게 찾을 수 있습니다.
        </h3>
        <br />
        <Link href="/member/signUp">
          <a>
            <PushButton>시작하기</PushButton>
          </a>
        </Link>
      </MembershipContainer>
      <BoardContainer>
        <BoardTitle>
          결정하기가 쉽지 않으신가요?
          <br />
          지금 세상 사람들은 무엇을 궁금해할까요?
        </BoardTitle>
        <h3>
          다른 사람들의 관심사에 귀를 기울여보세요.
          <br /> 어쩌면 내가 갖고있던 의문이 해결될 수도 있습니다!
        </h3>
        <StyledDivider />
        <BasicButton
          id="latest"
          width="120px"
          height="40px"
          fontSize="20px"
          onClick={() => setCriteria("registerDate")}
        >
          최신등록
        </BasicButton>
        <BasicButton
          id="bestView"
          width="120px"
          height="40px"
          fontSize="20px"
          onClick={() => setCriteria("viewCount")}
        >
          최다조회
        </BasicButton>
        <BasicButton
          id="bestAnswer"
          width="120px"
          height="40px"
          fontSize="20px"
          onClick={() => setCriteria("answerCount")}
        >
          최다답변
        </BasicButton>
        <ListContainer>
          <List pageCategory="board" list={boardList} />
        </ListContainer>
      </BoardContainer>
      <CategoryContainer>
        <Title>카테고리별 게시글</Title>
        <StyledDivider />
        <CategoryCarouselContainer>
          <FullCarousel
            banners={
              matches2
                ? bindCategory(categories, 2)
                : matches3
                ? bindCategory(categories, 3)
                : bindCategory(categories, 4)
            }
            height="300px"
          />
        </CategoryCarouselContainer>
      </CategoryContainer>
    </Container>
  );
};

export default Home;

const BannerContainer = styled.div`
  background-position: 85% 30px;
  background-repeat: no-repeat;
  background-size: contain;
  height: 400px;
  min-width: 1200px;
  padding: 10px 0px;
  width: 100%;
`;

const BannerMainContent = styled.p`
  font-family: ibmLight;
  font-size: 25px;
  font-weight: bold;
  left: 10vw;
  position: absolute;
  top: 90px;
`;

const BannerSmallContent = styled.p`
  font-family: ibmLight;
  font-size: 17px;
  font-weight: bold;
  left: 10vw;
  position: absolute;
  top: 200px;
`;

const BannerTitle = styled.span`
  font-family: ibmRegular;
  font-size: 33px;
  font-weight: bold;
  left: 10vw;
  position: absolute;
  top: 50px;
`;

const BoardContainer = styled.div`
  min-width: 600px;
  text-align: center;
  padding-top: 100px;
`;

const BoardTitle = styled.h1`
  font-family: ibmRegular;
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CardContainer = styled.div`
  line-height: 0.6;
  margin: 0 auto;
`;

const CardTitle = styled.p`
  font-family: ibmRegular;
  font-size: 25px;
  font-weight: bold;
`;

const CardDescription = styled.p`
  font-family: ibmLight;
  font-size: 17px;
  font-weight: bold;
`;

const CarouselContainer = styled.div`
  background-position: 85%;
  background-repeat: no-repeat;
  background-size: contain;
  height: 380px;
  min-width: 700px;
`;

const CategoryBox = styled.div`
  cursor: pointer;
  float: left;
  margin: 20px;
`;

const CategoryCarouselContainer = styled.div`
  margin: 0 auto;
  min-width: 580px;
  width: 80%;
`;

const CategoryContainer = styled.div`
  min-width: 700px;
  padding-top: 100px;
`;

const Container = styled.div`
  margin: 0 auto;
  min-width: 700px;
  width: 100vw;
`;

const ListContainer = styled.div`
  margin: 0 auto;
  min-width: 500px;
  width: 60%;
`;

const MembershipContainer = styled.div`
  background: ${({ theme }) => theme.global.component.bgColor};
  background-image: url("/images/Q&A.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  padding: 150px;
  text-align: center;
`;

const Membershiptitle = styled.h1`
  margin-bottom: 20px;
  font-family: ibmRegular;SmallBox
  font-size: 50px;
  font-weight: bold;
`;

const StyledDivider = styled(Divider)`
  background: #9000ff;
  height: 2px;
  margin: 0 auto;
  margin-bottom: 30px;
  width: 100px;
`;

const banners = [
  <BannerContainer
    key={1}
    style={{
      backgroundColor: "#f4f0fa",
      backgroundImage: 'url("/images/carousel1.png")',
    }}
  >
    <BannerTitle>
      <b style={{ color: "#9000ff" }}>선택</b>이 힘드신가요?
    </BannerTitle>
    <BannerMainContent>
      인생은 선택의 연속,
      <br />
      선택이 힘들 때는 길가는 사람들에게 물어보세요!
    </BannerMainContent>
    <BannerSmallContent>
      나는 어디쯤에 속해있을까?
      <br />
      질문에 답변하면서 내 의견이 어디쯤에 속해있는지 알 수 있어요.
      <br />
      통계자료를 통해 보는 내 의견이 궁금하지 않으신가요?
      <br />
      <b style={{ color: "#9000ff" }}>길 가는 사람들</b>
      에서 답을 얻고 궁금증도 해결하세요!
    </BannerSmallContent>
  </BannerContainer>,
  <BannerContainer
    key={2}
    style={{
      backgroundColor: "#FFE8F5",
      backgroundImage: 'url("/images/best.png")',
    }}
  >
    <BannerTitle>
      Is it difficult for you to <b style={{ color: "#ff0046" }}>choose</b>?
    </BannerTitle>
    <BannerMainContent>
      Life is full of choices.
      <br /> When you have difficulty in choosing, ask Passersby!
    </BannerMainContent>
    <BannerSmallContent>
      Where do I belong?
      <br />
      You can realize where your opinion belongs on Passersby.
      <br />
      <span>
        Don&apos;t you want to know other&apos;s opinions with statistical data?
      </span>
      <br />
      <b style={{ color: "#ff0046" }}>Passersby</b>
      &nbsp;can answer it!
    </BannerSmallContent>
  </BannerContainer>,
];
