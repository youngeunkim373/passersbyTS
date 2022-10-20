import axios from "axios";
import { useRef, useState } from "react";
import { useRouter } from "next/router";

import { checkEmail } from "../../lib/checkEmail";
import { hashPassword } from "../../lib/hasePassword";

import BasicButton from "../../components/atoms/basicButton";
import BasicInput from "../../components/atoms/basicInput";
import BasicLabel from "../../components/atoms/basicLabel";
import BasicSelect from "../../components/atoms/basicSelect";
import PushButton from "../../components/atoms/pushButton";
import Title from "../../components/atoms/title";
import Alert from "../../components/molecules/Alert";

import memberClass from "./style/member.module.css";

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

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const sexSelectRef = useRef<HTMLLabelElement>(null);
  const regionSelectRef = useRef<HTMLLabelElement>(null);

  const router = useRouter();

  const handleSendMail = async (e: React.FormEvent) => {
    const email = emailInputRef.current?.value;

    const checkEmailResult = await checkEmail(email!);
    if (checkEmailResult === false) {
      setAlert({
        open: true,
        text: "이메일의 형식을 확인하세요.",
      });
      return;
    }

    await axios
      .get("/api/members", {
        params: {
          path: "checkEmail",
          email: email,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          setAlert({ open: true, text: "이미 가입이력이 있는 이메일입니다." });
          return;
        }
      })
      .catch((error) => console.log(error.response));
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
    const userRole = "user";

    if (sex === "unselected" || region === "unselected") {
      setAlert({
        open: true,
        text: "성별, 지역을 선택하세요.",
      });
      return;
    }

    // if (display.verifyComplete !== "block") {
    //   setAlert({
    //     open: true,
    //     text: "본인인증을 완료하세요.",
    //   });
    //   return;
    // }

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
      .post(
        "/api/allTables",
        JSON.stringify({
          table: "Members",
          fields: {
            email: email,
            password: hashedpassword,
            nickname: nickname,
            sex: sex,
            age: age,
            region: region,
            userRole: userRole,
          },
          primaryKey: { email },
        }),
        config
      )
      .then((res) => {
        router.push("/member/signIn");
      })
      .catch((error) => console.log(error.response));
  };

  return (
    <form id="page" onSubmit={handleSubmit} method="POST">
      <Title>회원가입</Title>
      <Alert open={alert.open} setAlert={setAlert}>
        {alert.text}
      </Alert>
      <div className="auto-center narrow-width">
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
        <div className="PL10 PT30">
          <BasicLabel>닉네임</BasicLabel>
        </div>
        <BasicInput
          type="text"
          id="nickname"
          placeholder="닉네임을 입력하세요."
          submitOnEnter={true}
          required={true}
          ref={nicknameInputRef}
        />
        <div className="PL10 PT30">
          <BasicLabel>연령</BasicLabel>
        </div>
        <BasicInput
          type="number"
          id="age"
          placeholder="나이를 입력하세요."
          submitOnEnter={true}
          required={true}
          ref={ageInputRef}
        />
        <div className="left PT30">
          <div className="PL10">
            <BasicLabel>성별</BasicLabel>
          </div>
          <BasicSelect options={sexList} ref={sexSelectRef} />
        </div>
        <div className="right PT30">
          <div className="PL10">
            <BasicLabel>지역</BasicLabel>
          </div>
          <BasicSelect options={regionList} ref={regionSelectRef} />
        </div>
        <div className="align-center MT100 PT100">
          <PushButton type="submit">회원가입</PushButton>
        </div>
      </div>
      <div className={`${memberClass.self_auth}`}>
        <BasicButton type="button" fontSize="15px" onClick={handleSendMail}>
          본인인증
        </BasicButton>
      </div>
    </form>
  );
};

export default SignUp;
