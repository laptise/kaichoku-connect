import { gql } from "@apollo/client";
import { NestedQuery, TradeRequestEntity, UserEntity } from "@entities";
import { Paper } from "@mui/material";
import { GetServerSideProps } from "next";
import { ssrClient } from "../../apollo-client";
import Layout from "../../components/layout";

const UserPage: React.FC<{ data: UserEntity }> = ({ data }) => {
  const { displayName, id } = data;

  return (
    <Layout pageTitle={`${displayName}`} mainId="singleUserInfo">
      <Paper style={{ width: "100%", margin: 10, padding: 10 }}>
        <small>@{id}</small>
        <h1 style={{ margin: 0 }}>{displayName}</h1>
      </Paper>
    </Layout>
  );
};

export default UserPage;
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params) throw null;
  const { id } = params!;
  console.log(params);
  const query = gql`
    query getUserById($id: String!) {
      getUserById(id: $id) {
        displayName
        id
      }
    }
  `;

  const { getUserById } = await ssrClient.query<NestedQuery<"getUserById", UserEntity>>({ query, variables: { id } }).then((res) => res.data);
  console.log(getUserById);
  return { props: { data: getUserById } };
};
