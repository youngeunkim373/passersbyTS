import { useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";
import styled from "styled-components";

import CreateIcon from "@mui/icons-material/Create";

import Alert from "../../components/molecules/alert";
import BasicSelect from "../../components/atoms/basicSelect";
import SearchBar from "../../components/molecules/searchBar";
import Title from "../../components/atoms/title";
import List from "../../components/organisms/list";
import Pagination from "../../components/molecules/pagination";
import PushButton from "../../components/atoms/pushButton";
import { BoardListKeys } from "../../types/globalTypes";

interface BoardListProps {
  boardList: BoardListKeys[];
  pageCount: number;
}

const criteriaList = {
  registerDate: "최신순",
  viewCount: "조회수",
  answerCount: "답변수",
};

const BoardList = (props: BoardListProps) => {
  const [alert, setAlert] = useState({ open: false, text: "" });
  const [boardList, setBoardList] = useState(props.boardList);
  const [criteria, setCriteria] = useState("registerDate");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(
    props.pageCount > 0 ? props.pageCount : 1
  );
  const [search, setSearch] = useState("");

  const router = useRouter();

  const { data: session, status } = useSession();

  const criteriaRef = useRef<HTMLLabelElement>(null);

  const onButtonClick = async (e: React.MouseEvent) => {
    if (status !== "authenticated") {
      setAlert({
        open: true,
        text: "로그인 후 글쓰기 가능합니다.",
      });
      return;
    }
    router.push("board/boardWrite");
  };

  useEffect(() => {
    async function fetchBoardList() {
      await axios
        .get("/api/board", {
          params: {
            path: "getBoardList",
            criteria: criteria,
            page: currentPage,
            search: search,
            take: 10,
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
      <PushButtonContainer>
        <PushButton type="button" onClick={onButtonClick}>
          글쓰기&nbsp;
          <CreateIcon />
        </PushButton>
      </PushButtonContainer>
    </div>
  );
};

export default BoardList;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_ENV_HOST}/api/board`,
    {
      params: {
        path: "getBoardList",
        criteria: "registerDate",
        page: 1,
        take: 10,
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

const PushButtonContainer = styled.div`
  position: fixed;
  top: 85%;
  right: 4.5%;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    left: 3px;
    position: relative;
    top: 5px;
  }
`;
