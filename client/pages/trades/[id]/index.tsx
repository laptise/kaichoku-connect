import { Trade } from "@entities";
import { GetServerSideProps } from "next";
import { useState } from "react";
import client from "../../../apollo-client";
import ChatRoom from "../../../components/chat-room";
import TradeLayout from "../../../components/trade-layout";
import { requireAuth } from "../../../components/use-auth";
import { AuthRequiredPage } from "../../../env";
import { GET_TRADE_BY_ID } from "../../../gqls/queries/trade";

type SingleTradeProps = {
  trade: Trade;
};

const SingleTrade: AuthRequiredPage<SingleTradeProps> = ({ payload, trade }) => {
  const mobileTradeInfoViewingState = useState(false);
  const [isMobileTradeInfoViewing, setIsMobileTradeInfoViewing] = mobileTradeInfoViewingState;
  return (
    <TradeLayout mobileTradeInfoViewingState={mobileTradeInfoViewingState} pageTitle={"取引"} mainId={"tradeMain"} trade={trade} payload={payload}>
      <ChatRoom expanded={isMobileTradeInfoViewing} onExpand={setIsMobileTradeInfoViewing} trade={trade} payload={payload} />
    </TradeLayout>
  );
};

export default SingleTrade;

export const getServerSideProps: GetServerSideProps<SingleTradeProps> = (ctx) =>
  requireAuth(ctx, async ({ params }) => {
    const res = await client
      .query<NestedQuery<"getTradeById", Trade>>({ query: GET_TRADE_BY_ID, variables: { id: Number(params!.id) } })
      .then((x) => x.data.getTradeById);
    return { props: { trade: res } };
  });
