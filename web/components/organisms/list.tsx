import { useRouter } from "next/router";
import styled from "styled-components";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Divider } from "@mui/material";

import NewIcon from "../atoms/newIcon";
import ProfileImage from "../molecules/profileImage";
import { BoardListKeys } from "../../types/globalTypes";
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
      <StyledTable aria-label="simple table">
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
              <TableCell
                align="right"
                rowSpan={2}
                sx={{ minWidth: "200px", border: 0 }}
              >
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
      </StyledTable>
    </TableContainer>
  );
};

export default List;

const StyledTable = styled(Table)`
  background: ${(props) => props.theme.table.bgColor};
`;

const StyledTableBody = styled(TableBody)`
  border: ${(props) => "1px solid " + props.theme.table.bgColor};
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.table.hover};
  }
`;

const TitleTableRow = styled(TableRow)`
  height: 20px;
`;

const ContentTableRow = styled(TitleTableRow)`
  height: 50px;
  border-bottom: ${(props) => "1px solid " + props.theme.table.border};
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

const ContentTableCell = styled(TableCell)`
  border: 0;
  color: ${(props) => props.theme.table.color};
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
