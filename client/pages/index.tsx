import type { NextPage } from "next";
import Layout from "../components/layout";
import { gql, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import client from "../apollo-client";
import { AuthContext } from "./_app";
import { Divider, Paper, Stack } from "@mui/material";
import Link from "next/link";
import { TradeRequestEntity, UserEntity } from "@entities";
import { format } from "date-fns";
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
        {requests?.map(({ id, title, content, owner, createdAt }) => (
          <Link key={id} passHref={true} href={`/trade-requests/${id}`}>
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

const Home: NextPage = () => {
  const auth = useContext(AuthContext);
  console.log(auth);
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
    <Layout pageTitle="index" mainId="index">
      <Paper style={{ width: "100%" }}>
        <Stack flex={1} justifyContent="center" alignItems={"center"}>
          <Stack flex={1} direction="row" width={"100%"}>
            <NewTradeRequests />
            {auth && (
              <Link href={"/trade-requests/new"} passHref={true}>
                <button>add new Trades</button>
              </Link>
            )}
            <Stack flex={1}>d</Stack>
          </Stack>
        </Stack>
      </Paper>
    </Layout>
  );
};

export default Home;
