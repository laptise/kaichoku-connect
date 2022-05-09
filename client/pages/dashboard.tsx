import { AddCircle } from "@mui/icons-material";
import { Fab, Paper, Stack } from "@mui/material";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";
import { checkAuthSSR } from "../axios";
import ImageUploaderModal from "../components/image-uploader";
import Layout from "../components/layout";
import { AuthNextPage } from "../env";
const emails = ["username@gmail.com", "user02@gmail.com"];

const Dashboard: AuthNextPage = ({ payload }) => {
  const [open, setOpen] = useState(true);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

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
        <ImageUploaderModal selectedValue={selectedValue} open={open} onClose={handleClose} />
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
