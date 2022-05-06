import { gql, useMutation, useQuery } from "@apollo/client";
import { TradeRequestCommentEntity, TradeRequestEntity, TradeRequestImageEntity } from "@entities";
import { Send } from "@mui/icons-material";
import { Button, FormControl, InputLabel, OutlinedInput, Stack } from "@mui/material";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import client from "../../../apollo-client";
import { checkAuthSSR } from "../../../axios";
import Layout, { PagePath, TreeNodes } from "../../../components/layout";
import { AuthNextPage } from "../../../env";

const GET_COMMENTS = gql`
  query getComments($requestId: Float!) {
    getComments(requestId: $requestId) {
      id
      content
      repliesTo
      isSecret
      createdAt
      author {
        displayName
        id
      }
    }
  }
`;

const ADD_COMMENT = gql`
  mutation ($tradeRequestId: Float!, $content: String!) {
    addComment(data: { tradeRequestId: $tradeRequestId, content: $content }) {
      id
      content
      repliesTo
      isSecret
      createdAt
      author {
        displayName
        id
      }
    }
  }
`;

const Comment: React.FC<{ comment: TradeRequestCommentEntity }> = ({ comment }) => {
  const date = new Date(comment.createdAt);
  return (
    <div>
      {comment.author!.displayName} - {comment.content} ({format(date, "MM-dd HH:mm:ss")})
    </div>
  );
};

const CommentArea: React.FC<{ tradeRequestId: number; disabled: boolean }> = ({ tradeRequestId, disabled }) => {
  const [value, setValue] = useState("");
  const { data } = useQuery<NestedQuery<"getComments", TradeRequestCommentEntity[]>>(GET_COMMENTS, { variables: { requestId: tradeRequestId } });
  const [addComment] = useMutation(ADD_COMMENT);
  const [comments, setComments] = useState<TradeRequestCommentEntity[]>([]);
  const submitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await addComment({ variables: { tradeRequestId, content: value } });
    setComments([data.addComment, ...comments]);
    setValue("");
  };
  useEffect(() => {
    if (data?.getComments) setComments(data.getComments);
  }, [data]);
  return (
    <div>
      <h4>コメント</h4>
      <form onSubmit={(e) => submitComment(e)}>
        <FormControl sx={{ m: 1, width: "25ch", display: "flex" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">コメントを書く</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label="コメントを書く"
            type="text"
          />
          <Button disabled={disabled || !value} variant="contained" endIcon={<Send />} type="submit">
            Send
          </Button>
        </FormControl>
      </form>
      {comments?.map?.((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

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
  const { title, content, owner, createdAt, minorCategory, majorCategory, images, count, product, maker, targetCountryCode, id: tradeId } = data;
  const pagePaths: PagePath[] = [
    {
      label: "新規取引リクエスト",
      path: "/newRequests/",
    },
    {
      label: targetCountryCode === "kor" ? "韓国向けリクエスト" : "日本向けリクエスト",
      path: targetCountryCode === "kor" ? "/trade-requests/kor/" : "/trade-requests/jpn/",
    },
    { label: title, path: `/trade-requests/${targetCountryCode}/${tradeId}` },
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
      <Stack alignItems={"flex-start"} spacing={4} justifyContent="flex-start" sx={{ width: "100%", height: "100%", p: 4 }}>
        <h1>{title}</h1>
        <div className="contentSection">
          <div className="productInfoB">
            <DubbleBlock title="大カテゴリー" content={majorCategoryName} />
            <DubbleBlock title="小カテゴリー" content={minorCategoryName} />
            <DubbleBlock title="メーカ・ブランド" content={makerName} />
            <DubbleBlock title="商品名" content={productName} />
            <DubbleBlock title="数量" content={count.toString()} />
          </div>
        </div>
        <div className="pictureH headers">参考画像</div>
        <div className="pictureB">{images && <TradeRequestImages images={images} />}</div>
        <div className="messageH headers">メッセージ</div>
        <div className="messageB">{content}</div>
        <div className="thanksH headers">謝礼</div>
        <CommentArea tradeRequestId={tradeId} disabled={!payload} />
      </Stack>
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
        id
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
