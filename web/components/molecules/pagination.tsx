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
      <Stack spacing={2}>
        <Page
          page={currentPage}
          count={pageCount}
          color="standard"
          onChange={onChangePage}
        />
      </Stack>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px;
`;
