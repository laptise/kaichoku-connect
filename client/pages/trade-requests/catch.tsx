import { Paper, Stack } from "@mui/material";
import { GetServerSideProps } from "next";
import { checkAuthSSR } from "../../axios";
import Layout from "../../components/layout";
import { AuthNextPage } from "../../env";

const CatchRequestPage: AuthNextPage = ({ payload }) => {
  return (
    <Layout pageTitle={"取引リクエストを受け取る"} mainId={""} payload={payload}>
      <Paper>
        <Stack padding={1}>
          <h2>取引リクエストを受け取る</h2>
        </Stack>
      </Paper>
    </Layout>
  );
};
export default CatchRequestPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const payload = await checkAuthSSR(req);
  return { props: { payload } };
};
