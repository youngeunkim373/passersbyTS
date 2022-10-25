import { useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";

import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Divider } from "@mui/material";

import Alert from "../molecules/Alert";
import BasicInput from "../atoms/basicInput";
import PushButton from "../atoms/pushButton";

import { checkEmail } from "../../lib/utils/checkEmail";

const FindUserInfo = () => {
  const [alert, setAlert] = useState({ open: false, text: "" });
  const [radio, setRadio] = useState({ english: "email", korean: "이메일" });
  const [checkMembership, setCheckMembership] = useState({
    isShow: false,
    check: 0,
  });

  const emailInputRef = useRef<HTMLInputElement>(null);

  const onButtonClick = async (e: React.FormEvent) => {
    setCheckMembership({
      isShow: false,
      check: 0,
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
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue="email"
      >
        <RadioContainer>
          <FormControlLabel
            value="email"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#6F30C9",
                  },
                }}
              />
            }
            label="이메일 찾기"
            onClick={() => {
              setRadio({ english: "email", korean: "이메일" });
              setCheckMembership({
                isShow: false,
                check: 0,
              });
            }}
          />
          <FormControlLabel
            value="password"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#6F30C9",
                  },
                }}
              />
            }
            label="비밀번호 찾기"
            onClick={() => {
              setRadio({ english: "password", korean: "비밀번호" });
              setCheckMembership({
                isShow: false,
                check: 0,
              });
            }}
          />
        </RadioContainer>
      </RadioGroup>
      <Divider variant="middle" />
      <SearchContainer>
        <h2>{radio.korean} 찾기</h2>
        <div>
          <BasicInput
            type="text"
            id="email"
            placeholder="이메일을 입력하세요."
            required={true}
            ref={emailInputRef}
            autoFocus={true}
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

const Container = styled.div`
  font-family: "ibmLight";
  font-size: 17px;
  font-weight: bold;
  margin: 0 auto;
  width: 100%;
`;

const RadioContainer = styled.div`
  margin: 0 auto;
  padding-bottom: 30px;
`;

const SearchContainer = styled.div`
  padding-top: 30px;
`;

interface ResultContainerProps {
  isShow: boolean;
}

const ResultContainer = styled.div<ResultContainerProps>`
  background: ${(props) => props.theme.findUser.bgColor};
  display: ${({ isShow }) => (isShow ? "block" : "none")};
  margin: 30px;
  padding: 30px;
  width: 370px;
`;

const ButtonContainer = styled.div`
  margin: 0 auto;
  padding-top: 30px;
  padding-bottom: 50px;
`;
