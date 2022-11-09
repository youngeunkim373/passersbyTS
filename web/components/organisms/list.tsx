import { useRouter } from "next/router";
import styled from "styled-components";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import NewIcon from "../atoms/newIcon";
import ProfileImage from "../molecules/profileImage";
import { ListKeys } from "../../types/globalTypes";
import { calcDate } from "../../lib/utils/calcDate";

interface ListProps {
  list: ListKeys[];
  pageCategory: string;
}

const List = ({ list, pageCategory }: ListProps) => {
  const router = useRouter();

  const onClickTableRow = (listId: string) => {
    router.push(`/${pageCategory}/${listId}`);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ marginTop: "50px", minWidth: "600px" }}
    >
      <StyledTable aria-label="simple table">
        {list.map((row: ListKeys) => (
          <StyledTableBody
            key={row.listId}
            onClick={(e) => {
              onClickTableRow(row.listId);
            }}
          >
            <TitleTableRow>
              <TitleTableCell align="left">
                {calcDate(row.registerDate).dateDiff < 1440 && <NewIcon />}
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
                    {calcDate(row.registerDate).expression}
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

const ContentTableCell = styled(TableCell)`
  border: 0;
  color: ${({ theme }) => theme.global.component.color};
  font-family: ibmLight;
  font-size: 17px;
  font-weight: normal;
  padding-left: 30px;
  padding-right: 10px;
  padding-top: 0px;
`;

const PostInfoContainer = styled.div`
  color: ${({ theme }) => theme.global.component.color};
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

const StyledTable = styled(Table)`
  background: ${({ theme }) => theme.global.component.bgColor};
`;

const StyledTableBody = styled(TableBody)`
  border: ${({ theme }) => "1px solid " + theme.global.component.bgColor};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.global.component.pointBgColor};
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
  border: 0;
  color: ${({ theme }) => theme.global.component.color};
  font-family: ibmLight;
  font-size: 17px;
  font-weight: bold;
  padding-left: 30px;
  padding-right: 30px;
`;

const TitleTableRow = styled(TableRow)`
  height: 20px;
`;

const ContentTableRow = styled(TitleTableRow)`
  border-bottom: ${({ theme }) => theme.table.border};
  height: 50px;
`;
