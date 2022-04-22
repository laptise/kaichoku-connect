import { gql } from "@apollo/client";
import { NestedQuery, TradeRequestEntity, UserEntity } from "@entities";
import { Paper } from "@mui/material";
import { GetServerSideProps } from "next";
import { ssrClient } from "../../apollo-client";
import Layout from "../../components/layout";

const UserPage: React.FC<{ data: UserEntity }> = ({ data }) => {
  const { displayName } = data;

  return (
    <Layout pageTitle={`${displayName}`} mainId="singleUserInfo">
      <Paper>
        <div>{displayName}</div>
      </Paper>
    </Layout>
  );
};

export default UserPage;
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params) throw null;
  const id = Number(params.id);
  console.log(params);
  const query = gql`
    query getUserById($id: Float!) {
      getUserById(id: $id) {
        displayName
      }
    }
  `;

  const { getUserById } = await ssrClient.query<NestedQuery<"getUserById", UserEntity>>({ query, variables: { id } }).then((res) => res.data);
  console.log(getUserById);
  return { props: { data: getUserById } };
};
