import { AccountCircle, Logout } from "@mui/icons-material";
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { AuthContext, MenuContext } from "../pages/_app";

const UserMenu = () => {
  const { menuState } = useContext(MenuContext);
  const [auth, setAuth] = useContext(AuthContext).authState;
  const [isMenuOpened, setIsMenuOpened] = menuState;
  const router = useRouter();
  const signOut = () => {
    sessionStorage.removeItem("access_token");
    document.cookie = `access_token=; path=/; maxAge=0`;
    setAuth(null);
    router.reload();
  };

  return (
    <React.Fragment key={"anchor"}>
      {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
      <Drawer anchor={"right"} open={!!auth && !!isMenuOpened} onClose={() => setIsMenuOpened(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setIsMenuOpened(false)} onKeyDown={() => setIsMenuOpened(false)}>
          <List>
            <Link href="/dashboard" passHref={true}>
              <ListItem button key="ダッシュボード">
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="ダッシュボード" />
              </ListItem>
            </Link>
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
