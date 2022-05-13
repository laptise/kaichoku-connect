import { gql } from "@apollo/client";
import { UserBadgeStatusEntity, UserEntity } from "@entities";
import { Paper, Stack } from "@mui/material";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import client from "../../apollo-client";
import Layout from "../../components/layout";
import { requireAuth } from "../../components/use-auth";
import { AuthNextPage } from "../../env";

const Badges: React.FC<{ badge: UserBadgeStatusEntity }> = ({ badge }) => {
  const { gotAt, badgeInfo } = badge;
  const { name, note } = badgeInfo!;
  return <span title={format(new Date(gotAt), "yyyy:MM:dd")}>{name}</span>;
};

const UserPage: AuthNextPage<{ data: UserEntity }> = ({ data, payload }) => {
  const { displayName, id, usingBadges } = data;
  return (
    <Layout pageTitle={`${displayName}`} mainId="singleUserInfo" payload={payload}>
      <Paper style={{ width: "100%", margin: 10, padding: 10 }}>
        <Stack>
          {usingBadges?.map?.((badge) => (
            <Badges key={badge.badgeId} badge={badge} />
          ))}
          <Stack direction={"row"} alignItems="center">
            <h1 style={{ margin: 0 }}>{displayName}</h1>
            <small>@{id}</small>
          </Stack>
        </Stack>
      </Paper>
    </Layout>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = (ctx) =>
  requireAuth(ctx, async ({ params }) => {
    if (!params) throw null;
    const { id } = params!;
    const query = gql`
      query getUserById($id: String!) {
        getUserById(id: $id) {
          displayName
          id
          usingBadges {
            isUsing
            ownerId
            badgeId
            gotAt
            badgeInfo {
              name
              content
              note
            }
          }
        }
      }
    `;

    const { getUserById } = await client.query<NestedQuery<"getUserById", UserEntity>>({ query, variables: { id } }).then((res) => res.data);
    return { props: { data: getUserById } };
  });
