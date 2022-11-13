import { useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";

import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Divider } from "@mui/material";

import Alert from "../molecules/alert";
import BasicInput from "../atoms/basicInput";
import PushButton from "../atoms/pushButton";
import { checkEmail } from "../../lib/utils/checkEmail";

const FindUserInfo = () => {
  const [alert, setAlert] = useState({ open: false, text: "" });
  const [checkMembership, setCheckMembership] = useState({
    isShow: false,
    check: 0,
  });
  const [radio, setRadio] = useState({ english: "email", korean: "이메일" });

  const emailInputRef = useRef<HTMLInputElement>(null);

  const onButtonClick = async (e: React.FormEvent) => {
    setCheckMembership({
      check: 0,
      isShow: false,
    });

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
          path: "checkMembership",
          email: email,
          radio: radio.english,
        },
      })
      .then((res) => {
        setCheckMembership({
          isShow: true,
          check: res.data,
        });
      })
      .catch((error) => console.log(error.response));
  };

  return (
    <Container>
      <Alert open={alert.open} setOpen={setAlert}>
        {alert.text}
      </Alert>
      <RadioGroup
        aria-labelledby="demo-row-radio-buttons-group-label"
        defaultValue="email"
        name="row-radio-buttons-group"
        row
      >
        <RadioContainer>
          <ThemeFormControlLabel
            control={<Radio />}
            label="이메일 찾기"
            value="email"
            onClick={() => {
              setRadio({ english: "email", korean: "이메일" });
              setCheckMembership({
                check: 0,
                isShow: false,
              });
            }}
          />
          <ThemeFormControlLabel
            control={<Radio />}
            label="비밀번호 찾기"
            value="password"
            onClick={() => {
              setRadio({ english: "password", korean: "비밀번호" });
              setCheckMembership({
                check: 0,
                isShow: false,
              });
            }}
          />
        </RadioContainer>
      </RadioGroup>
      <ThemeDivider variant="middle" />
      <SearchContainer>
        <h2>{radio.korean} 찾기</h2>
        <div>
          <BasicInput
            autoFocus={true}
            id="email"
            placeholder="이메일을 입력하세요."
            ref={emailInputRef}
            required={true}
            type="text"
          />
        </div>
        <ResultContainer isShow={checkMembership.isShow}>
          {radio.english === "password" && checkMembership.check > 0 ? (
            <span>
              입력하신 이메일({emailInputRef.current?.value})로 <br />
              비밀번호 변경 링크를 전송했습니다. 확인해주세요.
            </span>
          ) : (
            <span>
              입력하신 이메일({emailInputRef.current?.value})은 <br />
              가입이력이 {checkMembership.check > 0 ? "있는" : "없는"}{" "}
              이메일입니다.
            </span>
          )}
        </ResultContainer>
        <ButtonContainer>
          <PushButton type="button" onClick={onButtonClick}>
            확인
          </PushButton>
        </ButtonContainer>
      </SearchContainer>
    </Container>
  );
};

export default FindUserInfo;

const ButtonContainer = styled.div`
  margin: 0 auto;
  padding-top: 30px;
  padding-bottom: 50px;
`;

const Container = styled.div`
  font-family: ibmLight;
  font-size: 17px;
  font-weight: bold;
  margin: 0 auto;
  width: 100%;
`;

const RadioContainer = styled.div`
  margin: 0 auto;
  padding-bottom: 30px;
`;

const ResultContainer = styled.div<{ isShow: boolean }>`
  background: ${({ theme }) => theme.box.simpleBox.bgColor};
  display: ${({ isShow }) => (isShow ? "block" : "none")};
  margin: 30px;
  padding: 30px;
  width: 370px;
`;

const SearchContainer = styled.div`
  padding-top: 30px;
`;

const ThemeDivider = styled(Divider)`
  background: ${({ theme }) => theme.box.findUser.divider};
`;

const ThemeFormControlLabel = styled(FormControlLabel)`
  color: ${({ theme }) => theme.global.component.color};

  .MuiTypography-root {
    font-family: ibmLight;
    font-size: 17px;
    font-weight: bold;
  }

  .MuiRadio-root {
    color: ${({ theme }) => theme.global.component.color};
  }

  .MuiRadio-root.Mui-checked {
    color: #9000ff;
  }
`;
