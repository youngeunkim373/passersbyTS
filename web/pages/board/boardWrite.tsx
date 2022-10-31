import React, { useRef, useState } from "react";
import styled from "styled-components";

import CloseIcon from "@mui/icons-material/Close";
import SportsScoreIcon from "@mui/icons-material/SportsScore";

import Alert from "../../components/molecules/alert";
import BasicButton from "../../components/atoms/basicButton";
import BasicInput from "../../components/atoms/basicInput";
import Editor from "../../components/organisms/editor";
import PushButton from "../../components/atoms/pushButton";
import Title from "../../components/atoms/title";
import Image from "next/image";

interface InputItem {
  id: number;
}

const BoardWrite = () => {
  const [alert, setAlert] = useState({ open: false, text: "" });
  const [choices, setChoices] = React.useState<InputItem[]>([]);
  const [yesOrNos, setYesOrNos] = React.useState<InputItem[]>([]);

  const inputId = useRef<number>(1);

  function addInput(): void {
    if (yesOrNos.length !== 0) {
      setAlert({
        open: true,
        text: "N지선다 선택지와 찬반 선택지는 함께 생성할 수 없습니다.",
      });
      return;
    }

    if (choices.length >= 5) {
      setAlert({
        open: true,
        text: "N지선다 선택지는 5개까지 생성할 수 있습니다.",
      });
      return;
    }

    const newChoice = {
      id: inputId.current,
    };

    setChoices([...choices, newChoice]);
    inputId.current += 1;
  }

  function removeInput(index: number): void {
    setChoices(choices.filter((choice) => choice.id !== index));
  }

  function addButton(): void {
    if (choices.length !== 0) {
      setAlert({
        open: true,
        text: "N지선다 선택지와 찬반 선택지는 함께 생성할 수 없습니다.",
      });
      return;
    }

    if (yesOrNos.length !== 0) {
      setAlert({
        open: true,
        text: "찬반 선택지는 한 번만 생성할 수 있습니다.",
      });
      return;
    }
    const newYesOrNo = {
      id: inputId.current,
    };

    setYesOrNos([...yesOrNos, newYesOrNo]);
    inputId.current = 2 * inputId.current + 1;
  }

  function removeButton(): void {
    setYesOrNos([]);
  }

  const handleSubmit = async () => {
    console.log("submit!");
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
        <BasicInput type="text" placeholder="제목을 입력하세요." width="100%" />
      </BasicContainer>
      <BasicContainer>
        <BasicButton type="button" onClick={addInput}>
          N지선다
        </BasicButton>
        <BasicButton type="button" onClick={addButton}>
          찬반
        </BasicButton>
        <div
          style={{
            background: "rgba(255,255,255,0.07)",
            borderRadius: "10px",
            height: "auto",
            margin: "0 auto",
            marginTop: "30px",
            marginBottom: "30px",
            width: "100%",
          }}
        >
          {choices &&
            choices.map((choice: InputItem) => (
              <ChoicesContainer key={choice.id}>
                <InputContainer>
                  <BasicInput
                    type="text"
                    placeholder="내용을 입력하세요."
                    width="100%"
                  />
                </InputContainer>
                <CloseIcon
                  onClick={() => removeInput(choice.id)}
                  sx={{ cursor: "pointer", float: "left", paddingLeft: "20px" }}
                />
              </ChoicesContainer>
            ))}
          {yesOrNos &&
            yesOrNos.map((yesOrNo: InputItem) => (
              <YesOrNosContainerWithCloseIcon key={yesOrNo.id}>
                <YesOrNosContainer>
                  <StyledButton type="button" color="#5f00ff">
                    <SportsScoreIcon
                      sx={{ color: "#5f00ff", transform: "scaleX(-1)" }}
                    />
                    &nbsp;찬성
                  </StyledButton>
                  <div style={{ float: "left" }}>
                    <Image
                      src="/images/crossedFlags.png"
                      alt="flags"
                      width="100px"
                      height="55px"
                    />
                  </div>
                  <StyledButton type="button" color="#ff0046">
                    반대&nbsp;
                    <SportsScoreIcon
                      sx={{
                        color: "#ff0046",
                      }}
                    />
                  </StyledButton>
                </YesOrNosContainer>
                <CloseIcon
                  onClick={removeButton}
                  sx={{
                    cursor: "pointer",
                    float: "left",
                    position: "absolute",
                    left: "calc(50% + 180px)",
                    top: "30%",
                  }}
                />
              </YesOrNosContainerWithCloseIcon>
            ))}
        </div>
      </BasicContainer>
      <Editor />
      <PushButtonContainer>
        <PushButton type="submit">등록하기</PushButton>
      </PushButtonContainer>
    </form>
  );
};

export default BoardWrite;

const BasicContainer = styled.div`
  padding-top: 30px;
`;

const PushButtonContainer = styled.div`
  padding-top: 50px;
  text-align: center;
`;

const ChoicesContainer = styled.div`
  align-items: center;
  display: flex;
  padding: 10px;
`;

const YesOrNosContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
`;

const YesOrNosContainerWithCloseIcon = styled.div`
  position: relative;
`;

const InputContainer = styled.div`
  float: left;
  width: 100%;
`;

const StyledButton = styled.button`
  align-items: center;
  background: ${({ color }) => color};
  border: ${({ color }) => "3px solid" + color};
  border-radius: 30px;
  color: white;
  display: flex;
  float: left;
  font-family: ibmRegular;
  font-size: 20px;
  font-weight: bold;
  padding: 8px 20px;
  svg {
    color: white;
  }

  &:hover {
    background: white;
    color: ${({ color }) => color};

    svg {
      color: ${({ color }) => color};
    }
  }
`;
