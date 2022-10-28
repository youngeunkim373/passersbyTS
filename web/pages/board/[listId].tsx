import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Divider } from "@mui/material";

import Title from "../../components/atoms/title";
import Alert from "../../components/molecules/alert";
import ProfileImage from "../../components/molecules/profileImage";
import { calcDate } from "../../lib/utils/calcDate";
import NewIcon from "../../components/atoms/newIcon";
import Editor from "../../components/organisms/editor";

const BoardDetail = (props: any) => {
  const [alert, setAlert] = useState({ open: false, text: "" });
  const [boardDetail, setBoardDetail] = useState(props.boardDetail);

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
            <Divider />
            <TableRow>
              <TableCell align="left">
                <Editor value={boardDetail.listContent} readOnly={true} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BoardDetail;

export const getServerSideProps = async (context: any) => {
  const listId = context.query.listId;

  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_ENV_HOST}/api/board`,
    {
      params: {
        path: "getBoardDetail",
        listId: listId,
      },
    }
  );

  return {
    props: {
      boardDetail: result.data,
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
  border: 0;
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
