import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import styled from "styled-components";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import Alert from "../../components/molecules/alert";
import CommentForm from "../../components/organisms/commentForm";
import Editor from "../../components/organisms/editor";
import NewIcon from "../../components/atoms/newIcon";
import ProfileImage from "../../components/molecules/profileImage";
import Title from "../../components/atoms/title";
import { calcDate } from "../../lib/utils/calcDate";
import { useRouter } from "next/router";

const BoardDetail = (props: any) => {
  const [alert, setAlert] = useState({ open: false, text: "" });
  const [boardDetail, setBoardDetail] = useState(props.boardDetail);
  const [boardComment, setBoardComment] = useState(props.boardComment.comments);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(
    props.boardComment.pageCount > 0 ? props.boardComment.pageCount : 1
  );

  const router = useRouter();
  const listId = router.query.listId;

  const { data: session, status } = useSession();

  useEffect(() => {
    async function fetchBoardComment() {
      await axios
        .get(`${process.env.NEXT_PUBLIC_ENV_HOST}/api/board`, {
          params: {
            path: "getBoardComment",
            listId: listId,
            page: currentPage,
          },
        })
        .then((res) => {
          setBoardComment(res.data.comments);
        })
        .catch((error) => console.log(error.response));
    }

    fetchBoardComment();
  }, [listId, currentPage]);

  return (
    <div id="list-page">
      <Title>게시판</Title>
      <Alert open={alert.open} setOpen={setAlert}>
        {alert.text}
      </Alert>
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
        <CommentForm
          comments={boardComment}
          listWriter={boardDetail.writer}
          pageCount={pageCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
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
        path: "getBoardComment",
        listId: listId,
      },
    }
  );

  return {
    props: {
      boardDetail: boardDetailResult.data,
      boardComment: boardCommentResult.data,
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
