import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";

import BasicInput from "../../components/atoms/basicInput";
import Title from "../../components/atoms/title";
import BasicLabel from "../../components/atoms/basicLabel";
import PushButton from "../../components/atoms/pushButton";
import Alert from "../../components/molecules/Alert";
import { checkEmail } from "../../lib/checkEmail";

const SignIn: React.FC = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [alert, setAlert] = useState({ open: false, text: "" });

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

    if (result!.error) {
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
    <form
      id="page"
      onSubmit={handleSubmit}
      method="GET"
      className="narrow-width"
    >
      <Title>로그인</Title>
      <Alert open={alert.open} setAlert={setAlert}>
        {alert.text}
      </Alert>
      <div className="PL10">
        <BasicLabel>이메일</BasicLabel>
      </div>
      <BasicInput
        type="text"
        id="email"
        placeholder="이메일을 입력하세요."
        submitOnEnter={true}
        required={true}
        ref={emailInputRef}
        autoFocus={true}
      />
      <div className="PL10 PT30">
        <BasicLabel>비밀번호</BasicLabel>
      </div>
      <BasicInput
        type="password"
        id="password"
        placeholder="비밀번호를 입력하세요."
        submitOnEnter={true}
        required={true}
        ref={passwordInputRef}
      />
      <div
        className="pointer black PT10 PB50 right"
        onClick={() => {
          setAlert({
            open: true,
            text: "아직 준비중인 기능입니다.",
          });
        }}
      >
        <span className="base-font">아이디찾기 | 비밀번호 찾기</span>
      </div>
      <div className="align-center PT50">
        <PushButton type="submit">로그인</PushButton>
      </div>
    </form>
  );
};

export default SignIn;
