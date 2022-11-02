import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import BasicButton from "../../components/atoms/basicButton";
import CommentForm from "../../components/organisms/commentForm";
import Editor from "../../components/organisms/editor";
import NewIcon from "../../components/atoms/newIcon";
import ProfileImage from "../../components/molecules/profileImage";
import Title from "../../components/atoms/title";
import { calcDate } from "../../lib/utils/calcDate";
import { BoardAnswerKeys } from "../../types/globalTypes";
import YesOrNoButtons from "../../components/molecules/yesOrNoButtons";

const BoardDetail: React.FC = (props: any) => {
  const [boardDetail, setBoardDetail] = useState(props.boardDetail);
  const [boardAnswers, setBoardAnswers] = useState(props.boardAnswers);

  const onClickMakeAnswer = (e: React.MouseEvent) => {
    console.log(e);
  };

  return (
    <div id="list-page">
      <Title>게시판</Title>
      <StyledFormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          {boardAnswers[0].answerCategory === "choices" ? (
            <>
              {boardAnswers.map((answer: BoardAnswerKeys) => (
                <StyledFormControlLabel
                  key={answer.answerSequence}
                  value={answer.answerSequence}
                  control={<Radio />}
                  label={answer.answerContent}
                />
              ))}
              <AnswerButtonContainer>
                <BasicButton type="button" onClick={onClickMakeAnswer}>
                  답변하기
                </BasicButton>
              </AnswerButtonContainer>
            </>
          ) : (
            <YesOrNoButtons />
          )}
        </RadioGroup>
      </StyledFormControl>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TitleTableCell align="left">
                {calcDate(boardDetail.registerDate).dateDiff < 1440 && (
                  <NewIcon />
                )}
                <TitleSpan>{boardDetail.listTitle}</TitleSpan>
              </TitleTableCell>
              <TableCell align="left">
                <ProfileImageContainer>
                  <ProfileImage image={boardDetail.writer?.userImage} />
                </ProfileImageContainer>
                <PostInfoContainer>
                  {boardDetail.writer?.nickname}
                  <TimeDiffParagraph>
                    {calcDate(boardDetail.registerDate).expression}
                  </TimeDiffParagraph>
                </PostInfoContainer>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" colSpan={2} sx={{ border: "0" }}>
                <Editor value={boardDetail.listContent} readOnly={true} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <CommentForm comment={props.boardComments} pageCategory="Board" />
      </TableContainer>
    </div>
  );
};

export default BoardDetail;

export const getServerSideProps = async (context: any) => {
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

  const boardCommentResult = await axios.get(
    `${process.env.NEXT_PUBLIC_ENV_HOST}/api/board`,
    {
      params: {
        path: "getBoardComments",
        listId: listId,
        page: 1,
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
      boardComments: boardCommentResult.data,
      boardAnswers: boardAnswerResult.data.result,
    },
  };
};

const AnswerButtonContainer = styled.div`
  margin: 0 auto;
  padding-top: 20px;
`;

const PostInfoContainer = styled.div`
  color: ${(props) => props.theme.table.color};
  float: right;
  font-family: ibmLight;
  font-size: 17px;
  font-weight: bold;
  padding-right: 15px;
  padding-top: 2px;
`;

const ProfileImageContainer = styled.div`
  float: right;
`;

const StyledFormControl = styled(FormControl)`
  background: rgba(255, 255, 255, 0.6);
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

  .css-vqmohf-MuiButtonBase-root-MuiRadio-root.Mui-checked {
    color: #9000ff;
  }

  .css-ahj2mt-MuiTypography-root {
    font-family: ibmLight;
    font-weight: bold;
  }
`;

const TimeDiffParagraph = styled.div`
  font-size: 12px;
  font-weight: normal;
  padding-top: 10px;
`;

const TitleSpan = styled.span`
  float: left;
`;

const TitleTableCell = styled(TableCell)`
  color: ${(props) => props.theme.table.color};
  padding-left: 30px;
  padding-right: 30px;
  font-family: ibmLight;
  font-size: 17px;
  font-weight: bold;
`;
