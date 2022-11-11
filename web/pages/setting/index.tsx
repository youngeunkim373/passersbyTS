import { useState } from "react";
import { useSession } from "next-auth/react";
import styled from "styled-components";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Divider } from "@mui/material";

import Alert from "../../components/molecules/alert";
import Title from "../../components/atoms/title";
import MyProfile from "../../components/templates/myProfile";
import MyBoard from "../../components/templates/myBoard";

interface ProfileProps {}

const Profile = (props: ProfileProps) => {
  const [alert, setAlert] = useState({ open: false, text: "" });
  const [tab, setTab] = useState("myProfile");

  const { data: session, status } = useSession();
  if (status !== "authenticated") {
    return;
  }
  const loggedInUser = session?.user;

  const onChangeTab = () => {
    setTab((prev) => (prev === "myProfile" ? "myBoard" : "myProfile"));
  };

  return (
    <div id="list-page">
      <Title>프로필</Title>
      <Alert open={alert.open} setOpen={setAlert}>
        {alert.text}
      </Alert>
      <StyledTabs
        value={tab}
        onChange={onChangeTab}
        TabIndicatorProps={{
          style: {
            background: "#9000FF",
          },
        }}
      >
        <StyledTab value="myProfile" label="내 프로필" />
        <StyledTab value="myBoard" label="질문/답변" />
      </StyledTabs>
      <Divider />
      {tab === "myProfile" ? (
        <MyProfile loggedInUser={loggedInUser!} setAlert={setAlert} />
      ) : (
        <MyBoard loggedInUser={loggedInUser!} />
      )}
    </div>
  );
};

export default Profile;

const StyledTab = styled(Tab)`
  color: ${({ theme }) => theme.global.component.color};
  font-family: ibmLight;
  font-size: 20px;
  font-weight: bold;
  height: 70px;

  &:focus {
    color: #9000FF;
  },  
`;

const StyledTabs = styled(Tabs)`
  background: ${({ theme }) => theme.global.component.bgColor};
  border-radius: 5px;

  .css-1a4cg4j-MuiButtonBase-root-MuiTab-root.Mui-selected {
    color: #9000ff;
  }
  .css-1dcpqh4-MuiButtonBase-root-MuiTab-root.Mui-selected {
    color: #9000ff;
  }

  .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected {
    color: #9000ff;
  }
`;
