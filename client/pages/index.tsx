import { gql, useQuery } from "@apollo/client";
import { TradeRequestEntity } from "@entities";
import { Divider, Paper, Stack } from "@mui/material";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import client from "../apollo-client";
import Layout from "../components/layout";
import { AuthNextPage } from "../env";
import type { GetServerSideProps } from "next";
import { withAuth } from "../components/use-auth";
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

const NewTradeRequests = () => {
  const { data } = useQuery<{ getTradeRequests: TradeRequestEntity[] }>(GET_RECENTS);
  const [requests, setRequests] = useState<TradeRequestEntity[]>(data?.getTradeRequests || []);
  useEffect(() => {
    const subscription = client.subscribe<{ newRequests: TradeRequestEntity[] }>({ query: NEW_REQEUST_SUB }).subscribe(({ data }) => {
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
        <Stack flex={1} justifyContent="center" alignItems={"center"}>
          <Stack flex={1} direction="row" width={"100%"}>
            <NewTradeRequests />
            <Stack flex={1}>d</Stack>
          </Stack>
        </Stack>
      </Paper>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = withAuth;
