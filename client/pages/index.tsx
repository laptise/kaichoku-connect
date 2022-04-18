import type { NextPage } from "next";
import Image from "next/image";
import Layout from "../components/layout";
import styles from "../styles/Home.module.css";
import { gql } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import client from "../apollo-client";
import { AuthContext } from "./_app";
const QUERY = gql`
  subscription {
    userAdded {
      email
      displayName
    }
  }
`;

interface QuerRes {
  userAdded: any;
}
const Home: NextPage = () => {
  const auth = useContext(AuthContext);
  console.log(auth);
  const [addedUser, setAddedUser] = useState<any | null>(null);
  useEffect(() => {
    const subscription = client.subscribe<QuerRes>({ query: QUERY }).subscribe((data) => {
      const addedUser = data.data?.userAdded;
      if (addedUser) {
        setAddedUser(addedUser);
      }
    });
    return () => subscription.unsubscribe();
  }, []);
  return (
    <Layout pageTitle="index" mainId="index">
      <div className={styles.container}>
        <h1 className={styles.title}>
          Welcosme to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        {addedUser != null && (
          <span>
            New user : {addedUser.displayName} ({addedUser.email})
          </span>
        )}
        <p className={styles.description}>
          Get started by editing <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a href="https://github.com/vercel/next.js/tree/canary/examples" className={styles.card}>
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
          </a>
        </div>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </footer>
      </div>
    </Layout>
  );
};

export default Home;
