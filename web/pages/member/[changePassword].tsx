import { useContext, useRef, useState } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import axios from "axios";
import styled from "styled-components";

import { hashPassword } from "../../lib/utils/hashPassword";

import BasicInput from "../../components/atoms/basicInput";
import BasicLabel from "../../components/atoms/basicLabel";
import PushButton from "../../components/atoms/pushButton";
import Title from "../../components/atoms/title";
import Alert from "../../components/molecules/alert";

import LoadingContext from "../../context/loading";

const ChangePassword = () => {
  const [alert, setAlert] = useState({ open: false, text: "" });

  const router = useRouter();
  const email = router.query.changePassword;

  const { setLoading }: any = useContext(LoadingContext);

  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const password = passwordInputRef.current!.value;
    const confirm = confirmInputRef.current!.value;

    if (password !== confirm) {
      setAlert({
        open: true,
        text: "비밀번호가 일치하지 않습니다.",
      });
      return;
    }

    const hashedpassword = await hashPassword(password);

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    setLoading(true);
    await axios
      .patch(
        "/api/members",
        JSON.stringify({
          path: "changePassword",
          email,
          password: hashedpassword,
        }),
        config
      )
      .then((res) => {
        signOut();
        setLoading(false);
        router.push("/member/signIn");
      })
      .catch((error) => console.log(error.response));
  };

  return (
    <form id="page" onSubmit={handleSubmit} method="PUT">
      <Title>비밀번호 변경</Title>
      <Alert open={alert.open} setOpen={setAlert}>
        {alert.text}
      </Alert>
      <UserInfoContainer>
        <LabelContainer>
          <BasicLabel>이메일</BasicLabel>
        </LabelContainer>
        <BasicInput
          type="text"
          id="email"
          required={true}
          defaultValue={email}
          readOnly={true}
        />
        <SecondLabelContainer>
          <BasicLabel>비밀번호</BasicLabel>
        </SecondLabelContainer>
        <BasicInput
          type="password"
          id="password"
          placeholder="비밀번호를 입력하세요."
          required={true}
          ref={passwordInputRef}
        />
        <SecondLabelContainer>
          <BasicLabel>비밀번호 확인</BasicLabel>
        </SecondLabelContainer>
        <BasicInput
          type="password"
          id="confirm"
          placeholder="비밀번호를 한 번 더 입력하세요."
          required={true}
          ref={confirmInputRef}
        />
        <ButtonContainer>
          <PushButton type="submit">변경</PushButton>
        </ButtonContainer>
      </UserInfoContainer>
    </form>
  );
};

export default ChangePassword;

const ButtonContainer = styled.div`
  padding-top: 70px;
  text-align: center;
`;

const LabelContainer = styled.div`
  padding-left: 10px;
`;

const SecondLabelContainer = styled(LabelContainer)`
  padding-top: 30px;
`;

const UserInfoContainer = styled.div`
  margin: 0 auto;
  width: 300px;
`;
