import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import CommentForm from "../../components/organisms/commentForm";
import Editor from "../../components/organisms/editor";
import NewIcon from "../../components/atoms/newIcon";
import ProfileImage from "../../components/molecules/profileImage";
import Title from "../../components/atoms/title";
import { calcDate } from "../../lib/utils/calcDate";

const BoardDetail: React.FC = (props: any) => {
  const [boardDetail, setBoardDetail] = useState(props.boardDetail);

  return (
    <div id="list-page">
      <Title>게시판</Title>
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

  return {
    props: {
      boardDetail: boardDetailResult.data,
      boardComments: boardCommentResult.data,
    },
  };
};

const ProfileImageContainer = styled.div`
  float: right;
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

const TimeDiffParagraph = styled.div`
  font-size: 12px;
  font-weight: normal;
  padding-top: 10px;
`;

const TitleTableCell = styled(TableCell)`
  color: ${(props) => props.theme.table.color};
  padding-left: 30px;
  padding-right: 30px;
  font-family: ibmLight;
  font-size: 17px;
  font-weight: bold;
`;

const TitleSpan = styled.span`
  float: left;
`;
