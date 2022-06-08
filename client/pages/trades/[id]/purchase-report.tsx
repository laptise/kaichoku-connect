import { Trade } from "@entities";
import { GetServerSideProps } from "next";
import client from "../../../apollo-client";
import Layout from "../../../components/layout";
import { requireAuth } from "../../../components/use-auth";
import { AuthNextPage, AuthRequiredPage } from "../../../env";
import { GET_TRADE_BY_ID } from "../../../gqls/queries/trade";

type SingleTradeProps = {
  trade: Trade;
};

const PurchaseReport: AuthRequiredPage<SingleTradeProps> = ({ trade, payload }) => {
  return (
    <Layout pageTitle={"商品手配完了のお知らせ"} mainId={""}>
      <div>{trade.tradeRequest?.title}</div>
    </Layout>
  );
};

export default PurchaseReport;

export const getServerSideProps: GetServerSideProps = (ctx) =>
  requireAuth(ctx, async ({ params, payload }) => {
    const res = await client
      .query<NestedQuery<"getTradeById", Trade>>({ query: GET_TRADE_BY_ID, variables: { id: Number(params!.id) } })
      .then((x) => x.data.getTradeById);
    return { props: { trade: res, payload } };
  });
