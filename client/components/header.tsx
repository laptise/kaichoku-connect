import { JWTPayload } from "@entities";
import { AccountCircle } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { AuthContext, MenuContext } from "../pages/_app";
import UserMenu from "./user-menu";

const LayoutHeader: React.FC<{ payload?: JWTPayload }> = ({ payload }) => {
  const { authState } = useContext(AuthContext);
  const { menuState } = useContext(MenuContext);
  const [menuOpened, setMenuOpened] = menuState;
  const [auth, setAuth] = authState;
  useEffect(() => {
    if (payload) setAuth(payload);
  }, [payload, setAuth]);

  const OnSigned = () => (
    <>
      <Stack onClick={() => setMenuOpened(true)} direction="row" alignItems={"center"} style={{ cursor: "pointer" }}>
        <AccountCircle />
        {auth?.username || ""}
      </Stack>
    </>
  );

  const UnSinged = () => (
    <Link href="/signin" passHref={true}>
      <Button variant="outlined">Login</Button>
    </Link>
  );

  return (
    <>
      <header>
        <Link href="/" passHref={true}>
          <h1 id="goHome">Kaichoku</h1>
        </Link>
        {!!auth ? <OnSigned /> : <UnSinged />}
      </header>
      <UserMenu />
    </>
  );
};

export default LayoutHeader;
