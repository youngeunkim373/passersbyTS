import styled from "styled-components";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import Editor from "../../components/organisms/editor";
import NewIcon from "../../components/atoms/newIcon";
import ProfileImage from "../../components/molecules/profileImage";
import { ListKeys } from "../../types/globalTypes";
import { calcDate } from "../../lib/utils/calcDate";

interface ListDetailProps {
  listDetail: ListKeys;
}

const ListDetail = ({ listDetail }: ListDetailProps) => {
  return (
    <ThemeTable aria-label="simple table">
      <TableBody>
        <TableRow>
          <TitleTableCell align="left">
            {calcDate(listDetail.registerDate).dateDiff < 1440 && <NewIcon />}
            <TitleSpan>{listDetail.listTitle}</TitleSpan>
          </TitleTableCell>
          <UserInfoTableCell align="left">
            <ProfileImageContainer>
              <ProfileImage image={listDetail.writer?.userImage} />
            </ProfileImageContainer>
            <PostInfoContainer>
              {listDetail.writer?.nickname}
              <TimeDiffParagraph>
                {calcDate(listDetail.registerDate).expression}
              </TimeDiffParagraph>
            </PostInfoContainer>
          </UserInfoTableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left" colSpan={2} sx={{ border: "0" }}>
            <Editor readOnly={true} value={listDetail.listContent} />
          </TableCell>
        </TableRow>
      </TableBody>
    </ThemeTable>
  );
};

export default ListDetail;

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

const ThemeTable = styled(Table)`
  background: ${({ theme }) => theme.global.component.bgColor};
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
  border-bottom: ${({ theme }) => theme.global.component.border};
  color: ${({ theme }) => theme.global.component.color};
  padding-left: 30px;
  padding-right: 30px;
  font-family: ibmLight;
  font-size: 17px;
  font-weight: bold;
`;

const UserInfoTableCell = styled(TableCell)`
  border-bottom: ${({ theme }) => theme.global.component.border};
`;
