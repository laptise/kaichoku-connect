import { gql } from "@apollo/client";
import { TradeRequestEntity, TradeRequestImageEntity } from "@entities";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import Image from "next/image";
import React from "react";
import client from "../../../apollo-client";
import { checkAuthSSR } from "../../../axios";
import Layout, { PagePath, TreeNodes } from "../../../components/layout";
import { AuthNextPage } from "../../../env";

const TradeRequestImages: React.FC<{ images: [TradeRequestImageEntity] }> = ({ images }) => {
  return (
    <>
      {images.map(({ url, id, title }) => (
        <Image key={id} width={120} height={120} src={"/" + url} alt={title} />
      ))}
    </>
  );
};

const DubbleBlock: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <div className="dubbleBlock">
    <small>{title}</small>
    <h2>{content}</h2>
  </div>
);

const SingleTradeRequest: AuthNextPage<{ data: TradeRequestEntity }> = ({ data, payload }) => {
  const { title, content, owner, createdAt, minorCategory, majorCategory, images, count, product, maker, targetCountryCode } = data;
  const pagePaths: PagePath[] = [
    {
      label: "新規取引リクエスト",
      path: "/newRequests/",
    },
    {
      label: targetCountryCode === "kor" ? "韓国向けリクエスト" : "日本向けリクエスト",
      path: targetCountryCode === "kor" ? "/trade-requests/kor/" : "/trade-requests/jpn/",
    },
    { label: title, path: `/trade-requests/${data.id}` },
  ];
  const { displayName, id } = owner!;
  const { name: majorCategoryName } = majorCategory!;
  const { name: minorCategoryName } = minorCategory!;
  const { name: productName } = product!;
  const { name: makerName } = maker!;
  return (
    <Layout
      pageTitle={`${title}`}
      mainId="singleTradeRequest"
      isCommonLayout={true}
      pagePaths={pagePaths}
      payload={payload}
      commonMenuProps={{
        selected: targetCountryCode === "kor" ? TreeNodes.OpenedKor : TreeNodes.OpenedJpn,
        expanded: [targetCountryCode === "kor" ? TreeNodes.OpenedKor : TreeNodes.OpenedJpn, TreeNodes.Opened],
      }}
    >
      <div className="vDivider"></div>
      <div className="titleH headers">タイトル</div>
      <div className="titleB">
        <small>{format(new Date(createdAt), "yyyy-MM-dd")}</small>
        <h1>{title}</h1>
      </div>
      <div className="productInfoH headers">商品情報</div>
      <div className="productInfoB">
        <DubbleBlock title="大カテゴリー" content={majorCategoryName} />
        <DubbleBlock title="小カテゴリー" content={minorCategoryName} />
        <DubbleBlock title="メーカ・ブランド" content={makerName} />
        <DubbleBlock title="商品名" content={productName} />
        <DubbleBlock title="数量" content={count.toString()} />
        {/* <div className="majorH infoHeader">大カテゴリー</div>
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
        <div className="countB infoBody">{count}</div> */}
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

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  if (!params) throw null;
  const payload = await checkAuthSSR(req);
  const { country } = params;
  console.log(country);
  const id = Number(params.id);
  const query = gql`
    query getTradeRequestById($id: Float!) {
      getTradeRequestById(id: $id) {
        title
        content
        createdAt
        count
        targetCountryCode
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
  return { props: { data: getTradeRequestById, payload } };
};
