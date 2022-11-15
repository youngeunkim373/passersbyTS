import { useContext, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";

import TextField from "@mui/material/TextField";

import Alert from "../../components/molecules/alert";
import BasicButton from "../../components/atoms/basicButton";
import BasicInput from "../../components/atoms/basicInput";
import BasicLabel from "../../components/atoms/basicLabel";
import BasicSelect from "../../components/atoms/basicSelect";
import PushButton from "../../components/atoms/pushButton";
import Title from "../../components/atoms/title";

import { checkEmail } from "../../lib/utils/checkEmail";
import { hashPassword } from "../../lib/utils/hashPassword";

import LoadingContext from "../../context/loading";

const sexList = { F: "여성", M: "남성" };
const regionList = {
  Seoul: "서울특별시",
  Gyeonggi: "경기도",
  Gwangju: "광주광역시",
  Daegu: "대구광역시",
  Daejeon: "대전광역시",
  Busan: "부산광역시",
  Incheon: "인천광역시",
  Ulsan: "울산광역시",
  Sejong: "세종특별자치시",
  Jeju: "제주특별자치도",
  Gangwon: "강원도",
  Gyeongsang: "경상도",
  Jeolla: "전라도",
  Chungcheong: "충청도",
};

const SignUp: React.FC = () => {
  const [alert, setAlert] = useState({ open: false, text: "" });
  const [verifyInput, setVerifyInput] = useState(false);
  const [verifyComplete, setVerifyComplete] = useState(false);
  const [verifyNumber, setVerifyNumber] = useState(null);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const sexSelectRef = useRef<HTMLLabelElement>(null);
  const regionSelectRef = useRef<HTMLLabelElement>(null);
  const verifyInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const { setLoading }: any = useContext(LoadingContext);

  const handleSendMail = async (e: React.FormEvent) => {
    setLoading(true);

    if (verifyComplete === true) {
      setAlert({
        open: true,
        text: "이미 본인인증이 완료되었습니다.",
      });
      setLoading(false);
      return;
    }

    const email = emailInputRef.current?.value;

    const checkEmailResult = await checkEmail(email!);
    if (checkEmailResult === false) {
      setAlert({
        open: true,
        text: "이메일의 형식을 확인하세요.",
      });
      setLoading(false);
      return;
    }

    await axios
      .get("/api/members", {
        params: {
          path: "sendEmail",
          email: email,
        },
      })
      .then((res) => {
        const { checkMembership, verifyNumber } = res.data;
        if (checkMembership > 0) {
          setAlert({ open: true, text: "이미 가입이력이 있는 이메일입니다." });
          setLoading(false);
          return;
        }

        setVerifyInput(true);
        setVerifyNumber(verifyNumber);
        setLoading(false);
      })
      .catch((error) => console.log(error.response));
  };

  const onPressEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const verifyInput = Number(verifyInputRef.current?.value);

      if (verifyNumber !== verifyInput) {
        setAlert({
          open: true,
          text: "본인인증 번호가 일치하지 않습니다.",
        });
        return;
      }

      setVerifyInput(false);
      setVerifyComplete(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;
    const confirm = confirmInputRef.current!.value;
    const nickname = nicknameInputRef.current!.value;
    const age = parseInt(ageInputRef.current!.value);
    const sex = sexSelectRef.current?.htmlFor;
    const region = regionSelectRef.current?.htmlFor;

    if (sex === "unselected" || region === "unselected") {
      setAlert({
        open: true,
        text: "성별, 지역을 선택하세요.",
      });
      return;
    }

    if (verifyComplete !== true) {
      emailInputRef.current!.focus();
      setAlert({
        open: true,
        text: "본인인증을 완료하세요.",
      });
      return;
    }

    if (password !== confirm) {
      confirmInputRef.current!.focus();
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
      .post(
        "/api/members",
        JSON.stringify({
          path: "signUp",
          email,
          password: hashedpassword,
          nickname,
          age,
          sex,
          region,
        }),
        config
      )
      .then((res) => {
        switch (res.status) {
          case 200:
            nicknameInputRef.current!.focus();
            setAlert({
              open: true,
              text: "중복되는 닉네임이 존재합니다.",
            });
            setLoading(false);
            break;
          case 204:
            setLoading(false);
            router.push("/member/signIn");
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form id="page" onSubmit={handleSubmit} method="POST">
      <Title>회원가입</Title>
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
          placeholder="이메일을 입력하세요."
          required={true}
          ref={emailInputRef}
          autoFocus={true}
        />
        <VerifyTextField
          type="text"
          id="verify"
          placeholder="본인인증 메일이 전송되었습니다."
          label="인증번호"
          color="warning"
          size="small"
          focused
          fullWidth
          inputRef={verifyInputRef}
          onKeyDown={onPressEnter}
          $verifyInput={verifyInput}
        />
        <VerifyCompleteParagraph verifyComplete={verifyComplete}>
          본인인증이 완료되었습니다.
        </VerifyCompleteParagraph>
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
        <SecondLabelContainer>
          <BasicLabel>닉네임</BasicLabel>
        </SecondLabelContainer>
        <BasicInput
          type="text"
          id="nickname"
          placeholder="닉네임을 입력하세요."
          required={true}
          ref={nicknameInputRef}
        />
        <SecondLabelContainer>
          <BasicLabel>연령</BasicLabel>
        </SecondLabelContainer>
        <BasicInput
          type="number"
          id="age"
          placeholder="나이를 입력하세요."
          required={true}
          ref={ageInputRef}
        />
        <SexSelectContainer>
          <LabelContainer>
            <BasicLabel>성별</BasicLabel>
          </LabelContainer>
          <BasicSelect height="50px" options={sexList} ref={sexSelectRef} />
        </SexSelectContainer>
        <RegionSelectContainer>
          <LabelContainer>
            <BasicLabel>지역</BasicLabel>
          </LabelContainer>
          <BasicSelect
            height="50px"
            options={regionList}
            ref={regionSelectRef}
            width="150px"
          />
        </RegionSelectContainer>
        <SignUpButtonContainer>
          <PushButton type="submit">회원가입</PushButton>
        </SignUpButtonContainer>
      </UserInfoContainer>
      <SelfAuthButtonContainer>
        <BasicButton type="button" fontSize="15px" onClick={handleSendMail}>
          본인인증
        </BasicButton>
      </SelfAuthButtonContainer>
    </form>
  );
};

export default SignUp;

const LabelContainer = styled.div`
  padding-left: 10px;
`;

const RegionSelectContainer = styled.div`
  float: right;
  padding-top: 30px;
`;

const SecondLabelContainer = styled(LabelContainer)`
  padding-top: 30px;
`;

const SelfAuthButtonContainer = styled.div`
  left: calc(50% + 150px);
  position: absolute;
  top: 245px;
`;

const SexSelectContainer = styled.div`
  float: left;
  padding-top: 30px;
`;

const SignUpButtonContainer = styled.div`
  padding-top: 200px;
  text-align: center;
`;

const UserInfoContainer = styled.div`
  margin: 0 auto;
  width: 300px;
`;

const VerifyCompleteParagraph = styled.p<{ verifyComplete: boolean }>`
  color: #5f00ff;
  display: ${({ verifyComplete }) => (verifyComplete ? "block" : "none")};
`;

const VerifyTextField = styled(TextField)<{ $verifyInput: boolean }>`
  display: ${({ $verifyInput }) => ($verifyInput ? "block" : "none")};
  margin-top: 30px;

  .MuiOutlinedInput-root {
    color: ${({ theme }) => theme.global.component.color};
  }
`;
