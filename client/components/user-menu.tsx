import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useContext } from "react";
import { AuthContext, MenuContext } from "../pages/_app";
import { MoveToInbox, Mail, Logout } from "@mui/icons-material";
import React from "react";
import { UserEntity } from "@entities";

const UserMenu = () => {
  const { menuState } = useContext(MenuContext);
  const [auth, setAuth] = useContext(AuthContext).authState;
  const [isMenuOpened, setIsMenuOpened] = menuState;

  const signOut = () => {
    sessionStorage.removeItem("access_token");
    setAuth(null as unknown as UserEntity);
  };

  return (
    <React.Fragment key={"anchor"}>
      {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
      <Drawer anchor={"right"} open={!!auth && !!isMenuOpened} onClose={() => setIsMenuOpened(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setIsMenuOpened(false)} onKeyDown={() => setIsMenuOpened(false)}>
          {/* <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <MoveToInbox /> : <Mail />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <MoveToInbox /> : <Mail />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
          <Divider />
          <List>
            <ListItem button key="ログアウト" onClick={() => signOut()}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="ログアウト" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </React.Fragment>
  );
};

export default UserMenu;
