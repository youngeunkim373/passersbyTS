import { useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { hashPassword } from "../../lib/hasePassword";

import BasicInput from "../../components/atoms/basicInput";
import BasicLabel from "../../components/atoms/basicLabel";
import PushButton from "../../components/atoms/pushButton";
import Title from "../../components/atoms/title";
import Alert from "../../components/molecules/Alert";

const ChangePassword = () => {
  const [alert, setAlert] = useState({ open: false, text: "" });

  const router = useRouter();
  const email = router.pathname;

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

    await axios
      .put(
        "/api/allTables",
        JSON.stringify({
          table: "Members",
          fields: {
            email: email,
            password: hashedpassword,
          },
          where: {
            email: email,
          },
        }),
        config
      )
      .then((res) => {
        router.push("/member/signIn");
      })
      .catch((error) => console.log(error.response));
  };

  return (
    <form
      id="page"
      onSubmit={handleSubmit}
      method="PUT"
      className="narrow-width"
    >
      <Title>비밀번호 변경</Title>
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
        autoFocus={true}
        defaultValue={email}
        readOnly={true}
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
      <div className="PL10 PT30">
        <BasicLabel>비밀번호 확인</BasicLabel>
      </div>
      <BasicInput
        type="password"
        id="confirm"
        placeholder="비밀번호를 한 번 더 입력하세요."
        submitOnEnter={true}
        required={true}
        ref={confirmInputRef}
      />
      <div className="align-center PT50">
        <PushButton type="submit">변경</PushButton>
      </div>
    </form>
  );
};

export default ChangePassword;
