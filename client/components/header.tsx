import { gql, useLazyQuery } from "@apollo/client";
import { JWTPayload, Notification } from "@entities";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { Avatar, Badge, Box, Button, Divider, Stack, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import client from "../apollo-client";
import { AuthNextPage } from "../env";
import { MenuContext } from "../pages/_app";
import UserMenu from "./user-menu";
const NOTI_SUBS = gql`
  subscription ($targetUserId: String!) {
    newNotification(targetUserId: $targetUserId) {
      targetUserId
      msg
      createdAt
      actionLink
    }
  }
`;

const GET_NOTIS = gql`
  query ($targetUserId: String!) {
    getNotifications(targetUserId: $targetUserId) {
      id
      msg
      createdAt
      actionLink
    }
  }
`;

const LayoutHeader: React.FC<{ auth: JWTPayload | null }> = ({ auth }) => {
  const { menuState } = useContext(MenuContext);
  const [menuOpened, setMenuOpened] = menuState;

  return (
    <>
      <header>
        <Link href="/" passHref={true}>
          <h1 id="goHome">Kaichoku</h1>
        </Link>
        {!!auth ? <OnSigned payload={auth} setMenuOpened={setMenuOpened} /> : <UnSinged />}
      </header>
      <UserMenu />
    </>
  );
};

const UnSinged = () => (
  <Link href="/signin" passHref={true}>
    <Button variant="outlined">Login</Button>
  </Link>
);

const OnSigned: AuthNextPage<{ setMenuOpened(v: boolean): void }> = ({ payload, setMenuOpened }) => (
  <Stack direction="row" alignItems={"center"} style={{ cursor: "pointer" }}>
    <Notifications auth={payload} />
    <Stack onClick={() => setMenuOpened(true)} direction="row" alignItems={"center"} spacing={0.5}>
      <Avatar sx={{ width: 20, height: 20 }} alt={payload?.username} src={payload?.userImgUrl} />
      <Typography variant="button" sx={{ fontSize: 16 }}>
        {payload?.username || ""}
      </Typography>
    </Stack>
  </Stack>
);

const Notifications: React.FC<{ auth?: JWTPayload | null }> = ({ auth }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [notis, setNotise] = useState<Notification[]>([]);
  const [q] = useLazyQuery<NestedQuery<"getNotifications", Notification[]>>(GET_NOTIS);
  const [count, setCount] = useState(0);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const getComments = async (increment = false) => {
    const res = await q({ variables: { targetUserId: auth?.userId } });
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
      .subscribe<NestedQuery<"newNotification", Notification>>({
        query: NOTI_SUBS,
        variables: { targetUserId: auth?.userId },
      })
      .subscribe(() => {
        setCount((cnt) => cnt + 1);
        getComments(true);
      });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

const Notification: React.FC<{ notification: Notification }> = ({ notification }) => {
  const { id, msg, createdAt, actionLink } = notification!;
  const [hover, setHover] = useState(false);
  const router = useRouter();
  const jumpToLink = () => actionLink && router.push(actionLink);
  return (
    <Box
      sx={{ transition: "all 100ms", background: hover ? "#ccc" : undefined, cursor: "pointer", p: 1 }}
      onClick={jumpToLink}
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

export default LayoutHeader;
