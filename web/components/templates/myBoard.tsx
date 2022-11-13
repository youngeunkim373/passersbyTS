import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import styled from "styled-components";

import BasicSelect from "../atoms/basicSelect";
import List from "../organisms/list";
import Pagination from "../molecules/pagination";
import PushButton from "../atoms/pushButton";
import SearchBar from "../molecules/searchBar";
import Title from "../atoms/title";
import { BoardListKeys, SessionDatas } from "../../types/globalTypes";

import LoadingContext from "../../context/loading";

interface MyProfileProps {
  api?: string;
  boardList?: BoardListKeys[];
  checkBox?: boolean;
  currentPage?: number;
  loggedInUser: SessionDatas;
  pageCount?: number;
  title?: string;
  fetchAnswerList?: Function;
  fetchQuestionList?: Function;
  setAlert: Dispatch<SetStateAction<{ open: boolean; text: string }>>;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
  setOption?: Dispatch<SetStateAction<string>>;
  setSearch?: Dispatch<SetStateAction<string>>;
}

const criteriaList = {
  registerDate: "최신순",
  viewCount: "조회수",
  answerCount: "답변수",
};

const MyBoard = ({ loggedInUser, setAlert }: MyProfileProps) => {
  const [questionList, setQuestionList] = useState([]);
  const [answerList, setAnswerList] = useState([]);
  const [questionPageCount, setQuestionPageCount] = useState(1);
  const [answerPageCount, setAnswerPageCount] = useState(1);
  const [questionCriteria, setQuestionCriteria] = useState("registerDate");
  const [answerCriteria, setAnswerCriteria] = useState("registerDate");
  const [questionCurrentPage, setQuestionCurrentPage] = useState(1);
  const [answerCurrentPage, setAnswerCurrentPage] = useState(1);
  const [questionSearch, setQuestionSearch] = useState("");
  const [answerSearch, setAnswerSearch] = useState("");

  const { setLoading }: any = useContext(LoadingContext);

  const fetchQuestionList = useCallback(async () => {
    setLoading(true);
    await axios
      .get(`/api/board`, {
        params: {
          path: "getBoardList",
          criteria: questionCriteria,
          page: questionCurrentPage,
          search: questionSearch,
          take: 5,
          email: loggedInUser.email,
        },
      })
      .then((res) => {
        setQuestionList(res.data.boardList);
        setQuestionPageCount(res.data.pageCount);
        setLoading(false);
      })
      .catch((error) => console.log(error.response));
  }, [
    loggedInUser.email,
    questionCriteria,
    questionCurrentPage,
    questionSearch,
    setLoading,
  ]);

  const fetchAnswerList = useCallback(async () => {
    setLoading(true);
    await axios
      .get(`/api/setting`, {
        params: {
          path: "getBoardList",
          criteria: answerCriteria,
          page: answerCurrentPage,
          search: answerSearch,
          take: 5,
          email: loggedInUser.email,
        },
      })
      .then((res) => {
        setAnswerList(res.data.boardList);
        setAnswerPageCount(res.data.pageCount);
        setLoading(false);
      })
      .catch((error) => console.log(error.response));
  }, [
    answerCriteria,
    answerCurrentPage,
    answerSearch,
    loggedInUser.email,
    setLoading,
  ]);

  useEffect(() => {
    fetchQuestionList();
    fetchAnswerList();
  }, [fetchQuestionList, fetchAnswerList]);

  return (
    <BoardsContainer>
      <MyList
        title="내 질문"
        api="board"
        boardList={questionList}
        checkBox={true}
        currentPage={questionCurrentPage}
        loggedInUser={loggedInUser}
        pageCount={questionPageCount}
        setAlert={setAlert}
        setCurrentPage={setQuestionCurrentPage}
        setOption={setQuestionCriteria}
        setSearch={setQuestionSearch}
        fetchAnswerList={fetchAnswerList}
        fetchQuestionList={fetchQuestionList}
      />
      <MyList
        title="내 답변"
        api="setting"
        boardList={answerList}
        checkBox={false}
        currentPage={answerCurrentPage}
        loggedInUser={loggedInUser}
        pageCount={answerPageCount}
        setAlert={setAlert}
        setCurrentPage={setAnswerCurrentPage}
        setOption={setAnswerCriteria}
        setSearch={setAnswerSearch}
      />
    </BoardsContainer>
  );
};

export default MyBoard;

const MyList = ({
  api,
  boardList,
  checkBox,
  currentPage,
  pageCount,
  title,
  fetchAnswerList,
  fetchQuestionList,
  setAlert,
  setCurrentPage,
  setOption,
  setSearch,
}: MyProfileProps) => {
  const [checked, setChecked] = useState<string[]>([]);

  const { setLoading }: any = useContext(LoadingContext);

  const criteriaRef = useRef<HTMLLabelElement>(null);

  const onButtonDelete = async (e: React.MouseEvent) => {
    setLoading(true);
    await axios
      .delete("/api/setting", {
        data: {
          path: "deleteBoardList",
          listIdList: checked,
        },
      })
      .then((res) => {
        fetchQuestionList!();
        fetchAnswerList!();
        setChecked([]);
        setLoading(false);
      })
      .catch((error) => console.log(error.response));
  };

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
          setOption={setOption}
        />
      </CriteriaContainer>
      <SearchContainer>
        <SearchBar setSearch={setSearch!} setCurrentPage={setCurrentPage} />
      </SearchContainer>
      <br />
      {boardList!.length > 0 ? (
        <>
          <List
            list={boardList!}
            checkBox={checkBox}
            checked={checked}
            pageCategory="board"
            setAlert={setAlert}
            setChecked={setChecked}
          />
          <PaginationContainer>
            <Pagination
              pageCount={pageCount!}
              currentPage={currentPage!}
              setCurrentPage={setCurrentPage!}
            />
            {api === "board" && (
              <ButtonContainer>
                <PushButton type="button" onClick={onButtonDelete}>
                  삭제하기
                </PushButton>
              </ButtonContainer>
            )}
          </PaginationContainer>
        </>
      ) : (
        <NoDataContainer>
          아직 {api === "board" ? "등록한" : "답변한"} 게시글이 없습니다.
        </NoDataContainer>
      )}
    </MyListContainer>
  );
};

const BoardsContainer = styled.div`
  background: ${({ theme }) => theme.global.component.bgColor};
  padding: 50px;
`;

const ButtonContainer = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.global.component.bgColor};
  display: flex;
  float: right;
  justify-content: right;
  margin-top: 30px;
  position: relative;
  right: 0;
  top: -80px;
  z-index: 999;
`;

const CriteriaContainer = styled.div`
  float: left;
  padding-top: 10px;
`;

const MyListContainer = styled.div`
  padding: 30px;
  text-align: center;
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
