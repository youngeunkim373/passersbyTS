import Link from "next/link";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";

import menuClass from "./style/menu.module.css";

import IconMenu from "../molecules/iconMenu";
import TextMenu from "../molecules/textMenu";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const Menu: React.FC = () => {
  const matches = useMediaQuery("(max-width:750px)");

  return (
    <div
      className={`vertical-center menu ${menuClass.menu_width} ${menuClass.menu_height}`}
    >
      <div className={`left vertical-center pointer ${menuClass.img_width}`}>
        <Link href="/">
          <>
            <div className="left PL10 PR10 PT10">
              <Image
                src="/images/symbol.png"
                alt="Home"
                width="70px"
                height="70px"
              />
            </div>
            <span className="right logo-font PT30">길 가는 사람들</span>
          </>
        </Link>
      </div>
      {matches ? (
        <div className={`PR30 ${menuClass.icon_right}`}>
          <IconMenu
            direction="right"
            icon={MenuIcon}
            drawerList={[
              {
                koreanMenu: "로그인",
                englishMenu: "member/signIn",
                icon: <LoginIcon />,
              },
              // {
              //   koreanMenu: "로그아웃",
              //   englishMenu: "signout",
              //   icon: <LogoutIcon />,
              // },
              {
                koreanMenu: "회원가입",
                englishMenu: "signup",
                icon: <PersonAddIcon />,
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
              {
                koreanMenu: "프로필",
                englishMenu: "profile",
                icon: <AccountCircleIcon />,
              },
            ]}
          />
        </div>
      ) : (
        <>
          <div className={`left align-center ${menuClass.textmenu_width}`}>
            {[
              { koreanMenu: "공지사항", englishMenu: "notice" },
              { koreanMenu: "게시판", englishMenu: "board" },
            ].map((menu) => (
              <TextMenu
                key={menu.englishMenu}
                koreanMenu={menu.koreanMenu}
                englishMenu={menu.englishMenu}
              />
            ))}
          </div>
          <div className={`right vertical-center ${menuClass.setting_width}`}>
            <div className="left PR30">
              {[
                { koreanMenu: "로그인", englishMenu: "member/signIn" },
                // { korean: "로그아웃", english: "signout" },
                {
                  koreanMenu: "|",
                },
                {
                  koreanMenu: "회원가입",
                  englishMenu: "signup",
                },
              ].map((menu) => (
                <TextMenu
                  key={menu.englishMenu + "_2"}
                  koreanMenu={menu.koreanMenu}
                  englishMenu={menu.englishMenu}
                />
              ))}
            </div>
          </div>
          <div className="right">
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
                //   koreanMenu: "로그아웃",
                //   englishMenu: "signout",
                //   icon: <LogoutIcon />,
                // },
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Menu;
