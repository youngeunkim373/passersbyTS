import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import Page from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({
  currentPage,
  pageCount,
  setCurrentPage,
}: PaginationProps) => {
  const onChangePage = (e: React.ChangeEvent<unknown>, page: number): void => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <ThemeStack spacing={2}>
        <ThemePage
          color="standard"
          count={pageCount}
          page={currentPage}
          onChange={onChangePage}
        />
      </ThemeStack>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px;
`;

const ThemePage = styled(Page)`
  .css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root {
    color: ${({ theme }) => theme.pagination.page};
  }

  .css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected {
    background: ${({ theme }) => theme.pagination.circle};
  }

  .css-g2z002-MuiSvgIcon-root-MuiPaginationItem-icon {
    color: ${(props) => props.theme.pagination.arrow};
  }
`;

const ThemeStack = styled(Stack)`
  color: ${({ theme }) => theme.global.component.color};
`;
