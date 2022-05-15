import { gql, useQuery } from "@apollo/client";
import { TradeRequest } from "@entities";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import client from "../apollo-client";
import Layout from "../components/layout";
import { AuthNextPage } from "../env";
import type { GetServerSideProps } from "next";
import { withAuth } from "../components/use-auth";

const Home: AuthNextPage = ({ payload }) => {
  const [addedUser, setAddedUser] = useState<any | null>(null);
  useEffect(() => {
    const subscription = client.subscribe<{ userAdded: any }>({ query: QUERY }).subscribe((data) => {
      const addedUser = data.data?.userAdded;
      if (addedUser) {
        setAddedUser(addedUser);
      }
    });
    return () => subscription.unsubscribe();
  }, []);
  return (
    <Layout pageTitle="index" mainId="index" payload={payload}>
      <Paper style={{ width: "100%" }}>
        <Stack flex={1} justifyContent="center" alignItems={"center"} divider={<Divider sx={{ bgColor: "red", height: 1, width: "100%" }} />}>
          <MainSlider />
          <StepSlider />
          <StepSlider2 />
          <StepSlider3 />
          <Stack flex={1} direction="row" width={"100%"}>
            <NewTradeRequests />
          </Stack>
        </Stack>
      </Paper>
    </Layout>
  );
};

const MainSlider = () => (
  <Stack alignItems={"center"} justifyContent="center" spacing={3} sx={{ height: 300 }}>
    <Typography variant="body2">外出先の近くでリクエストを承諾、そのまま郵便局で発送して完結！</Typography>
    <Typography variant="h4">新しい消費スタイル、 KAICHOKU</Typography>
    <Link href="/signin" passHref={true}>
      <Button variant="contained">今すぐ始める</Button>
    </Link>
  </Stack>
);

const StepSlider = () => (
  <Stack alignItems={"flex-start"} justifyContent="center" spacing={3} sx={{ height: 300 }} style={{ paddingLeft: 200, width: "100%" }}>
    <Typography variant="body2">国内で手に入らないものは、リクエストを出そう！</Typography>
    <Typography variant="h4">国家間の取引リクエスト</Typography>
    <Typography variant="body1">対象国に取引リクエストを出すことで、対象国にお住まいの会員が商品を発送してくれます。 </Typography>
    <Typography variant="caption">※ 利用可能地域及び国際取引関する注意事項</Typography>
  </Stack>
);

const StepSlider2 = () => (
  <Stack alignItems={"flex-start"} justifyContent="center" spacing={3} sx={{ height: 300 }} style={{ paddingLeft: 200, width: "100%" }}>
    <Typography variant="body2">あの製品なんだっけ…？何を買えばいいか分からない…</Typography>
    <Typography variant="h4">オープンリクエスト</Typography>
    <Typography variant="body1">
      製品名が分からない、何を買えばいいか分からないときに依頼するサービスです。
      <br />
      取引が開始する前にチャットを通じで購入品の提案をしてから進められます。
    </Typography>
  </Stack>
);

const StepSlider3 = () => (
  <Stack alignItems={"flex-start"} justifyContent="center" spacing={3} sx={{ height: 300 }} style={{ paddingLeft: 200, width: "100%" }}>
    <Typography variant="body2">ちょっとした小遣い稼ぎにも</Typography>
    <Typography variant="h4">リクエストをキャッチ！</Typography>
    <Typography variant="body1">
      外出先で偶然見つかるかも？
      <br />
      もしくは時間かけていっぱい送るのもあり！
    </Typography>
  </Stack>
);

const NewTradeRequests = () => {
  const { data } = useQuery<{ getTradeRequests: TradeRequest[] }>(GET_RECENTS);
  const [requests, setRequests] = useState<TradeRequest[]>(data?.getTradeRequests || []);
  useEffect(() => {
    const subscription = client.subscribe<{ newRequests: TradeRequest[] }>({ query: NEW_REQEUST_SUB }).subscribe(({ data }) => {
      const requests = data?.newRequests;
      if (requests) {
        setRequests(requests);
      }
    });
    return () => subscription.unsubscribe();
  }, []);
  useEffect(() => {
    const requests = data?.getTradeRequests;
    if (requests) setRequests(requests);
  }, [data]);
  return (
    <Stack id="newestRequestsArea" flex={1} padding={2}>
      <h3 style={{ margin: 0 }}>新着リクエスト</h3>
      <Stack divider={<Divider />}>
        {requests?.map(({ id, title, content, owner, createdAt, targetCountryCode }) => (
          <Link key={id} passHref={true} href={`/trade-requests/${targetCountryCode}/${id}`}>
            <Stack margin={1} justifyContent="space-between" direction={"row"} style={{ cursor: "pointer" }}>
              <span>{title}</span>
              <span> {format(new Date(createdAt), "MM-dd")}</span>
            </Stack>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
};

const QUERY = gql`
  subscription {
    userAdded {
      email
      displayName
    }
  }
`;

const GET_RECENTS = gql`
  query {
    getTradeRequests(limit: 10) {
      targetCountryCode
      id
      title
      createdAt
      owner {
        displayName
      }
    }
  }
`;

const NEW_REQEUST_SUB = gql`
  subscription {
    newRequests {
      id
      title
      targetCountryCode
      createdAt
      owner {
        displayName
      }
    }
  }
`;

export const getServerSideProps: GetServerSideProps = withAuth;

export default Home;
