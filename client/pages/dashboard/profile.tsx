import { useQuery } from "@apollo/client";
import { Trade, User, WithPagination } from "@entities";
import { Box, List, ListItem, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { csp } from "chained-style-props";
import Link from "next/link";
import { useState } from "react";
import { DashboardLayout } from "../../components/dashboard-layout";
import { requireAuth } from "../../components/use-auth";
import { AuthRequiredPage } from "../../env";
import { GET_TRADES_WITH_QUERY } from "../../gqls/queries/trade";
const emails = ["username@gmail.com", "user02@gmail.com"];

export type DashboardProps = {
  userData: User;
};

const DashTrade: AuthRequiredPage<DashboardProps> = ({ payload, userData }) => {
  const { data, loading } = useQuery<NestedQuery<"getTrades", WithPagination<Trade>>>(GET_TRADES_WITH_QUERY, {
    variables: { userId: payload.userId, userType: "All" },
  });
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
    <DashboardLayout pageTitle={"取引 - ダッシュボード"} mainId={"dashboard"} payload={payload} tabIndex={3}>
      hello
    </DashboardLayout>
  ) : (
    <>no</>
  );
};

export default DashTrade;

export const getServerSideProps = requireAuth;
