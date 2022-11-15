import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";
import styled from "styled-components";

import CreateIcon from "@mui/icons-material/Create";

import Alert from "../../components/molecules/alert";
import List from "../../components/organisms/list";
import Pagination from "../../components/molecules/pagination";
import PushButton from "../../components/atoms/pushButton";
import SearchBar from "../../components/molecules/searchBar";
import Title from "../../components/atoms/title";
import { NoticeListKeys } from "../../types/globalTypes";

import LoadingContext from "../../context/loading";

const NoticeList = () => {
  const [alert, setAlert] = useState({ open: false, text: "" });
  const [noticeList, setNoticeList] = useState<NoticeListKeys[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const [search, setSearch] = useState<string | "">("");

  const router = useRouter();

  const { data: session, status } = useSession();
  const loggedInUser = (session as any | null)?.user;

  const { setLoading }: any = useContext(LoadingContext);

  const onButtonClick = async (e: React.MouseEvent) => {
    router.push("notice/noticeWrite");
  };

  useEffect(() => {
    async function fetchNoticeList() {
      setLoading(true);
      await axios
        .get("/api/notice", {
          params: {
            path: "getNoticeList",
            page: currentPage,
            search: search,
            take: 10,
          },
        })
        .then((res) => {
          if (res.data.noticeList.length > 0) {
            setNoticeList(res.data.noticeList);
          } else {
            setAlert({
              open: true,
              text: "검색결과가 없습니다.",
            });
            setLoading(false);
            return;
          }
          if (res.data.pageCount > 0) setPageCount(res.data.pageCount);
          setLoading(false);
        })
        .catch((error) => console.log(error.response));
    }

    fetchNoticeList();
  }, [currentPage, search, setLoading]);

  return (
    <div id="list-page">
      <Title>공지사항</Title>
      <Alert open={alert.open} setOpen={setAlert}>
        {alert.text}
      </Alert>
      <SearchContainer>
        <SearchBar setSearch={setSearch} setCurrentPage={setCurrentPage} />
      </SearchContainer>
      <br />
      <List pageCategory="notice" list={noticeList} />
      <PaginationContainer>
        <Pagination
          pageCount={pageCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </PaginationContainer>
      <PushButtonContainer userRole={loggedInUser?.role}>
        <PushButton type="button" onClick={onButtonClick}>
          글쓰기&nbsp;
          <CreateIcon />
        </PushButton>
      </PushButtonContainer>
    </div>
  );
};

export default NoticeList;

const SearchContainer = styled.div`
  float: right;
`;

const PaginationContainer = styled.div`
  padding-top: 30px;
`;

const PushButtonContainer = styled.div<{ userRole?: string | null }>`
  align-items: center;
  display: ${({ userRole }) => (userRole === "admin" ? "flex" : "none")};
  justify-content: center;
  position: fixed;
  top: 85%;
  right: 4.5%;
  z-index: 1;

  svg {
    left: 3px;
    position: relative;
    top: 5px;
  }
`;
