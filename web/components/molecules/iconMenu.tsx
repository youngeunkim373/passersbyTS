import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

import type { ButtonProps, AnchorProps } from "../../types/globalTypes";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

type Anchor = "top" | "left" | "bottom" | "right";

interface IconMenuProps {
  direction: Anchor;
  drawerList: any[];
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

  const list = (
    anchor: Anchor,
    drawerList: {
      koreanMenu: string;
      englishMenu: string;
      icon?: any;
      onClick?: React.MouseEventHandler<HTMLElement>;
    }[]
  ) => (
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
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            PaperProps={{
              sx: {
                top: "70px",
                boxShadow: "none",
              },
            }}
            BackdropProps={{
              sx: {
                backgroundColor: "transparent",
              },
            }}
          >
            {list(anchor, drawerList)}
          </ThemeDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

const EventTextMenu = styled.button<ButtonProps>`
  color: ${(props) => props.theme.textMenu.color};
  font-family: ibmRegular;
  font-size: 20px;
  font-weight: bold;
`;

const LinkTextMenu = styled.a<LinkProps>`
  color: ${({ englishMenu, path, theme }) =>
    `/${englishMenu}` === path ? "#9000ff" : theme.textMenu.color};
  font-family: ibmRegular;
  font-size: 20px;
  font-weight: bold;
`;

const ThemeDrawer = styled(Drawer)`
  .css-1qvuuif-MuiPaper-root-MuiDrawer-paper,
  .css-14ukx6z-MuiPaper-root-MuiDrawer-paper {
    background: ${(props) => props.theme.menu.bgColor};
  }
`;

const ThemeListItem = styled(ListItem)`
  :hover {
    background: rgb(255, 255, 255, 0.05);
  }
`;

const ThemeListItemIcon = styled(ListItemIcon)`
  color: ${(props) => props.theme.menuIcon.color};
`;
