import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";
import styled from "styled-components";

import Alert from "../../components/molecules/Alert";
import BasicInput from "../../components/atoms/basicInput";
import BasicLabel from "../../components/atoms/basicLabel";
import FindUserInfo from "../../components/templates/FindUserInfo";
import Modal from "../../components/molecules/Modal";
import PushButton from "../../components/atoms/pushButton";
import Title from "../../components/atoms/title";
import { checkEmail } from "../../lib/utils/checkEmail";

const SignIn: React.FC = () => {
  const [alert, setAlert] = useState({ open: false, text: "" });
  const [open, setOpen] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;

    const checkEmailResult = await checkEmail(email!);
    if (checkEmailResult === false) {
      setAlert({
        open: true,
        text: "이메일의 형식을 확인하세요.",
      });
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (result!.error && result!.status === 401) {
      setAlert({
        open: true,
        text: "이메일과 비밀번호를 확인하세요.",
      });
      return;
    }

    router.replace("/");
  };

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      }
    });
  }, [router]);

  return (
    <form id="narrow-page" onSubmit={handleSubmit} method="GET">
      <Title>로그인</Title>
      <Alert open={alert.open} setOpen={setAlert}>
        {alert.text}
      </Alert>
      <Modal open={open} setOpen={setOpen}>
        <FindUserInfo />
      </Modal>
      <LabelContainer>
        <BasicLabel>이메일</BasicLabel>
      </LabelContainer>
      <BasicInput
        type="text"
        id="email"
        placeholder="이메일을 입력하세요."
        submitOnEnter={true}
        required={true}
        ref={emailInputRef}
        autoFocus={true}
      />
      <PasswordLabelContainer>
        <BasicLabel>비밀번호</BasicLabel>
      </PasswordLabelContainer>
      <BasicInput
        type="password"
        id="password"
        placeholder="비밀번호를 입력하세요."
        submitOnEnter={true}
        required={true}
        ref={passwordInputRef}
      />
      <FindUserContainer
        onClick={() => {
          setOpen(true);
        }}
      >
        아이디찾기 | 비밀번호 찾기
      </FindUserContainer>
      <ButtonContainer>
        <PushButton type="submit">로그인</PushButton>
      </ButtonContainer>
    </form>
  );
};

export default SignIn;

const LabelContainer = styled.div`
  padding-left: 10px;
`;

const PasswordLabelContainer = styled(LabelContainer)`
  padding-top: 30px;
`;

const FindUserContainer = styled.div`
  color: ${(props) => props.theme.color};
  cursor: pointer;
  float: right;
  padding-bottom: 50px;
  padding-top: 10px;
`;

const ButtonContainer = styled.div`
  padding-top: 50px;
  text-align: center;
`;
