import { Trade } from "@entities";
import { Box, Paper, Stack, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import { csp } from "chained-style-props";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import { createContext, FC, useContext } from "react";
import client from "../../../apollo-client";
import ChatRoom from "../../../components/chat-room";
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
        <Stack style={csp().Flex.row.gap(10).Size.padding(10).Size.height("100%").csp}>
          <TradeInfo />
          <ChatRoom trade={trade} payload={payload} />
        </Stack>
      </TradeContext.Provider>
    </Layout>
  );
};

const steps = ["取引依頼", "販売者の申請", "取引開始", "商品購買完了", "配送完了"];

const TradeInfo = () => {
  const trade = useContext(TradeContext);
  return (
    <Paper style={csp().Size.padding(10).csp}>
      <Stack>
        <Box>
          <Typography variant="h5">{trade?.tradeRequest?.title}</Typography>
        </Box>
        <Box>
          <Typography variant="caption">分類</Typography>
          {trade?.tradeRequest?.majorCategory?.name} - {trade?.tradeRequest?.minorCategory?.name}
        </Box>
        <Box>
          <Typography variant="caption">商品</Typography>
          {trade?.tradeRequest?.maker?.name} - {trade?.tradeRequest?.product?.name}
        </Box>
        <Box>
          <Typography variant="caption">依頼者</Typography>
          {trade?.owner?.displayName}
        </Box>
        <Box>
          <Typography variant="caption">販売者</Typography>
          {trade?.catcher?.displayName}
        </Box>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={2} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label} expanded={true}>
                <StepLabel>{label}</StepLabel>
                <SingleStepContent stepNumber={index} />
              </Step>
            ))}
          </Stepper>
        </Box>
      </Stack>
    </Paper>
  );
};

const SingleStepContent: FC<{ stepNumber: number }> = ({ stepNumber }) => {
  const trade = useContext(TradeContext);
  const TradeStarted = () => {
    const date = new Date(trade!.tradeRequest!.createdAt!);
    return (
      <StepContent>
        <Stack>
          <Typography variant="body2">{format(date, "yyyy年M月d日 h時m分")}</Typography>
        </Stack>
      </StepContent>
    );
  };

  const SellerConfirmed = () => {
    const date = new Date(trade!.requestCatch?.createdAt!);
    return (
      <StepContent>
        <Stack>
          <Typography variant="body2">{format(date, "yyyy年M月d日 h時m分")}</Typography>
        </Stack>
      </StepContent>
    );
  };

  const TradeHasBegun = () => {
    const date = new Date(trade!.createdAt!);
    return (
      <StepContent>
        <Stack>
          <Typography variant="body2">{format(date, "yyyy年M月d日 h時m分")}</Typography>
        </Stack>
      </StepContent>
    );
  };

  switch (stepNumber) {
    case 0:
      return <TradeStarted />;
    case 1:
      return <SellerConfirmed />;
    case 2:
      return <TradeHasBegun />;
    default:
      return <StepContent />;
  }
};

export default SingleTrade;

export const getServerSideProps: GetServerSideProps<SingleTradeProps> = (ctx) =>
  requireAuth(ctx, async ({ params }) => {
    const res = await client
      .query<NestedQuery<"getTradeById", Trade>>({ query: GET_TRADE_BY_ID, variables: { id: Number(params!.id) } })
      .then((x) => x.data.getTradeById);
    return { props: { trade: res } };
  });
