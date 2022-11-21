import { useContext, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";
import styled from "styled-components";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TableContainer from "@mui/material/TableContainer";

import Alert from "../../components/molecules/alert";
import BasicButton from "../../components/atoms/basicButton";
import CommentForm from "../../components/organisms/commentForm";
import FullStatsSection from "../../components/organisms/FullStatsSection";
import ListDetail from "../../components/organisms/listDetatil";
import Title from "../../components/atoms/title";
import YesOrNoButtons from "../../components/molecules/yesOrNoButtons";
import { BoardAnswerKeys, BoardListKeys } from "../../types/globalTypes";

import LoadingContext from "../../context/loading";

interface BoardDetailProps {
  boardAnswers: BoardAnswerKeys[];
  boardDetail: BoardListKeys;
}

const BoardDetail = (props: BoardDetailProps) => {
  const [alert, setAlert] = useState({ open: false, text: "" });
  const [chartReload, setChartReload] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const { data: session, status } = useSession();
  const loggedInUser = session?.user;

  const router = useRouter();
  const listId = router.query.listId!.toString();

  const { setLoading }: any = useContext(LoadingContext);

  const onClickButton = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedAnswer((e.currentTarget as HTMLButtonElement).id);
  };

  const onClickMakeAnswer = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (status !== "authenticated") {
      setAlert({
        open: true,
        text: "답변은 로그인 후 입력 가능합니다.",
      });
      return;
    }

    if (!selectedAnswer) {
      setAlert({
        open: true,
        text: "답변을 먼저 선택하세요.",
      });
      return;
    }

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    setLoading(true);
    await axios
      .post(
        "/api/board",
        JSON.stringify({
          path: "makeBoardAnswer",
          listId: listId,
          answerSequence: selectedAnswer,
          respondentEmail: loggedInUser!.email,
        }),
        config
      )
      .then((res) => {
        if (res.data.logResult > 0 && res.data.statsResult > 0) {
          setAlert({
            open: true,
            text: "답변이 완료되었습니다.",
          });
          setChartReload(true);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id="list-page">
      <Title>게시판</Title>
      <Alert open={alert.open} setOpen={setAlert}>
        {alert.text}
      </Alert>
      {props.boardDetail.statsOption === "all"
        ? "이 게시글은 성별, 연령, 지역별 통계 데이터를 보여줍니다. 답변할 때 이 점을 참고하세요!"
        : "이 게시글은 전체 통계 데이터만 보여줍니다."}
      <StyledFormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          {props.boardAnswers[0].answerCategory === "choices" ? (
            <>
              {props.boardAnswers.map((answer: BoardAnswerKeys) => (
                <StyledFormControlLabel
                  key={String(answer.answerSequence)}
                  value={answer.answerSequence}
                  control={<Radio />}
                  label={answer.answerContent}
                  onChange={(e: React.SyntheticEvent) =>
                    setSelectedAnswer((e.target as HTMLInputElement).value)
                  }
                />
              ))}
            </>
          ) : (
            <YesOrNoButtons
              $selectedAnswer={selectedAnswer}
              onClick={onClickButton}
            />
          )}
          <AnswerButtonContainer>
            <BasicButton type="button" onClick={onClickMakeAnswer}>
              답변하기
            </BasicButton>
          </AnswerButtonContainer>
        </RadioGroup>
      </StyledFormControl>
      <ThemeTableContainer component={Paper}>
        <ListDetail
          category={props.boardDetail.category}
          listDetail={props.boardDetail}
        />
        <FullStatsSection
          chartReload={chartReload}
          listId={listId}
          loggedInUser={loggedInUser}
          statsOption={props.boardDetail.statsOption}
        />
        <CommentForm pageCategory="Board" />
      </ThemeTableContainer>
    </div>
  );
};

export default BoardDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const listId = context.query.listId;

  const boardDetailResult = await axios.get(
    `${process.env.NEXT_PUBLIC_ENV_HOST}/api/board`,
    {
      params: {
        path: "getBoardDetail",
        listId: listId,
      },
    }
  );

  const boardAnswerResult = await axios.get(
    `${process.env.NEXT_PUBLIC_ENV_HOST}/api/board`,
    {
      params: {
        path: "getBoardAnswers",
        listId: listId,
      },
    }
  );

  return {
    props: {
      boardDetail: boardDetailResult.data,
      boardAnswers: boardAnswerResult.data.result,
    },
  };
};

const AnswerButtonContainer = styled.div`
  margin: 0 auto;
  padding-top: 20px;
`;

const StyledFormControl = styled(FormControl)`
  background: ${({ theme }) => theme.global.component.bgColor};
  border-radius: 15px;
  margin-bottom: 50px;
  margin-top: 20px;
  padding-bottom: 20px;
  padding-top: 20px;
  width: 100%;
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  padding-left: 30px;
  padding-right: 30px;

  .MuiRadio-root.Mui-checked {
    color: #9000ff;
  }

  .MuiTypography-root {
    font-family: ibmLight;
    font-weight: bold;
  }

  .MuiRadio-root {
    color: ${({ theme }) => theme.global.component.color};
  }
`;

const ThemeTableContainer = styled(TableContainer)<{ component: any }>`
  background: ${({ theme }) => theme.global.component.bgColor};
`;
