import { JWTPayload } from "@entities";
import { Box, Paper, Stack, Tab, Tabs } from "@mui/material";
import Link from "next/link";
import { ReactNode, useRef, useState } from "react";
import { useUserData } from "../hooks/use-user-data";
import Layout from "./layout";

type DashboardLayoutProps = {
  children: ReactNode;
  payload: JWTPayload;
  pageTitle: string;
  mainId: string;
  tabIndex: number;
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, payload, pageTitle, mainId, tabIndex }) => {
  const user = useUserData(payload);
  const tabValue = useRef(tabIndex);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // setTabValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `dashboard-tab-${index}`,
      "aria-controls": `dashboard-tabpanel-${index}`,
    };
  }
  return (
    <Layout pageTitle={pageTitle} mainId={mainId} payload={payload}>
      <Paper elevation={2} sx={{ padding: 2 }}>
        <Stack flex={1}>
          <h2>{payload.username}さん、こんにちは！</h2>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabValue.current} onChange={handleChange} aria-label="basic tabs example">
              <Link href="/dashboard/" passHref={true}>
                <Tab label="ホーム" {...a11yProps(0)} />
              </Link>
              <Link href="/dashboard/trade-requests" passHref={true}>
                <Tab label="取引リクエスト" {...a11yProps(1)} />
              </Link>
              <Tab label="取引" {...a11yProps(2)} />
            </Tabs>
          </Box>
          {children}
        </Stack>
      </Paper>
    </Layout>
  );
};
