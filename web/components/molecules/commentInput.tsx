import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";
import styled from "styled-components";

import AddIcon from "@mui/icons-material/Add";

import Alert from "./alert";
import BasicInput from "../atoms/basicInput";

interface CommentInputProps {
  commentSequence?: string | number;
  name: string;
  pageCategory: string;
  fetchComments: Function;
}

const CommentInput = ({
  commentSequence = 0,
  name,
  pageCategory,
  fetchComments,
}: CommentInputProps) => {
  const [alert, setAlert] = useState({ open: false, text: "" });

  const { data: session, status } = useSession();

  const router = useRouter();
  const listId = router.query.listId!.toString();

  const commentInputRef = useRef<HTMLInputElement>(null);

  const onClickSubmit = async (e: React.MouseEvent) => {
    const comment = commentInputRef.current!.value;

    if (status !== "authenticated") {
      setAlert({
        open: true,
        text: "댓글은 로그인 후 입력 가능합니다.",
      });
      return;
    }

    if (!comment) {
      commentInputRef.current!.focus();
      setAlert({
        open: true,
        text: "댓글을 입력하세요.",
      });
      return;
    }

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    await axios
      .post(
        `/api/${pageCategory.toLowerCase()}`,
        JSON.stringify({
          path: `create${pageCategory}Comment`,
          table: `${pageCategory}Comment`,
          name: commentInputRef.current!.name,
          listId: listId,
          commentSequence: commentSequence,
          writerEmail: session.user!.email,
          commentContent: comment,
        }),
        config
      )
      .then((res) => {
        fetchComments(res.data.pageCount);
        commentInputRef.current!.value = "";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Alert open={alert.open} setOpen={setAlert}>
        {alert.text}
      </Alert>
      <CommentInputContainer>
        <BasicInput
          name={name}
          ref={commentInputRef}
          type="text"
          width="100%"
        />
      </CommentInputContainer>
      <AddButton type="button" onClick={onClickSubmit}>
        <AddIcon
          sx={{
            fontSize: "35px",
            color: "#9000FF",
          }}
        />
      </AddButton>
    </>
  );
};

export default CommentInput;

const AddButton = styled.button`
  cursor: pointer;
  float: left;
  padding-right: 10px;
`;

const CommentInputContainer = styled.div`
  padding-left: 30px;
  padding-right: 10px;
  width: 100%;
`;
