import { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import BasicSelect from "../atoms/basicSelect";
import List from "../organisms/list";
import Pagination from "../molecules/pagination";
import SearchBar from "../molecules/searchBar";
import { SessionDatas } from "../../types/globalTypes";
import Title from "../atoms/title";

interface MyProfileProps {
  api?: string;
  loggedInUser: SessionDatas;
  title?: string;
}

const criteriaList = {
  registerDate: "최신순",
  viewCount: "조회수",
  answerCount: "답변수",
};

const MyBoard = ({ loggedInUser }: MyProfileProps) => {
  return (
    <BoardsContainer>
      <MyList title="내 질문" api="board" loggedInUser={loggedInUser} />
      <MyList title="내 답변" api="setting" loggedInUser={loggedInUser} />
    </BoardsContainer>
  );
};

export default MyBoard;

const MyList = ({ api, loggedInUser, title }: MyProfileProps) => {
  const [boardList, setBoardList] = useState([]);
  const [criteria, setCriteria] = useState("registerDate");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [search, setSearch] = useState("");

  const criteriaRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    async function fetchBoardList() {
      await axios
        .get(`/api/${api}`, {
          params: {
            path: "getBoardList",
            criteria: criteria,
            page: currentPage,
            search: search,
            take: 5,
            email: loggedInUser.email,
          },
        })
        .then((res) => {
          if (res.data.boardList.length > 0) {
            setBoardList(res.data.boardList);
          }
          if (res.data.pageCount > 0) setPageCount(res.data.pageCount);
        })
        .catch((error) => console.log(error.response));
    }

    fetchBoardList();
  }, [api, criteria, currentPage, loggedInUser.email, search]);

  return (
    <MyListContainer>
      <Title>{title!}</Title>
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
      {boardList.length > 0 ? (
        <>
          <List pageCategory="board" list={boardList} />
          <PaginationContainer>
            <Pagination
              pageCount={pageCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </PaginationContainer>
        </>
      ) : (
        <NoDataContainer>아직 등록한 게시글이 없습니다.</NoDataContainer>
      )}
    </MyListContainer>
  );
};

const BoardsContainer = styled.div`
  background: ${({ theme }) => theme.global.component.bgColor};
  padding: 50px;
`;

const CriteriaContainer = styled.div`
  float: left;
  padding-top: 10px;
`;

const MyListContainer = styled.div`
  padding: 50px;
`;

const NoDataContainer = styled.div`
  background: ${({ theme }) => theme.box.simpleBox.bgColor};
  font-family: "ibmLight";
  font-size: 17px;
  font-weight: bold;
  margin: 70px 0px 0px 0px;
  padding: 30px;
  text-align: center;
`;

const PaginationContainer = styled.div`
  padding-top: 30px;
`;

const SearchContainer = styled.div`
  float: right;
`;
