import { gql } from "@apollo/client";
import { NestedQuery, TradeRequestEntity } from "@entities";
import { Newspaper } from "@mui/icons-material";
import { Paper, Stack } from "@mui/material";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import Link from "next/link";
import client, { ssrClient } from "../../apollo-client";
import Layout from "../../components/layout";

const SingleTradeRequest: React.FC<{ data: TradeRequestEntity }> = ({ data }) => {
  const { title, content, owner, createdAt } = data;
  const { displayName, id } = owner!;
  return (
    <Layout pageTitle={`${title}`} mainId="singleTradeRequest">
      <Paper style={{ width: "100%", margin: 10, borderRadius: 5, overflow: "hidden" }}>
        <Stack>
          <Stack style={{ padding: "5px 10px", borderBottom: "1px solid #ccc", backgroundColor: "#aaa" }}>
            <h4 style={{ display: "flex", alignItems: "center", color: "white", gap: 10 }}>
              <Newspaper /> 取引依頼
            </h4>
          </Stack>
          <Stack style={{ padding: 10 }}>
            <small> {format(new Date(createdAt), "yyyy-MM-dd")}</small>
            <h1 style={{ margin: 10, marginLeft: 20 }}>{title}</h1>
            <Link href={`/users/${id}`} passHref={true}>
              <h4 style={{ cursor: "pointer" }}>{displayName}</h4>
            </Link>
            <p>{content}</p>
          </Stack>
        </Stack>
      </Paper>
    </Layout>
  );
};
export default SingleTradeRequest;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params) throw null;
  const id = Number(params.id);
  console.log(params);
  const query = gql`
    query getTradeRequestById($id: Float!) {
      getTradeRequestById(id: $id) {
        title
        content
        createdAt
        owner {
          displayName
          id
        }
      }
    }
  `;

  const { getTradeRequestById } = await ssrClient
    .query<NestedQuery<"getTradeRequestById", TradeRequestEntity>>({ query, variables: { id } })
    .then((res) => res.data);
  return { props: { data: getTradeRequestById } };
};
