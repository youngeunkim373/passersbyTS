import { Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import NewIcon from "../atoms/newIcon";
import ProfileImage from "../molecules/profileImage";
import { calcDate } from "../../lib/utils/calcDate";
import { ListKeys } from "../../types/globalTypes";

interface ListProps {
  checkBox?: boolean;
  checked?: string[];
  list: ListKeys[] | null;
  pageCategory: string;
  setAlert?: Dispatch<SetStateAction<{ open: boolean; text: string }>>;
  setChecked?: Dispatch<SetStateAction<string[]>>;
}

const List = ({
  checkBox = false,
  checked,
  list,
  pageCategory,
  setAlert,
  setChecked,
}: ListProps) => {
  const router = useRouter();

  const onClickTableRow = async (e: React.MouseEvent, listId: string) => {
    if ((e.target as HTMLInputElement).type === "checkbox") return;
    router.push(`/${pageCategory}/${listId}`);
  };

  const onChangeChecked = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newListId = e.target.value;
    if (e.target.checked === true) {
      if (checked!.length === 5) {
        setAlert!({
          open: true,
          text: "게시글은 5개까지 선택 가능합니다.",
        });
        return;
      }

      setChecked!((prev) => [...prev, newListId]);
    } else {
      const filteredChecked = checked!.filter(function (checked) {
        return checked !== newListId;
      });
      setChecked!(filteredChecked);
    }
  };

  return (
    <StyledTableContainer
      component={Paper}
      sx={{ marginTop: "50px", minWidth: "500px" }}
    >
      <StyledTable aria-label="simple table">
        {list !== null &&
          list.map((row: ListKeys) => (
            <StyledTableBody
              id={row.listId}
              key={row.listId}
              onClick={(e) => onClickTableRow(e, row.listId)}
            >
              {checkBox ? (
                <TitleTableRow>
                  <TableCell
                    align="center"
                    rowSpan={2}
                    sx={{ border: 0, width: "50px" }}
                  >
                    <Checkbox
                      sx={{
                        color: "#6f30c9",
                        "&.Mui-checked": {
                          color: "#6f30c9",
                        },
                        "& .MuiSvgIcon-root": { fontSize: 20 },
                      }}
                      value={row.listId}
                      onChange={onChangeChecked}
                      checked={checked!.includes(row.listId) ? true : false}
                    />
                  </TableCell>
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
              ) : (
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
              )}
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
    </StyledTableContainer>
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

const StyledTableContainer = styled(TableContainer)<{ component: any }>`
  box-shadow: ${({ theme }) =>
    theme.global.component.bgColor === "#ffffff"
      ? "0px 2px 1px -1px rgb(0 0 0 / 20%),0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
      : "0px 2px 1px -1px rgb(255 255 255 / 20%),0px 1px 1px 0px rgb(255 255 255 / 14%), 0px 1px 3px 0px rgb(255 255 255 / 12%)"};
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
