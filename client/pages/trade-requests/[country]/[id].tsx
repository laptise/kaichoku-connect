import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { TradeRequestCommentEntity, TradeRequestEntity, TradeRequestImageEntity, WithPagination } from "@entities";
import { Send } from "@mui/icons-material";
import { Avatar, Divider, FormControl, IconButton, InputBase, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from "@mui/material";
import { Box } from "@mui/material/node_modules/@mui/system";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import client from "../../../apollo-client";
import { checkAuthSSR } from "../../../axios";
import Layout, { PagePath, TreeNodes } from "../../../components/layout";
import { AuthNextPage } from "../../../env";

const GET_COMMENTS = gql`
  query getComments($requestId: Float!, $skip: Float, $take: Float) {
    getComments(condition: { requestId: $requestId, skip: $skip, take: $take }) {
      nodes {
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
      pageInfo {
        hasNextPage
        totalCount
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
  const { author } = comment;
  const date = new Date(comment.createdAt);
  const Header = () => {
    return (
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="button">{author!.displayName}</Typography>
        <Typography variant="caption">{format(date, "MM-dd HH:mm:ss")}</Typography>
      </Stack>
    );
  };
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={comment.author!.displayName} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText primary={<Header />} secondary={comment.content} />
      </ListItem>
      <Divider variant="inset" />
    </>
  );
};

const CommentArea: React.FC<{ tradeRequestId: number; disabled: boolean }> = ({ tradeRequestId, disabled }) => {
  const [value, setValue] = useState("");
  const [skip, setSkip] = useState(0);
  const { data: initData } = useQuery<NestedQuery<"getComments", WithPagination<TradeRequestCommentEntity>>>(GET_COMMENTS, {
    variables: { requestId: tradeRequestId, take: 5, skip },
  });
  const [getMoreQuery] = useLazyQuery<NestedQuery<"getComments", WithPagination<TradeRequestCommentEntity>>>(GET_COMMENTS);
  const [hasNextValue, setHasNextValue] = useState(false);
  const [addComment] = useMutation(ADD_COMMENT);
  const [comments, setComments] = useState<TradeRequestCommentEntity[]>([]);
  const getMore = async () => {
    console.log(skip);
    const { data } = await getMoreQuery({ variables: { requestId: tradeRequestId, take: 5, skip } });
    if (data?.getComments?.nodes && data.getComments.nodes.length > 0) {
      setComments((comments) => [...comments, ...data.getComments.nodes]);
      setHasNextValue(data.getComments.pageInfo.hasNextPage);
    }
    setSkip((s) => s + 5);
  };
  const submitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await addComment({ variables: { tradeRequestId, content: value } });
    setComments([data.addComment, ...comments]);
    setValue("");
  };
  useEffect(() => {
    if (initData?.getComments) {
      setComments((c) => [...initData.getComments.nodes]);
      setHasNextValue(initData.getComments.pageInfo.hasNextPage);
    } else {
      setHasNextValue(false);
    }
  }, [initData]);
  return (
    <Box className="commentArea" sx={{ width: "100%" }}>
      <h4>コメント</h4>
      <form onSubmit={(e) => submitComment(e)}>
        <FormControl sx={{ m: 1, width: "100%", display: "flex" }} variant="outlined">
          <Box sx={{ display: "flex" }}>
            <InputBase
              sx={{ ml: 1, flex: 1, borderBottom: "1px solid #ccc" }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="コメントを書く"
              inputProps={{ "aria-label": "コメントを書く" }}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search" disabled={disabled || !value}>
              <Send />
            </IconButton>
          </Box>
        </FormControl>
      </form>
      {comments?.map?.((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      {hasNextValue && <span onClick={() => getMore()}>さらに読み込む</span>}
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
      ></List>
    </Box>
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
