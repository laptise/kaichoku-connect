import { gql, useQuery } from "@apollo/client";
import { JWTPayload, User } from "@entities";
import { AddCircle } from "@mui/icons-material";
import { Avatar, Fab, Paper, Stack, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { checkAuthSSR } from "../axios";
import ImageUploaderModal from "../components/image-uploader";
import Layout from "../components/layout";
import { requireAuth } from "../components/use-auth";
import { AuthRequiredPage } from "../env";
const emails = ["username@gmail.com", "user02@gmail.com"];
const GET_PROFILE = gql`
  query ($id: String!) {
    getUserById(id: $id) {
      displayName
      id
      email
      imgUrl
    }
  }
`;

const useUserData = (payload: JWTPayload) => {
  const { data } = useQuery<NestedQuery<"getUserById", User>>(GET_PROFILE, { variables: { id: payload?.userId } });
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (data?.getUserById) {
      const user = data.getUserById;
      setUser(user);
    } else {
      setUser(null);
    }
  }, [data]);
  return user;
};

const Dashboard: AuthRequiredPage = ({ payload }) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);
  const user = useUserData(payload);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return payload ? (
    <Layout pageTitle={"ダッシュボード"} mainId={"dashboard"} payload={payload}>
      <Paper elevation={2} sx={{ padding: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <h2>{user?.displayName}さん、こんにちは！</h2>
          <Paper
            sx={{
              m: 1,
              p: 1,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minWidth: 320,
            }}
            elevation={2}
          >
            <Avatar onClick={handleClickOpen} alt={user?.displayName} src={user?.imgUrl} sx={{ width: 56, height: 56 }} />
            <Typography variant="body1">@{user?.id}</Typography>
            <Typography variant="h4">{user?.displayName}</Typography>
            <Typography variant="body2">{user?.email}</Typography>
          </Paper>
        </Stack>
        <ImageUploaderModal selectedValue={selectedValue} open={open} onClose={handleClose} />
        <>
          <Link href="/trade-requests/new" passHref={true}>
            <Fab variant="extended" color="primary" aria-label="add">
              <AddCircle sx={{ mr: 1 }} />
              新規取引リクエストを追加する
            </Fab>
          </Link>
          <Link href="/trade-requests/catch" passHref={true}>
            <Fab variant="extended" color="primary" aria-label="add">
              <AddCircle sx={{ mr: 1 }} />
              新規取引リクエストを受け取る
            </Fab>
          </Link>
        </>
      </Paper>
    </Layout>
  ) : (
    <>no</>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = requireAuth;
