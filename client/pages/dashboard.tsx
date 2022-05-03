import { GetServerSideProps } from "next";
import { checkAuthSSR } from "../axios";
import Layout from "../components/layout";
import { AuthNextPage } from "../env";

const Dashboard: AuthNextPage = ({ payload }) => {
  return (
    <Layout pageTitle={"ダッシュボード"} mainId={"dashboard"} payload={payload}>
      <div>das</div>
    </Layout>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const payload = await checkAuthSSR(req);
  return {
    redirect: payload ? undefined : { destination: "/sigin", permanent: false },
    props: { payload },
  };
};
