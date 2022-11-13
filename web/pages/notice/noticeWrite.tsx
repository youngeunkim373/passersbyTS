import React, { useContext, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import axios from "axios";

import Alert from "../../components/molecules/alert";
import BasicInput from "../../components/atoms/basicInput";
import Editor from "../../components/organisms/editor";
import PushButton from "../../components/atoms/pushButton";
import Title from "../../components/atoms/title";

import LoadingContext from "../../context/loading";

const NoticeWrite = () => {
  const [alert, setAlert] = useState({ open: false, text: "" });
  const [content, setContent] = useState("");

  const { data: session } = useSession();
  const loggedInUser = session?.user;

  const router = useRouter();

  const { setLoading }: any = useContext(LoadingContext);

  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const title = titleInputRef.current!.value;

    if (!content) {
      setAlert({
        open: true,
        text: "내용을 입력하세요.",
      });
      return;
    }

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    setLoading(true);
    await axios
      .post(
        "/api/notice",
        JSON.stringify({
          path: "createNoticeContent",
          listTitle: title,
          writerEmail: loggedInUser!.email,
          listContent: content,
        }),
        config
      )
      .then((res) => {
        setLoading(false);
        router.push("/notice");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form
      id="editor-page"
      encType="multi part/form-data"
      onSubmit={handleSubmit}
      method="POST"
    >
      <Title>게시판</Title>
      <Alert open={alert.open} setOpen={setAlert}>
        {alert.text}
      </Alert>
      <BasicContainer>
        <BasicInput
          type="text"
          placeholder="제목을 입력하세요."
          ref={titleInputRef}
          width="100%"
          required={true}
          autoFocus={true}
        />
      </BasicContainer>
      <BasicContainer>
        <Editor bucket="notice" value={content} onChange={setContent} />
      </BasicContainer>
      <PushButtonContainer>
        <PushButton type="submit">등록하기</PushButton>
      </PushButtonContainer>
    </form>
  );
};

export default NoticeWrite;

const BasicContainer = styled.div`
  padding-top: 30px;
`;

const PushButtonContainer = styled.div`
  padding-top: 50px;
  text-align: center;
`;
