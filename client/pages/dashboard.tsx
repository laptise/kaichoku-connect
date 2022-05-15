import { gql } from "@apollo/client";
import { TradeRequest, User } from "@entities";
import { AddCircle } from "@mui/icons-material";
import { Avatar, Badge, Box, Chip, Fab, List, ListItem, ListItemText, Paper, Stack, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";
import client from "../apollo-client";
import ImageUploaderModal from "../components/image-uploader";
import Layout from "../components/layout";
import { requireAuth } from "../components/use-auth";
import { AuthRequiredPage } from "../env";
import { useUserData } from "../hooks/use-user-data";
const emails = ["username@gmail.com", "user02@gmail.com"];

const GET_INFO_FOR_DASHBOARD = gql`
  query ($userId: String!) {
    getUserById(id: $userId) {
      id
      requestingTrades {
        id
        title
        majorCategory {
          name
        }
        minorCategory {
          name
        }
        maker {
          name
        }
        product {
          name
        }
        pendingCatches {
          id
          createdAt
          msg
          catcher {
            id
          }
        }
        comments {
          id
        }
      }
    }
  }
`;

type DashboardProps = {
  userData: User;
};

const Dashboard: AuthRequiredPage<DashboardProps> = ({ payload, userData }) => {
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
        <RequestingTrades requests={userData?.requestingTrades || []} />
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

const RequestingTrades: React.FC<{ requests: TradeRequest[] }> = ({ requests }) => {
  return (
    <Box>
      <h3>取引リクエスト一覧</h3>
      <List>
        {requests.map((request) => (
          <ListItem key={request.id}>
            <ListItemText primary={request.title} secondary={null} />
            <Badge color="primary" badgeContent={request.comments?.length} sx={{ ml: 2 }}>
              <Chip label="コメント" variant="outlined" onClick={() => {}} />
            </Badge>
            <Badge color="primary" badgeContent={request.pendingCatches?.length} sx={{ ml: 2 }}>
              <Chip label="取引開始申請" variant="outlined" onClick={() => {}} />
            </Badge>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const ReadyToStartTrade = () => {};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = (ctx) =>
  requireAuth<DashboardProps>(ctx, async ({ payload }) => {
    const userData = await client
      .query<NestedQuery<"getUserById", User>>({ query: GET_INFO_FOR_DASHBOARD, variables: { userId: payload.userId } })
      .then((res) => res.data.getUserById);
    return { props: { userData } };
  });
