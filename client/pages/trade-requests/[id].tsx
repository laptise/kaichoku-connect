import { gql } from "@apollo/client";
import { TradeRequestEntity, TradeRequestImageEntity } from "@entities";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import Image from "next/image";
import React from "react";
import client from "../../apollo-client";
import Layout, { PagePath } from "../../components/layout";

const TradeRequestImages: React.FC<{ images: [TradeRequestImageEntity] }> = ({ images }) => {
  return (
    <>
      {images.map(({ url, id, title }) => (
        <Image key={id} width={120} height={120} src={"/" + url} alt={title} />
      ))}
    </>
  );
};

const SingleTradeRequest: React.FC<{ data: TradeRequestEntity }> = ({ data }) => {
  const { title, content, owner, createdAt, minorCategory, majorCategory, images, count, product, maker } = data;
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
  const { name: productName } = product!;
  const { name: makerName } = maker!;
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
        <div className="majorB infoBody">{majorCategoryName}</div>
        <div className="minorH infoHeader">小カテゴリー</div>
        <div className="minorB infoBody">{minorCategoryName}</div>
        <div className="makerH infoHeader">メーカ・ブランド</div>
        <div className="makerB infoBody">{makerName}</div>
        <div className="pdBar infoBody">-</div>
        <div className="nameH infoHeader">商品名</div>
        <div className="nameB infoBody">{productName}</div>
        <div className="countH infoHeader">数量</div>
        <div className="countX infoBody">✕</div>
        <div className="countB infoBody">{count}</div>
      </div>
      <div className="pictureH headers">参考画像</div>
      <div className="pictureB">{images && <TradeRequestImages images={images} />}</div>
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
  const query = gql`
    query getTradeRequestById($id: Float!) {
      getTradeRequestById(id: $id) {
        title
        content
        createdAt
        count
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
        images {
          title
          content
          url
          id
        }
        maker {
          name
        }
        product {
          name
        }
      }
    }
  `;

  const { getTradeRequestById } = await client
    .query<NestedQuery<"getTradeRequestById", TradeRequestEntity>>({ query, variables: { id } })
    .then((res) => res.data);
  return { props: { data: getTradeRequestById } };
};
