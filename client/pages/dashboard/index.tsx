import { User } from "@entities";
import { AddCircle } from "@mui/icons-material";
import { Fab } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { DashboardLayout } from "../../components/dashboard-layout";
import { requireAuth } from "../../components/use-auth";
import { AuthRequiredPage } from "../../env";
const emails = ["username@gmail.com", "user02@gmail.com"];

export type DashboardProps = {
  userData: User;
};

enum DashboardView {
  Index = "Index",
}

const Dashboard: AuthRequiredPage<DashboardProps> = ({ payload, userData }) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return payload ? (
    <DashboardLayout pageTitle={"ダッシュボード"} mainId={"dashboard"} payload={payload} tabIndex={0}>
      <>
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
      </>
    </DashboardLayout>
  ) : (
    <>no</>
  );
};

const ReadyToStartTrade = () => {};

export default Dashboard;

export const getServerSideProps = requireAuth;
