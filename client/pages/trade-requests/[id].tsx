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
  const { title, content, owner, createdAt, minorCategory, majorCategory } = data;
  const pagePaths: PagePath[] = [
    {
      label: "新規取引リクエスト",
      path: "/newRequests/",
    },
    { label: "日本向けリクエスト", path: "/ttt" },
    { label: title, path: `/trade-requests/${data.id}` },
  ];
  const { displayName, id } = owner!;
  const { name: majorCategoryName } = majorCategory!;
  const { name: minorCategoryName } = minorCategory!;
  console.log(majorCategoryName);
  return (
    <Layout pageTitle={`${title}`} mainId="singleTradeRequest" isCommonLayout={true} pagePaths={pagePaths}>
      <div className="vDivider"></div>
      <div className="titleH headers">タイトル</div>
      <div className="productInfoH headers">商品情報</div>
      <div className="titleB">
        <small>{format(new Date(createdAt), "yyyy-MM-dd")}</small>
        <h1>{title}</h1>
      </div>
      <div className="productInfoB">
        <div className="majorH infoHeader">大カテゴリー</div>
        <div className="majorB infoBody">食品</div>
        <div className="minorH infoHeader">小カテゴリー</div>
        <div className="minorB infoBody">お菓子</div>
        <div className="makerH infoHeader">メーカ・ブランド</div>
        <div className="makerB infoBody">Calbee</div>
        <div className="pdBar infoBody">-</div>
        <div className="nameH infoHeader">商品名</div>
        <div className="nameB infoBody">Honey Butter Chip</div>
        <div className="countH infoHeader">数量</div>
        <div className="countX infoBody">✕</div>
        <div className="countB infoBody">1</div>
      </div>
      <div className="pictureH headers">参考画像</div>
      <div className="messageH headers">メッセージ</div>
      <div className="messageB">{content}</div>
      <div className="thanksH headers">謝礼</div>
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
        majorCategory {
          id
          name
        }
        minorCategory {
          id
          name
        }
      }
    }
  `;

  const { getTradeRequestById } = await ssrClient
    .query<NestedQuery<"getTradeRequestById", TradeRequestEntity>>({ query, variables: { id } })
    .then((res) => res.data);
  return { props: { data: getTradeRequestById } };
};
