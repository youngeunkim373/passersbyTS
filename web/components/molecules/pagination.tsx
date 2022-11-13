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
  .MuiPaginationItem-root {
    color: ${({ theme }) => theme.pagination.page};
  }

  .Mui-selected {
    background: ${({ theme }) => theme.pagination.circle};
  }

  .MuiPaginationItem-icon {
    color: ${(props) => props.theme.pagination.arrow};
  }
`;

const ThemeStack = styled(Stack)`
  color: ${({ theme }) => theme.global.component.color};
`;
