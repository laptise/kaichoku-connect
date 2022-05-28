import { useQuery } from "@apollo/client";
import { Trade, User, WithPagination } from "@entities";
import { Box, List, ListItem, Stack, Typography } from "@mui/material";
import { csp } from "chained-style-props";
import Link from "next/link";
import { useState } from "react";
import { DashboardLayout } from "../../components/dashboard-layout";
import { requireAuth } from "../../components/use-auth";
import { AuthRequiredPage } from "../../env";
import { GET_TRADES_WITH_QUERY } from "../../gqls/queries/trade";
const emails = ["username@gmail.com", "user02@gmail.com"];

export type DashboardProps = {
  userData: User;
};

const DashTrade: AuthRequiredPage<DashboardProps> = ({ payload, userData }) => {
  const { data, loading } = useQuery<NestedQuery<"getTrades", WithPagination<Trade>>>(GET_TRADES_WITH_QUERY, {
    variables: { userId: payload.userId, userType: "All" },
  });
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return payload ? (
    <DashboardLayout pageTitle={"取引 - ダッシュボード"} mainId={"dashboard"} payload={payload} tabIndex={2}>
      <Stack direction="row">
        <Typography>進行中の取引 : {data?.getTrades.pageInfo.totalCount}</Typography>
      </Stack>
      <TradesArea trades={data?.getTrades.nodes || []} />
    </DashboardLayout>
  ) : (
    <>no</>
  );
};

const TradesArea: React.FC<{ trades: Trade[] }> = ({ trades }) => {
  return (
    <Box style={{ flex: 1 }}>
      <h3>取引一覧</h3>
      <List>
        {trades?.map((trade) => (
          <SingleTrade key={trade.id} trade={trade} />
        ))}
      </List>
    </Box>
  );
};

const SingleTrade: React.FC<{ trade: Trade }> = ({ trade }) => {
  return (
    <Link href={`/trades/${trade.id}`} passHref={true}>
      <ListItem style={{ cursor: "pointer" }}>
        <Stack style={csp().Flex.gap(5).csp}>
          <h2>{trade.request?.title}</h2>
        </Stack>
      </ListItem>
    </Link>
  );
};

export default DashTrade;

export const getServerSideProps = requireAuth;
