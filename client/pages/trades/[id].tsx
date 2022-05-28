import { GetServerSideProps } from "next";
import Layout from "../../components/layout";
import { requireAuth } from "../../components/use-auth";
import { AuthRequiredPage } from "../../env";

const SingleTrade: AuthRequiredPage = ({ payload }) => {
  return (
    <Layout pageTitle={"asd"} mainId={""}>
      da
    </Layout>
  );
};
export default SingleTrade;

export const getServerSideProps: GetServerSideProps = (ctx) =>
  requireAuth(ctx, async () => {
    return { props: {} };
  });
