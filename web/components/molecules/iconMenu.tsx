import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import type { AnchorProps, ButtonProps } from "../../types/globalTypes";

type Anchor = "top" | "left" | "bottom" | "right";

interface drawerListKeys {
  koreanMenu: string;
  englishMenu: string;
  icon: any;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

interface IconMenuProps {
  direction: Anchor;
  drawerList: drawerListKeys[];
  icon: any;
}

interface LinkProps extends AnchorProps {
  children: React.ReactNode;
  englishMenu: string;
  path: string;
}

export default function IconMenu({
  direction,
  drawerList,
  icon,
}: IconMenuProps) {
  const router = useRouter();
  const Icon = icon;

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor, drawerList: drawerListKeys[]) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {drawerList.map(
          (list) =>
            typeof list !== "boolean" && (
              <ThemeListItem
                key={list.englishMenu && list.koreanMenu}
                disablePadding
              >
                {list.onClick ? (
                  <ListItemButton onClick={list.onClick}>
                    <ThemeListItemIcon>{list.icon}</ThemeListItemIcon>
                    <EventTextMenu type="button">
                      {list.koreanMenu}
                    </EventTextMenu>
                  </ListItemButton>
                ) : (
                  <Link href={`/${list.englishMenu}`}>
                    <ListItemButton>
                      <ThemeListItemIcon>{list.icon}</ThemeListItemIcon>
                      <LinkTextMenu
                        englishMenu={list.englishMenu}
                        path={router.pathname}
                      >
                        {list.koreanMenu}
                      </LinkTextMenu>
                    </ListItemButton>
                  </Link>
                )}
              </ThemeListItem>
            )
        )}
      </List>
    </Box>
  );

  return (
    <div>
      {([direction] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <Icon sx={{ color: "#9000ff" }} />
          </Button>
          <ThemeDrawer
            anchor={anchor}
            BackdropProps={{
              sx: {
                backgroundColor: "transparent",
              },
            }}
            open={state[anchor]}
            PaperProps={{
              sx: {
                top: "70px",
                boxShadow: "none",
              },
            }}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor, drawerList)}
          </ThemeDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

const EventTextMenu = styled.button<ButtonProps>`
  color: ${({ theme }) => theme.global.component.color};
  font-family: ibmRegular;
  font-size: 20px;
  font-weight: bold;
`;

const LinkTextMenu = styled.a<LinkProps>`
  color: ${({ englishMenu, path, theme }) =>
    `/${englishMenu}` === path ? "#9000ff" : theme.global.component.color};
  font-family: ibmRegular;
  font-size: 20px;
  font-weight: bold;
`;

const ThemeDrawer = styled(Drawer)`
  .css-1qvuuif-MuiPaper-root-MuiDrawer-paper,
  .css-14ukx6z-MuiPaper-root-MuiDrawer-paper {
    background: ${({ theme }) => theme.menu.bgColor};
  }
`;

const ThemeListItem = styled(ListItem)`
  :hover {
    background: rgb(255, 255, 255, 0.05);
  }
`;

const ThemeListItemIcon = styled(ListItemIcon)`
  color: ${({ theme }) => theme.menuIcon.color};
`;
