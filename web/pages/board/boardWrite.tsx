import React, { useContext, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import axios from "axios";

import CloseIcon from "@mui/icons-material/Close";

import Alert from "../../components/molecules/alert";
import BasicButton from "../../components/atoms/basicButton";
import BasicInput from "../../components/atoms/basicInput";
import Editor from "../../components/organisms/editor";
import PushButton from "../../components/atoms/pushButton";
import Title from "../../components/atoms/title";
import YesOrNoButtons from "../../components/molecules/yesOrNoButtons";

import LoadingContext from "../../context/loading";
import BasicSelect from "../../components/atoms/basicSelect";

const statsOptions: { [k: string]: any } = {
  all: "성별, 지역, 연령별 통계를 보고싶습니다.",
  one: "전체 통계만 보고싶습니다.",
};

interface InputItem {
  id: number;
}

const BoardWrite = () => {
  const [alert, setAlert] = useState({ open: false, text: "" });
  const [content, setContent] = useState("");
  const [choices, setChoices] = React.useState<InputItem[]>([]);
  const [yesOrNos, setYesOrNos] = React.useState<InputItem[]>([]);

  const { data: session } = useSession();
  const loggedInUser = session?.user;

  const router = useRouter();

  const { setLoading }: any = useContext(LoadingContext);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const statsOptionRef = useRef<HTMLLabelElement>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const title = titleInputRef.current!.value;
    const statsOption = statsOptionRef.current?.htmlFor;

    if (statsOption === "unselected") {
      setAlert({
        open: true,
        text: "통계옵션을 선택하세요.",
      });
      return;
    }

    if (!content) {
      setAlert({
        open: true,
        text: "내용을 입력하세요.",
      });
      return;
    }

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    let answers: {
      category: string;
      sequence: number;
      content: string;
    }[] = [];
    for (var answer of document.getElementsByName("choice")) {
      answers.push({
        category:
          (answer as HTMLInputElement | HTMLButtonElement).type! === "button"
            ? "yesOrNo"
            : "choices",
        sequence: answers.length,
        content: (answer as HTMLInputElement).value || answer.id,
      });
    }

    setLoading(true);
    await axios
      .post(
        "/api/board",
        JSON.stringify({
          path: "createBoardContent",
          listTitle: title,
          writerEmail: loggedInUser!.email,
          listContent: content,
          answers: answers,
          statsOption: statsOption,
        }),
        config
      )
      .then((res) => {
        setLoading(false);
        router.push("/board");
      })
      .catch((error) => {
        console.log(error);
      });
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
        <BasicInput
          type="text"
          placeholder="제목을 입력하세요."
          ref={titleInputRef}
          width="100%"
          required={true}
          autoFocus={true}
        />
      </BasicContainer>
      <BasicContainer>
        <BasicSelect
          options={statsOptions}
          ref={statsOptionRef}
          height="50px"
          currentValue={{
            id: "all",
            text: statsOptions["all"],
          }}
        />
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
                    name="choice"
                    placeholder="내용을 입력하세요."
                    type="text"
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
                <YesOrNoButtons />
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
      <Editor bucket="board" value={content} onChange={setContent} />
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

const ChoicesContainer = styled.div`
  align-items: center;
  display: flex;
  padding: 10px;
`;

const InputContainer = styled.div`
  float: left;
  width: 100%;
`;

const PushButtonContainer = styled.div`
  padding-top: 50px;
  text-align: center;
`;

const YesOrNosContainerWithCloseIcon = styled.div`
  position: relative;
`;
