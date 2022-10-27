import { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import Alert from "../../components/molecules/alert";
import BasicSelect from "../../components/atoms/basicSelect";
import SearchBar from "../../components/molecules/searchBar";
import Title from "../../components/atoms/title";
import List from "../../components/organisms/list";
import Pagination from "../../components/molecules/pagination";

const criteriaList = {
  registerDate: "최신순",
  viewCount: "조회수",
  answerCount: "답변수",
};

const BoardList = (props: any) => {
  const [alert, setAlert] = useState({ open: false, text: "" });
  const [boardList, setBoardList] = useState(props.boardList);
  const [criteria, setCriteria] = useState("registerDate");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(
    props.pageCount > 0 ? props.pageCount : 1
  );
  const [search, setSearch] = useState("");

  const criteriaRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    async function fetchBoardList() {
      await axios
        .get(`${process.env.NEXT_PUBLIC_ENV_HOST}/api/board`, {
          params: {
            path: "getBoardList",
            page: currentPage,
            search: search,
            criteria: criteria,
          },
        })
        .then((res) => {
          if (res.data.boardList.length > 0) {
            setBoardList(res.data.boardList);
          } else {
            setAlert({
              open: true,
              text: "검색결과가 없습니다.",
            });
            return;
          }
          if (res.data.pageCount > 0) setPageCount(res.data.pageCount);
        })
        .catch((error) => console.log(error.response));
    }

    fetchBoardList();
  }, [criteria, currentPage, search]);

  return (
    <div id="list-page">
      <Title>게시판</Title>
      <Alert open={alert.open} setOpen={setAlert}>
        {alert.text}
      </Alert>
      <CriteriaContainer>
        <BasicSelect
          options={criteriaList}
          ref={criteriaRef}
          currentValue={{
            id: "registerDate",
            text: "최신순",
          }}
          setOption={setCriteria}
        />
      </CriteriaContainer>
      <SearchContainer>
        <SearchBar setSearch={setSearch} setCurrentPage={setCurrentPage} />
      </SearchContainer>
      <br />
      <List pageCategory="board" list={boardList} />
      <PaginationContainer>
        <Pagination
          pageCount={pageCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </PaginationContainer>
    </div>
  );
};

export default BoardList;

export const getServerSideProps = async (context: any) => {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_ENV_HOST}/api/board`,
    {
      params: {
        path: "getBoardList",
      },
    }
  );

  return {
    props: {
      boardList: result.data.boardList,
      pageCount: result.data.pageCount,
    },
  };
};

const CriteriaContainer = styled.div`
  float: left;
  padding-top: 10px;
`;

const SearchContainer = styled.div`
  float: right;
`;

const PaginationContainer = styled.div`
  padding-top: 30px;
`;
