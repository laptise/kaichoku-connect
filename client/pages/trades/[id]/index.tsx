import { Trade } from "@entities";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { csp } from "chained-style-props";
import { GetServerSideProps } from "next";
import { createContext, useContext } from "react";
import client from "../../../apollo-client";
import Layout from "../../../components/layout";
import { requireAuth } from "../../../components/use-auth";
import { AuthRequiredPage } from "../../../env";
import { GET_TRADE_BY_ID } from "../../../gqls/queries/trade";

type SingleTradeProps = {
  trade: Trade;
};

const TradeContext = createContext<Trade | null>(null);
const SingleTrade: AuthRequiredPage<SingleTradeProps> = ({ payload, trade }) => {
  return (
    <Layout pageTitle={"取引"} mainId={"tradeMain"} payload={payload}>
      <TradeContext.Provider value={trade}>
        <Stack style={csp().Flex.row.gap(10).Size.margin(10).csp}>
          <TradeInfo />
          <ChatRoom />
        </Stack>
      </TradeContext.Provider>
    </Layout>
  );
};

const TradeInfo = () => {
  const trade = useContext(TradeContext);
  return (
    <Paper style={csp().Size.padding(10).csp}>
      <Stack>
        <Box>
          <Typography variant="h5">{trade?.request?.title}</Typography>
        </Box>
        <Box>
          <Typography variant="caption">分類</Typography>
          {trade?.request?.majorCategory?.name} - {trade?.request?.minorCategory?.name}
        </Box>
        <Box>
          <Typography variant="caption">商品</Typography>
          {trade?.request?.maker?.name} - {trade?.request?.product?.name}
        </Box>
        <Box>
          <Typography variant="caption">依頼者</Typography>
          {trade?.owner?.displayName}
        </Box>
        <Box>
          <Typography variant="caption">販売者</Typography>
          {trade?.catcher?.displayName}
        </Box>
      </Stack>
    </Paper>
  );
};

const ChatRoom = () => {
  return <Paper style={csp().Size.padding(10).csp}>チャット</Paper>;
};

export default SingleTrade;

export const getServerSideProps: GetServerSideProps<SingleTradeProps> = (ctx) =>
  requireAuth(ctx, async ({ params }) => {
    const res = await client
      .query<NestedQuery<"getTradeById", Trade>>({ query: GET_TRADE_BY_ID, variables: { id: Number(params!.id) } })
      .then((x) => x.data.getTradeById);
    return { props: { trade: res } };
  });
