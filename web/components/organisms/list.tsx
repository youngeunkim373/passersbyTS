import { useRouter } from "next/router";
import styled from "styled-components";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { BoardListKeys } from "../../types/globalTypes";
import NewIcon from "../atoms/newIcon";
import ProfileImage from "../molecules/profileImage";
import { calcDate } from "../../lib/utils/calcDate";

interface ListProps {
  pageCategory: string;
  list: BoardListKeys[];
}

const List = ({ pageCategory, list }: ListProps) => {
  const router = useRouter();

  const onClickTableRow = (listId: string) => {
    router.push(`/${pageCategory}/${listId}`);
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: "50px" }}>
      <Table aria-label="simple table">
        {list.map((row: any) => (
          <StyledTableBody
            key={row.listId}
            onClick={(e) => {
              onClickTableRow(row.listId);
            }}
          >
            <TitleTableRow>
              <TitleTableCell align="left">
                {parseInt(row.timeDiff) < 1440 && <NewIcon />}
                <TitleSpan>{row.listTitle}</TitleSpan>
              </TitleTableCell>
              <TableCell align="right" rowSpan={2} sx={{ minWidth: "200px" }}>
                <ProfileImageContainer>
                  <ProfileImage image={row.writer?.userImage} />
                </ProfileImageContainer>
                <PostInfoContainer>
                  {row.writer?.nickname}
                  <TimeDiffParagraph>
                    {calcDate(row.registerDate)}
                  </TimeDiffParagraph>
                </PostInfoContainer>
              </TableCell>
            </TitleTableRow>
            <ContentTableRow>
              <ContentTableCell align="left">
                {row.listContent
                  .replace(/<[^>]*>?/g, "")
                  .replace(/&nbsp;/gi, "")}
              </ContentTableCell>
            </ContentTableRow>
          </StyledTableBody>
        ))}
      </Table>
    </TableContainer>
  );
};

export default List;

const StyledTableBody = styled(TableBody)`
  cursor: pointer;

  &:hover: {
    background: "rgba(144, 0, 255, 0.02)";
  }
`;

const TitleTableRow = styled(TableRow)`
  border: 0;
  height: 20px;

  &:last-child td, &:last-child th: {
    border: 0;
  }
`;

const ContentTableRow = styled(TitleTableRow)`
  height: 50px;
`;

const TitleTableCell = styled(TableCell)`
  border-bottom: none;
  padding-left: 30px;
  padding-right: 30px;
  font-family: ibmLight;
  font-size: 17px;
  font-weight: bold;
`;

const ContentTableCell = styled(TableCell)`
  font-family: ibmLight;
  font-size: 17px;
  font-weight: normal;
  padding-left: 30px;
  padding-right: 10px;
  padding-top: 0px;
`;

const TitleSpan = styled.span`
  float: left;
`;

const ProfileImageContainer = styled.div`
  float: right;
`;

const PostInfoContainer = styled.div`
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
