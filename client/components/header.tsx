import { gql } from "@apollo/client";
import { JWTPayload, NotificationEntity } from "@entities";
import { AccountCircle } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import client from "../apollo-client";
import { AuthContext, MenuContext } from "../pages/_app";
import UserMenu from "./user-menu";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";

const NOTI_SUBS = gql`
  subscription ($targetUserId: String!) {
    newNotification(targetUserId: $targetUserId) {
      targetUserId
      msg
      createdAt
    }
  }
`;

const LayoutHeader: React.FC<{ payload?: JWTPayload }> = ({ payload }) => {
  const { authState } = useContext(AuthContext);
  const { menuState } = useContext(MenuContext);
  const [menuOpened, setMenuOpened] = menuState;
  const [auth, setAuth] = authState;
  useEffect(() => {
    if (payload) setAuth(payload);
  }, [payload, setAuth]);

  const OnSigned = () => {
    useEffect(() => {
      const subscription = client
        .subscribe<NestedQuery<"newNotification", NotificationEntity>>({
          query: NOTI_SUBS,
          variables: { targetUserId: "laptise" },
        })
        .subscribe(({ data }) => {
          console.log(data?.newNotification);
        });
      return () => subscription.unsubscribe();
    }, []);

    return (
      <>
        <Stack direction="row" alignItems={"center"} style={{ cursor: "pointer" }}>
          <CircleNotificationsIcon />
          <Stack onClick={() => setMenuOpened(true)} direction="row">
            <AccountCircle />
            {auth?.username || ""}
          </Stack>
        </Stack>
      </>
    );
  };

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
