import * as React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import menuDetail from "./style/menuDetail.module.css";

type Anchor = "top" | "left" | "bottom" | "right";

interface IconMenuProps {
  direction: Anchor;
  icon: any;
  drawerList: {
    koreanMenu: string;
    englishMenu: string;
    icon?: any;
  }[];
}

export default function IconMenu(props: IconMenuProps) {
  const { direction, icon, drawerList } = props;
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
    drawerList: { koreanMenu: string; englishMenu: string; icon?: any }[]
  ) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {drawerList.map((list) => (
          <ListItem key={list.englishMenu} disablePadding>
            <ListItemButton>
              <ListItemIcon>{list.icon}</ListItemIcon>
              <div className={`${menuDetail.menu_font}`}>{list.koreanMenu}</div>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <Divider /> */}
    </Box>
  );

  return (
    <div>
      {([direction] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <Icon sx={{ color: "#9000ff" }} />
          </Button>
          <Drawer
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
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
