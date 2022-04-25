import { gql } from "@apollo/client";
import { NestedQuery, TradeRequestEntity } from "@entities";
import { Newspaper } from "@mui/icons-material";
import { Paper, Stack } from "@mui/material";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { ssrClient } from "../../apollo-client";
import Layout, { PagePath } from "../../components/layout";

const SingleTradeRequest: React.FC<{ data: TradeRequestEntity }> = ({ data }) => {
  const { title, content, owner, createdAt } = data;
  const pagePaths: PagePath[] = [
    {
      label: "新規取引リクエスト",
      path: "/newRequests/",
    },
    { label: "日本向けリクエスト", path: "/ttt" },
    { label: title, path: `/trade-requests/${data.id}` },
  ];
  const { displayName, id } = owner!;
  return (
    <Layout pageTitle={`${title}`} mainId="singleTradeRequest" isCommonLayout={true} pagePaths={pagePaths}>
      <div className="titleH headers">タイトル</div>
      <div className="productInfoH headers">商品情報</div>
      <div className="titleB">
        <small>{format(new Date(createdAt), "yyyy-MM-dd")}</small>
        <h1>{title}</h1>
      </div>
      <Stack>
        <Stack style={{ padding: 10 }}>
          <Link href={`/users/${id}`} passHref={true}>
            <h4 style={{ cursor: "pointer" }}>{displayName}</h4>
          </Link>
          <p>{content}</p>
        </Stack>
      </Stack>
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
