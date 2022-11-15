import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";

import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";

import Alert from "../../components/molecules/alert";
import CommentForm from "../../components/organisms/commentForm";
import ListDetail from "../../components/organisms/listDetatil";
import Title from "../../components/atoms/title";
import { NoticeListKeys, GetCommentProps } from "../../types/globalTypes";

import LoadingContext from "../../context/loading";

const NoticeDetail = () => {
  const [alert, setAlert] = useState({ open: false, text: "" });
  const [noticeDetail, setNoticeDetail] = useState<NoticeListKeys | []>([]);

  const router = useRouter();
  const listId: string = String(router.query.listId);

  const { setLoading }: any = useContext(LoadingContext);

  useEffect(() => {
    async function fetchNoticeList() {
      setLoading(true);
      await axios
        .get("/api/notice", {
          params: {
            path: "getNoticeDetail",
            listId: listId,
          },
        })
        .then((res) => {
          setNoticeDetail(res.data);
          setLoading(false);
        })
        .catch((error) => console.log(error.response));
    }

    fetchNoticeList();
  }, [listId, setLoading]);

  return (
    <div id="list-page">
      <Title>공지사항</Title>
      <Alert open={alert.open} setOpen={setAlert}>
        {alert.text}
      </Alert>
      <ThemeTableContainer component={Paper}>
        <ListDetail listDetail={noticeDetail as NoticeListKeys} />
        <CommentForm pageCategory="Notice" />
      </ThemeTableContainer>
    </div>
  );
};

export default NoticeDetail;

const ThemeTableContainer = styled(TableContainer)<{ component: any }>`
  background: ${({ theme }) => theme.global.component.bgColor};
  margin-top: 50px;
`;
