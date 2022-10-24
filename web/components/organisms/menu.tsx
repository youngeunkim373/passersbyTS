import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import styled from "styled-components";

import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";

import IconMenu from "../molecules/iconMenu";
import TextMenu from "../molecules/textMenu";

interface MenuProps {
  isDark: boolean;
  toggleDarkMode: () => void;
}

const Menu = ({ isDark, toggleDarkMode }: MenuProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const matches = useMediaQuery("(max-width:750px)");

  const handleSignOut = async () => {
    signOut({ redirect: false });
    router.replace("/");
  };

  return (
    <MenuContainer>
      <LogoContainer>
        <Link href="/">
          <>
            <LogoImageContainer>
              <Image
                src="/images/symbol.png"
                alt="Home"
                width="70px"
                height="70px"
              />
            </LogoImageContainer>
            <TitleSpan>길 가는 사람들</TitleSpan>
          </>
        </Link>
      </LogoContainer>
      {matches ? (
        <HamburgerMenuContainer>
          <IconMenu
            direction="right"
            icon={MenuIcon}
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
              status === "authenticated" && {
                koreanMenu: "프로필",
                englishMenu: "profile",
                icon: <AccountCircleIcon />,
              },
              // {
              //   koreanMenu: "설정",
              //   englishMenu: "setting",
              //   icon: <SettingsIcon />,
              // },
              {
                koreanMenu: "밝기",
                englishMenu: "brightness",
                icon: isDark ? <NightlightRoundIcon /> : <LightModeIcon />,
                onClick: toggleDarkMode,
              },
            ]}
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
                icon={SettingsIcon}
                drawerList={[
                  {
                    koreanMenu: "프로필",
                    englishMenu: "profile",
                    icon: <AccountCircleIcon />,
                  },
                  // {
                  //   koreanMenu: "설정",
                  //   englishMenu: "setting",
                  //   icon: <SettingsIcon />,
                  // },
                  {
                    koreanMenu: "밝기",
                    englishMenu: "brightness",
                    icon: isDark ? <NightlightRoundIcon /> : <LightModeIcon />,
                    onClick: toggleDarkMode,
                  },
                ]}
              />
            </SettingMenuRightSide>
          </SettingMenuContainer>
        </>
      )}
    </MenuContainer>
  );
};

export default Menu;

const MenuContainer = styled.div`
  align-items: center;
  background: ${(props) => props.theme.menu.bgColor};
  display: flex;
  height: 70px;
  min-width: 400px;
  width: 100vw;
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

const HamburgerMenuContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
  width: 100%;
`;

const TextMenuContainer = styled.div`
  float: left;
  min-width: 200px;
  text-align: center;
  width: 60vw;
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

const TitleSpan = styled.span`
  color: #9000ff;
  float: right;
  font-family: "sanjuGotgam";
  font-size: 25px;
  font-weight: bold;
`;
