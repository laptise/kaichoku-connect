import { gql } from "@apollo/client";
import { JWTPayload, TradeRequest, User } from "@entities";
import { AddCircle } from "@mui/icons-material";
import { Avatar, Badge, Box, Chip, Fab, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";
import client from "../../apollo-client";
import { DashboardLayout } from "../../components/dashboard-layout";
import ImageUploaderModal from "../../components/image-uploader";
import { requireAuth } from "../../components/use-auth";
import { AuthRequiredPage } from "../../env";
import { useUserData } from "../../hooks/use-user-data";
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

enum DashboardView {
  Index = "Index",
}

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
    <DashboardLayout pageTitle={"ダッシュボード"} mainId={"dashboard"} payload={payload} tabIndex={0}>
      <Stack direction="row" justifyContent="space-between">
        <RequestingTrades requests={userData?.requestingTrades || []} />
      </Stack>
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
    </DashboardLayout>
  ) : (
    <>no</>
  );
};

const RequestingTrades: React.FC<{ requests: TradeRequest[] }> = ({ requests }) => {
  return (
    <Box style={{ flex: 1 }}>
      <h3>取引リクエスト一覧</h3>
      <List>
        {requests.map((request) => (
          <ListItem key={request.id}>
            <Stack style={{ width: "100%" }}>
              <h2>{request.title}</h2>
              <Stack direction="row">
                <Badge color="primary" badgeContent={request.comments?.length} sx={{ ml: 2 }}>
                  <Chip label="コメント" variant="outlined" onClick={() => {}} />
                </Badge>
                <Badge color="primary" badgeContent={request.pendingCatches?.length} sx={{ ml: 2 }}>
                  <Chip label="取引開始申請" variant="outlined" onClick={() => {}} />
                </Badge>
              </Stack>
            </Stack>
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
