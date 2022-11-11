import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";

import SettingsIcon from "@mui/icons-material/Settings";

import BasicInput from "../atoms/basicInput";
import BasicLabel from "../atoms/basicLabel";
import BasicSelect from "../atoms/basicSelect";
import ProfileImage from "../molecules/profileImage";
import PushButton from "../atoms/pushButton";
import { SessionDatas } from "../../types/globalTypes";

interface MyProfileProps {
  loggedInUser: SessionDatas;
  setAlert: Dispatch<SetStateAction<{ open: boolean; text: string }>>;
}

const regionList: { [k: string]: any } = {
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
const sexList: { [k: string]: any } = { F: "여성", M: "남성" };

const MyProfile = ({ loggedInUser, setAlert }: MyProfileProps) => {
  const [profileImage, setProfileImage] = useState(loggedInUser.image);
  const [nickname, setNickname] = useState(loggedInUser.name);
  const [sex, setSex] = useState(loggedInUser.sex);
  const [region, setRegion] = useState(loggedInUser.region);

  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const sexSelectRef = useRef<HTMLLabelElement>(null);
  const regionSelectRef = useRef<HTMLLabelElement>(null);

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const profileImage = profileImageInputRef.current!.value;

    const file = e.target.files?.[0]!;
    const filename = encodeURIComponent((file as any).name);
    const fileType = encodeURIComponent((file as any).type);

    const res = await fetch(
      `/api/imageUpload/uploadUrl?file=${filename}&fileType=${fileType}&bucket=profileImage`
    );
    const { url, fields } = await res.json();

    const formData = new FormData();
    if (loggedInUser?.email) {
      formData.append("email", loggedInUser!.email!);
    }
    formData.append(
      "image",
      encodeURIComponent(profileImage.split("\\").reverse()[0])
    );
    formData.append("url", url);
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };

    await axios
      .post("/api/imageUpload/profileImage", formData, config)
      .then(async (res) => {
        setProfileImage(res.data);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nickname = nicknameInputRef.current!.value;
    const sex = sexSelectRef.current?.htmlFor;
    const region = regionSelectRef.current?.htmlFor;

    if (sex === "unselected" || region === "unselected") {
      setAlert({
        open: true,
        text: "성별, 지역을 선택하세요.",
      });
      return;
    }

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    await axios
      .put(
        "/api/setting",
        JSON.stringify({
          path: "updateProfile",
          email: loggedInUser.email,
          prevNickname: loggedInUser.name,
          nickname,
          sex,
          region,
        }),
        config
      )
      .then((res) => {
        reloadSession();
        setNickname(res.data.nickname);
        setSex(res.data.sex);
        setRegion(res.data.region);
        setAlert({
          open: true,
          text: "회원정보 변경이 완료되었습니다",
        });
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 409) {
          setAlert({
            open: true,
            text: "이미 존재하는 닉네임입니다.",
          });
          return;
        } else {
          setAlert({
            open: true,
            text: "알 수 없는 오류가 발생하였습니다. 죄송합니다.",
          });
          return;
        }
      });
  };

  return (
    <ProfileForm
      encType="multi part/form-data"
      onSubmit={handleSubmit}
      method="put"
      acceptCharset="UTF-8"
    >
      <LineContainer>
        <ProfileImageContainer>
          <ProfileImage image={profileImage} width="110px" height="110px" />
          <input
            accept="image/*"
            id="imageUpload"
            name="image"
            onChange={onChangeFile}
            ref={profileImageInputRef}
            type="file"
            style={{ display: "none" }}
          />
          <label htmlFor="imageUpload">
            <StyledSettingsIcon name="file" />
          </label>
        </ProfileImageContainer>
        <UserNameContainer>
          <UserNameParagraph>{nickname}</UserNameParagraph>
          <UserEmailParagraph>{loggedInUser.email}</UserEmailParagraph>
        </UserNameContainer>
      </LineContainer>
      <LineContainer>
        <ContentContainer>
          <BasicLabel fontSize="20px">닉네임</BasicLabel>
          <BasicInput
            id="nickname"
            placeholder="닉네임을 입력하세요."
            ref={nicknameInputRef}
            required={true}
            type="text"
            defaultValue={nickname!}
            width="250px"
          />
        </ContentContainer>
        <ContentContainer>
          <BasicLabel fontSize="20px">연령</BasicLabel>
          <BasicInput
            id="nicknm"
            readOnly={true}
            type="text"
            value={loggedInUser.age!}
            width="250px"
          />
        </ContentContainer>
      </LineContainer>
      <LineContainer>
        <ContentContainer>
          <BasicLabel fontSize="20px">성별</BasicLabel>
          <BasicSelect
            options={sexList}
            ref={sexSelectRef}
            height="50px"
            width="250px"
            currentValue={{
              id: sex!,
              text: sexList[sex!],
            }}
          />
        </ContentContainer>
        <ContentContainer>
          <BasicLabel fontSize="20px">지역</BasicLabel>
          <BasicSelect
            options={regionList}
            ref={regionSelectRef}
            height="50px"
            width="250px"
            currentValue={{
              id: region!,
              text: regionList[region!],
            }}
          />
        </ContentContainer>
      </LineContainer>
      <ButtonContainer>
        <PushButton type="submit">변경하기</PushButton>
      </ButtonContainer>
    </ProfileForm>
  );
};

export default MyProfile;

const ButtonContainer = styled.div`
  padding: 60px 0px 30px 0px;
  text-align: center;
`;

const ContentContainer = styled.div`
  display: block;
  margin: 0 auto;
  padding: 0px 7%;
`;

const LineContainer = styled.div`
  align-items: center;
  display: flex;
  height: 150px;
  justify-content: center;
  margin: 0 auto;
  width: 80%;
`;

const ProfileForm = styled.form`
  background: ${({ theme }) => theme.global.component.bgColor};
  padding: 50px;
`;

const ProfileImageContainer = styled.div`
  align-items: center;
  display: flex;
  float: left;
  padding-right: 30px;
`;

const StyledSettingsIcon = styled(SettingsIcon)`
  background: #cccccc;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  height: 25px;
  left: -25px;
  padding: 2px;
  position: relative;
  top: 40px;
  z-index: 2;
`;

const UserEmailParagraph = styled.p`
  font-family: ibmLight;
  font-size: 17px;
  font-weight: normal;
  margin: 0 auto;
  width: 100%;
`;

const UserNameContainer = styled.div`
  display: block;
  min-width: 300px;
  width: 60%;
`;

const UserNameParagraph = styled.p`
  font-family: ibmRegular;
  font-size: 25px;
  font-weight: bold;
  margin: 0 auto;
  width: 100%;
`;
