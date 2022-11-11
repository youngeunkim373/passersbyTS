import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import styled from "styled-components";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LightModeIcon from "@mui/icons-material/LightMode";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import useMediaQuery from "@mui/material/useMediaQuery";

import Alert from "../molecules/alert";
import IconMenu from "../molecules/iconMenu";
import TextMenu from "../molecules/textMenu";

interface MenuProps {
  isDark: boolean;
  toggleDarkMode: () => void;
}

const Menu = ({ isDark, toggleDarkMode }: MenuProps) => {
  const [alert, setAlert] = useState({ open: false, text: "" });

  const { data: session, status } = useSession();
  const router = useRouter();
  const matches = useMediaQuery("(max-width:750px)");

  const handleSignOut = async () => {
    signOut({ redirect: false });
    router.replace("/");
  };

  const checkAuth = async () => {
    setAlert({
      open: true,
      text: "로그인 후 이용 가능한 메뉴입니다.",
    });
    return;
  };

  return (
    <MenuContainer>
      <Alert open={alert.open} setOpen={setAlert}>
        {alert.text}
      </Alert>
      <LogoContainer>
        <Link href="/">
          <LogoImageContainer>
            <Image
              alt="Home"
              height="70px"
              src="/images/symbol.png"
              width="70px"
            />
          </LogoImageContainer>
        </Link>
        <Link href="/">
          <TitleSpan>길 가는 사람들</TitleSpan>
        </Link>
      </LogoContainer>
      {matches ? (
        <HamburgerMenuContainer>
          <IconMenu
            direction="right"
            drawerList={[
              {
                koreanMenu: "회원가입",
                englishMenu: "member/signUp",
                icon: <PersonAddIcon />,
              },
              status === "authenticated"
                ? {
                    koreanMenu: "로그아웃",
                    englishMenu: "signOut",
                    icon: <LogoutIcon />,
                    onClick: handleSignOut,
                  }
                : {
                    koreanMenu: "로그인",
                    englishMenu: "member/signIn",
                    icon: <LoginIcon />,
                  },
              {
                koreanMenu: "공지사항",
                englishMenu: "notice",
                icon: <AnnouncementIcon />,
              },
              {
                koreanMenu: "게시판",
                englishMenu: "board",
                icon: <AssignmentIcon />,
              },
              status === "authenticated"
                ? {
                    koreanMenu: "프로필",
                    englishMenu: "setting",
                    icon: <AccountCircleIcon />,
                  }
                : {
                    koreanMenu: "프로필",
                    englishMenu: "setting",
                    icon: <AccountCircleIcon />,
                    onClick: checkAuth,
                  },
              {
                koreanMenu: "밝기",
                englishMenu: "brightness",
                icon: isDark ? <NightlightRoundIcon /> : <LightModeIcon />,
                onClick: toggleDarkMode,
              },
            ]}
            icon={MenuIcon}
          />
        </HamburgerMenuContainer>
      ) : (
        <>
          <TextMenuContainer>
            {[
              { koreanMenu: "공지사항", englishMenu: "notice" },
              { koreanMenu: "게시판", englishMenu: "board" },
            ].map((menu) => (
              <TextMenu
                key={menu.koreanMenu}
                koreanMenu={menu.koreanMenu}
                englishMenu={menu.englishMenu}
              />
            ))}
          </TextMenuContainer>
          <SettingMenuContainer>
            <SettingMenuLeftSide>
              {[
                status === "authenticated"
                  ? {
                      koreanMenu: "로그아웃",
                      onClick: handleSignOut,
                    }
                  : { koreanMenu: "로그인", englishMenu: "member/signIn" },
                {
                  koreanMenu: "|",
                },
                {
                  koreanMenu: "회원가입",
                  englishMenu: "member/signUp",
                },
              ].map((menu) => (
                <TextMenu
                  key={menu.koreanMenu + "_2"}
                  koreanMenu={menu.koreanMenu}
                  englishMenu={menu.englishMenu}
                  onClick={menu.onClick}
                />
              ))}
            </SettingMenuLeftSide>
            <SettingMenuRightSide>
              <IconMenu
                direction="top"
                drawerList={[
                  status === "authenticated"
                    ? {
                        koreanMenu: "프로필",
                        englishMenu: "setting",
                        icon: <AccountCircleIcon />,
                      }
                    : {
                        koreanMenu: "프로필",
                        englishMenu: "setting",
                        icon: <AccountCircleIcon />,
                        onClick: checkAuth,
                      },
                  {
                    koreanMenu: "밝기",
                    englishMenu: "brightness",
                    icon: isDark ? <NightlightRoundIcon /> : <LightModeIcon />,
                    onClick: toggleDarkMode,
                  },
                ]}
                icon={SettingsIcon}
              />
            </SettingMenuRightSide>
          </SettingMenuContainer>
        </>
      )}
    </MenuContainer>
  );
};

export default Menu;

const HamburgerMenuContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
  width: 100%;
`;

const LogoContainer = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  float: left;
  min-width: 260px;
  width: 20vw;
`;

const LogoImageContainer = styled.div`
  float: left;
  padding: 10px 10px 0px 10px;
`;

const MenuContainer = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.menu.bgColor};
  display: flex;
  height: 70px;
  left: 0;
  min-width: 400px;
  position: fixed;
  right: 0;
  top: 0;
  width: 100vw;
  z-index: 999;
`;

const SettingMenuContainer = styled.div`
  align-items: center;
  display: flex;
  float: right;
  justify-content: flex-end;
  min-width: 330px;
  width: 10vw;
`;

const SettingMenuLeftSide = styled.div`
  float: left;
  padding-right: 30px;
`;

const SettingMenuRightSide = styled.div`
  float: right;
`;

const TextMenuContainer = styled.div`
  float: left;
  min-width: 200px;
  text-align: center;
  width: 60vw;
`;

const TitleSpan = styled.span`
  color: #9000ff;
  float: right;
  font-family: "sanjuGotgam";
  font-size: 25px;
  font-weight: bold;
`;
