import axios from "axios";
import { useState, useCallback } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { signIn } from "../../store/actions/authentication";
import type { SignInProps } from "../../types/sessionTypes";

import BasicInput from "../../components/atoms/basicInput";
import Title from "../../components/atoms/title";
import BasicLabel from "../../components/atoms/basicLabel";
import PushButton from "../../components/atoms/pushButton";
import Alert from "../../components/molecules/Alert";

const SignIn: React.FC = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();
  const session = useSelector((state: RootState) => state.auth);

  const createSession = useCallback(
    ({
      email,
      nickname,
      sex,
      age,
      region,
      userRole,
      userImage,
    }: SignInProps) => {
      dispatch(
        signIn({ email, nickname, sex, age, region, userRole, userImage })
      );
    },
    [dispatch]
  );

  const onInputChange = (e: React.ChangeEvent) => {
    e.preventDefault();
    const { id, value } = e.target as HTMLInputElement;
    setInputs({ ...inputs, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .get("/api/members", {
        params: {
          path: "signIn",
          email: email,
          password: password,
        },
      })
      .then((res) => {
        if (res.data.length === 0) {
          setOpen(true);
          return;
        }

        createSession(res.data[0]);
        router.push("/");
      })
      .catch((error) => console.log(error.response));
  };

  return (
    <form
      id="page"
      onSubmit={handleSubmit}
      method="GET"
      className="narrow-width"
    >
      <Title>로그인</Title>
      <Alert open={open} setOpen={setOpen}>
        이메일과 비밀번호를 확인하세요.
      </Alert>
      <div className="PL10">
        <BasicLabel>이메일</BasicLabel>
      </div>
      <BasicInput
        type="text"
        id="email"
        value={email}
        placeholder="이메일을 입력하세요."
        onChange={onInputChange}
        submitOnEnter={true}
        required={true}
      />
      <div className="PL10 PT30">
        <BasicLabel>비밀번호</BasicLabel>
      </div>
      <BasicInput
        type="password"
        id="password"
        value={password}
        placeholder="비밀번호를 입력하세요."
        onChange={onInputChange}
        submitOnEnter={true}
        required={true}
      />
      <div
        className="pointer black PT10 PB50 right"
        onClick={() => {
          alert("아직 준비중인 기능입니다.");
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
