import { gql } from "@apollo/client";
import { TradeRequest, User } from "@entities";
import { Badge, Box, Chip, List, ListItem, Stack } from "@mui/material";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { DashboardProps } from ".";
import client from "../../apollo-client";
import { DashboardLayout } from "../../components/dashboard-layout";
import { requireAuth } from "../../components/use-auth";
import { AuthRequiredPage } from "../../env";
import { useUserData } from "../../hooks/use-user-data";
import { csp } from "../../styles/ChainedStyleProperties";

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
const TradeReuqestDashboard: AuthRequiredPage<DashboardProps> = ({ payload, userData }) => {
  const user = useUserData(payload);

  return (
    <DashboardLayout payload={payload} pageTitle={""} mainId={""} tabIndex={1}>
      <Stack direction="row" justifyContent="space-between">
        <RequestingTrades requests={userData?.requestingTrades || []} />
      </Stack>{" "}
    </DashboardLayout>
  );
};

const RequestingTrades: React.FC<{ requests: TradeRequest[] }> = ({ requests }) => {
  return (
    <Box style={{ flex: 1 }}>
      <h3>取引リクエスト一覧</h3>
      <List>
        {requests.map((request) => (
          <SingleTradeRequest key={request.id} request={request} />
        ))}
      </List>
    </Box>
  );
};

enum Chips {
  None,
  Comment,
  Request,
}

const SingleTradeRequest: React.FC<{ request: TradeRequest }> = ({ request }) => {
  const [selecting, setSelecting] = useState(Chips.None);
  return (
    <ListItem>
      <Stack style={csp().Flex.gap(5).style}>
        <h2>{request.title}</h2>
        <Stack direction="row">
          <Badge color="primary" badgeContent={request.comments?.length} sx={{ ml: 2 }}>
            <Chip
              label="コメント"
              onClick={() => setSelecting((val) => (val === Chips.Comment ? Chips.None : Chips.Comment))}
              variant={selecting === Chips.Comment ? undefined : "outlined"}
            />
          </Badge>
          <Badge color="primary" badgeContent={request.pendingCatches?.length} sx={{ ml: 2 }}>
            <Chip
              label="取引開始申請"
              onClick={() => setSelecting((val) => (val === Chips.Request ? Chips.None : Chips.Request))}
              variant={selecting === Chips.Request ? undefined : "outlined"}
            />
          </Badge>
        </Stack>
        {selecting === Chips.Comment && <Box>da</Box>}
        {selecting === Chips.Request && <Box>req</Box>}
      </Stack>
    </ListItem>
  );
};

export default TradeReuqestDashboard;

export const getServerSideProps: GetServerSideProps = (ctx) =>
  requireAuth<DashboardProps>(ctx, async ({ payload }) => {
    const userData = await client
      .query<NestedQuery<"getUserById", User>>({ query: GET_INFO_FOR_DASHBOARD, variables: { userId: payload.userId } })
      .then((res) => res.data.getUserById);
    return { props: { userData } };
  });
