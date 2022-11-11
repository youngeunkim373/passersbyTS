import { useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";
import styled from "styled-components";

import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";

import Alert from "../../components/molecules/alert";
import CommentForm from "../../components/organisms/commentForm";
import ListDetail from "../../components/organisms/listDetatil";
import Title from "../../components/atoms/title";
import { NoticeListKeys, GetCommentProps } from "../../types/globalTypes";

interface NoticeDetailProps {
  noticeComments: GetCommentProps;
  noticeDetail: NoticeListKeys;
}

const NoticeDetail = (props: NoticeDetailProps) => {
  const [alert, setAlert] = useState({ open: false, text: "" });
  const [noticeDetail, setNoticeDetail] = useState(props.noticeDetail);

  const { data: session, status } = useSession();
  const loggedInUser = session?.user;

  const router = useRouter();
  const listId = router.query.listId!.toString();

  return (
    <div id="list-page">
      <Title>공지사항</Title>
      <Alert open={alert.open} setOpen={setAlert}>
        {alert.text}
      </Alert>
      <ThemeTableContainer component={Paper}>
        <ListDetail listDetail={noticeDetail} />
        <CommentForm comment={props.noticeComments} pageCategory="Notice" />
      </ThemeTableContainer>
    </div>
  );
};

export default NoticeDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const listId = context.query.listId;

  const noticeDetailResult = await axios.get(
    `${process.env.NEXT_PUBLIC_ENV_HOST}/api/notice`,
    {
      params: {
        path: "getNoticeDetail",
        listId: listId,
      },
    }
  );

  const noticeCommentResult = await axios.get(
    `${process.env.NEXT_PUBLIC_ENV_HOST}/api/notice`,
    {
      params: {
        path: "getNoticeComments",
        listId: listId,
        page: 1,
      },
    }
  );

  return {
    props: {
      noticeDetail: noticeDetailResult.data,
      noticeComments: noticeCommentResult.data,
    },
  };
};

const ThemeTableContainer = styled(TableContainer)<{ component: any }>`
  background: ${({ theme }) => theme.global.component.bgColor};
  margin-top: 50px;
`;
