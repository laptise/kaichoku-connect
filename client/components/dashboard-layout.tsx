import { JWTPayload } from "@entities";
import { Avatar, Box, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode, useRef } from "react";
import { csp } from "chained-style-props";
import ImageUploaderModal, { ModalForwards } from "./image-uploader";
import Layout from "./layout";
type DashboardLayoutProps = {
  children: ReactNode;
  payload: JWTPayload;
  pageTitle: string;
  mainId: string;
  tabIndex: number;
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, payload, pageTitle, mainId, tabIndex }) => {
  const tabValue = useRef(tabIndex);
  const modalRef = useRef<ModalForwards>(null);
  const openImageUpdate = () => {
    modalRef.current?.openModal();
  };

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
      <Stack direction="row" sx={{ p: 2 }} spacing={2}>
        <Paper elevation={2} sx={{ padding: 2 }} style={{ flex: 1 }}>
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
                <Link href="/dashboard/trades" passHref={true}>
                  <Tab label="取引" {...a11yProps(2)} />
                </Link>
                <Link href="/dashboard/profile" passHref={true}>
                  <Tab label="プロフィール" {...a11yProps(3)} />
                </Link>
              </Tabs>
            </Box>
            {children}
          </Stack>
        </Paper>
        <UserBox auth={payload} openImageUpdate={openImageUpdate} />
      </Stack>
      <ImageUploaderModal ref={modalRef} />
    </Layout>
  );
};

type UserBoxProps = {
  auth: JWTPayload;
  openImageUpdate(): void;
};

const UserBox: React.FC<UserBoxProps> = ({ auth, openImageUpdate }) => {
  return (
    <Paper
      sx={{
        ...csp()
          .Flex.column.topAlign.horizontalCenterAlign.Size.minWidth(320)
          .minHeight("100%")
          .Size.padding(5) //
          .Border.radius(2).csp, //
        m: 1,
      }}
      elevation={2}
    >
      <Avatar onClick={openImageUpdate} alt={auth?.username} src={auth?.userImgUrl} sx={{ width: 56, height: 56 }} />
      <Typography variant="body1">@{auth?.userId}</Typography>
      <Typography variant="h4">{auth?.username}</Typography>
      <Typography variant="body2">{auth?.userEmail}</Typography>
    </Paper>
  );
};
