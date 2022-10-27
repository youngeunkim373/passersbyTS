import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import Page from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({
  pageCount,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const onChangePage = (e: React.ChangeEvent<unknown>, page: number): void => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <ThemeStack spacing={2}>
        <ThemePage
          page={currentPage}
          count={pageCount}
          color="standard"
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

const ThemeStack = styled(Stack)`
  color: ${(props) => props.theme.table.color};
`;

const ThemePage = styled(Page)`
  .css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root {
    color: ${(props) => props.theme.pagination.page};
  }

  .css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected {
    background: ${(props) => props.theme.pagination.circle};
  }

  .css-g2z002-MuiSvgIcon-root-MuiPaginationItem-icon {
    color: ${(props) => props.theme.pagination.arrow};
  }
`;
