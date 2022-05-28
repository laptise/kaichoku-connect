import { GetServerSideProps } from "next";
import client from "../../apollo-client";
import Layout from "../../components/layout";
import { requireAuth } from "../../components/use-auth";
import { AuthRequiredPage } from "../../env";
import { GET_TRADE_BY_ID } from "../../gqls/queries/trade";

const SingleTrade: AuthRequiredPage = ({ payload }) => {
  return (
    <Layout pageTitle={"取引"} mainId={""}>
      da
    </Layout>
  );
};
export default SingleTrade;

export const getServerSideProps: GetServerSideProps = (ctx) =>
  requireAuth(ctx, async ({ params }) => {
    const res = await client.query({ query: GET_TRADE_BY_ID, variables: { id: Number(params!.id) } });
    console.log(res);
    return { props: {} };
  });
