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
import BasicLabel from "../../components/atoms/basicLabel";

const statsOptions: { [k: string]: any } = {
  all: "성별, 지역, 연령별 통계를 보고싶습니다.",
  one: "전체 통계만 보고싶습니다.",
};

const CategoryOptions: { [k: string]: any } = {
  job: "직장/일",
  love: "연애/결혼",
  family: "가족",
  relationship: "인간관계",
  parenting: "임신/육아",
  school: "학교생활",
  culture: "문화생활",
  etc: "기타",
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

  const inputId = useRef<number>(1);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const categoryOptionRef = useRef<HTMLLabelElement>(null);
  const statsOptionRef = useRef<HTMLLabelElement>(null);

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
    const categoryOption = categoryOptionRef.current?.htmlFor;
    const statsOption = statsOptionRef.current?.htmlFor;

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

    if (answers.length === 0) {
      setAlert({
        open: true,
        text: "N지선다 혹은 찬반 선택지를 등록하세요!",
      });
      return;
    }

    if (statsOption === "unselected" || categoryOption === "unselected") {
      setAlert({
        open: true,
        text: "카테고리 및 통계설정을 선택하세요.",
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
          categoryOption: categoryOption,
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
      <TitleContainer>
        <BasicInput
          type="text"
          placeholder="제목을 입력하세요."
          ref={titleInputRef}
          width="100%"
          required={true}
          autoFocus={true}
        />
      </TitleContainer>
      <ButtonContainer>
        <BasicButton type="button" onClick={addInput}>
          N지선다
        </BasicButton>
        <BasicButton type="button" onClick={addButton}>
          찬반
        </BasicButton>
        <div
          style={{
            //background: "rgba(255,255,255,0.07)",
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
      </ButtonContainer>
      <BasicContainer>
        <LeftContainer>
          <BasicLabel>카테고리</BasicLabel>
          <BasicSelect options={CategoryOptions} ref={categoryOptionRef} />
        </LeftContainer>
        <RightContainer>
          <BasicLabel>통계설정</BasicLabel>
          <BasicSelect
            options={statsOptions}
            ref={statsOptionRef}
            currentValue={{
              id: "all",
              text: statsOptions["all"],
            }}
            width="340px"
          />
        </RightContainer>
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
  display: inline-block;
  width: 100%;
`;

const ButtonContainer = styled.div`
  background: ${({ theme }) => theme.global.component.bgColor};
  border-radius: 7px;
  display: inline-block;
  margin-bottom: 30px;
  margin-top: 30px;
  padding-top: 30px;
  width: 100%;
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

const LeftContainer = styled.div`
  float: left;
`;

const PushButtonContainer = styled.div`
  padding-top: 50px;
  text-align: center;
`;

const RightContainer = styled.div`
  float: left;
  padding-left: 20px;
`;

const TitleContainer = styled.div`
  display: inline-block;
  padding-top: 30px;
  width: 100%;
`;

const YesOrNosContainerWithCloseIcon = styled.div`
  position: relative;
`;
