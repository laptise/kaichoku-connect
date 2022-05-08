import { gql, useLazyQuery } from "@apollo/client";
import { JWTPayload, NotificationEntity } from "@entities";
import { AccountCircle } from "@mui/icons-material";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { Badge, Box, Button, Divider, Stack, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import client from "../apollo-client";
import { AuthContext, MenuContext } from "../pages/_app";
import UserMenu from "./user-menu";
const NOTI_SUBS = gql`
  subscription ($targetUserId: String!) {
    newNotification(targetUserId: $targetUserId) {
      targetUserId
      msg
      createdAt
    }
  }
`;

const GET_NOTIS = gql`
  query ($targetUserId: String!) {
    getNotifications(targetUserId: $targetUserId) {
      id
      msg
      createdAt
    }
  }
`;

const Notification: React.FC<{ notification: NotificationEntity }> = ({ notification }) => {
  const { id, msg, createdAt } = notification;
  const [hover, setHover] = useState(false);
  return (
    <Box
      sx={{ transition: "all 100ms", background: hover ? "#ccc" : undefined, cursor: "pointer", p: 1 }}
      style={{ marginTop: 0 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Stack>
        <Typography variant="caption" style={{ marginLeft: "auto", color: "#aaa" }}>
          dd
        </Typography>
        <Typography variant="body2" gutterBottom>
          {msg}
        </Typography>
      </Stack>
    </Box>
  );
};

const Notifications: React.FC<{ payload?: JWTPayload }> = ({ payload }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [notis, setNotise] = useState<NotificationEntity[]>([]);
  const [q] = useLazyQuery<NestedQuery<"getNotifications", NotificationEntity[]>>(GET_NOTIS);
  const [count, setCount] = useState(0);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const getComments = async (increment = false) => {
    const res = await q({ variables: { targetUserId: payload?.userId } });
    const data = res.data?.getNotifications;
    if (data) {
      setNotise(data);
    } else {
      setNotise([]);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getComments();
    const subscription = client
      .subscribe<NestedQuery<"newNotification", NotificationEntity>>({
        query: NOTI_SUBS,
        variables: { targetUserId: payload?.userId },
      })
      .subscribe(() => {
        setCount((cnt) => cnt + 1);
        getComments(true);
      });
    return () => subscription.unsubscribe();
  }, []);
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={count === 0 ? undefined : count} color="primary">
          <CircleNotificationsIcon />
        </Badge>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ p: 0 }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Stack spacing={1} divider={<Divider style={{ marginTop: 0 }} />}>
          {notis?.map?.((notice) => (
            <Notification key={notice.id} notification={notice} />
          ))}
        </Stack>
      </Menu>
    </div>
  );
};

const LayoutHeader: React.FC<{ payload?: JWTPayload }> = ({ payload }) => {
  const { authState } = useContext(AuthContext);
  const { menuState } = useContext(MenuContext);
  const [menuOpened, setMenuOpened] = menuState;
  const [auth, setAuth] = authState;
  useEffect(() => {
    if (payload) setAuth(payload);
  }, [payload, setAuth]);

  const OnSigned = () => {
    return (
      <>
        <Stack direction="row" alignItems={"center"} style={{ cursor: "pointer" }}>
          <Notifications payload={payload} />
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
