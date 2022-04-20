import type { NextPage } from "next";
import Image from "next/image";
import Layout from "../components/layout";
import styles from "../styles/Home.module.css";
import { gql, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import client from "../apollo-client";
import { AuthContext } from "./_app";
import { Stack } from "@mui/material";
import Link from "next/link";
import { cpSync } from "fs";
import { TradeRequestEntity, UserEntity } from "@entities";
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

interface TradeRequestRes extends TradeRequestEntity {
  owner: UserEntity;
}

const NewTradeRequests = () => {
  const { data } = useQuery<{ getTradeRequests: TradeRequestRes[] }>(GET_RECENTS);
  const [requests, setRequests] = useState<TradeRequestRes[]>(data?.getTradeRequests || []);
  useEffect(() => {
    const subscription = client.subscribe<{ newRequests: TradeRequestRes[] }>({ query: NEW_REQEUST_SUB }).subscribe(({ data }) => {
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
    <Stack flex={1}>
      <h3>新着リクエスト</h3>
      {requests?.map(({ id, title, content, owner, createdAt }) => (
        <span key={id} style={{ margin: 5 }}>
          {title} - {owner.displayName} [{createdAt.toString()}]
        </span>
      ))}
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
    </Layout>
  );
};

export default Home;
