import { AddCircle } from "@mui/icons-material";
import { Fab, Paper, Stack } from "@mui/material";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { checkAuthSSR } from "../axios";
import Layout from "../components/layout";
import { AuthNextPage } from "../env";

const Dashboard: AuthNextPage = ({ payload }) => {
  return (
    <Layout pageTitle={"ダッシュボード"} mainId={"dashboard"} payload={payload}>
      <Paper elevation={2} sx={{ padding: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <h2>ダッシュボード</h2>
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
        </Stack>
      </Paper>
    </Layout>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const payload = await checkAuthSSR(req);
  return {
    redirect: payload ? undefined : { destination: "/signin", permanent: false },
    props: { payload },
  };
};
