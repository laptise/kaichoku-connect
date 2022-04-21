import { gql } from "@apollo/client";
import { TradeRequestEntity, TradeRequestRes } from "@entities";
import { Paper, Stack } from "@mui/material";
import { GetServerSideProps } from "next";
import client, { ssrClient } from "../../apollo-client";
import Layout from "../../components/layout";

const SingleTradeRequest: React.FC<{ data: TradeRequestRes }> = ({ data }) => {
  const { title, content, owner, createdAt } = data;
  const { displayName } = owner;
  return (
    <Layout pageTitle={`${title}`} mainId="singleTradeRequest">
      <Paper>
        <Stack>
          <h1>{title}</h1>
          <h4>{displayName}</h4>
          <p>{createdAt.toString()}</p>
          <p>{content}</p>
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
        }
      }
    }
  `;

  const { data } = await ssrClient.query<{ getTradeRequestById: TradeRequestRes }>({ query, variables: { id } });
  console.log(data);
  return { props: { data: data.getTradeRequestById } };
  console.log("s");
};
