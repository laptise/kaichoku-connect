import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { TradeRequestComment, TradeRequest, TradeRequestImage, WithPagination } from "@entities";
import { AddCircle, Send } from "@mui/icons-material";
import {
  Avatar,
  Chip,
  Divider,
  Fab,
  FormControl,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material/node_modules/@mui/system";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import client from "../../../apollo-client";
import Layout, { PagePath, TreeNodes } from "../../../components/layout";
import { withAuth } from "../../../components/use-auth";
import { AuthNextPage } from "../../../env";
import { ADD_COMMENT } from "../../../gqls/mutations/comment";
import { GET_COMMENTS } from "../../../gqls/queries/comment";
import { GET_TRADE_REQUEST_BY_ID } from "../../../gqls/queries/trade-request";

/**取引リクエストページ */
const SingleTradeRequest: AuthNextPage<{ data: TradeRequest }> = ({ data, payload }) => {
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
  const isOwner = owner!.id === payload?.userId;
  console.log(isOwner);
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
      <Stack alignItems={"flex-start"} spacing={2} justifyContent="flex-start" sx={{ width: "100%", height: "100%", p: 3 }}>
        <Stack direction="row" spacing={1} alignItems={"center"}>
          <Chip label={majorCategoryName} />
          <Chip label={minorCategoryName} />
        </Stack>
        <Typography variant="h3" style={{ marginTop: 16 }}>
          {title}
        </Typography>
        <Box className="contentSection" style={{ marginTop: 10 }}>
          <div className="productInfoB">
            <DubbleBlock title="メーカ・ブランド" content={makerName} />
            <DubbleBlock title="商品名" content={productName} />
            <DubbleBlock title="数量" content={count.toString()} />
          </div>
        </Box>
        <h4>参考画像</h4>
        <div className="pictureB">{images && <TradeRequestImages images={images} />}</div>
        <h4>メッセージ</h4>
        <div className="messageB">{content}</div>
        <div className="thanksH headers">謝礼</div>
        <CommentArea tradeRequestId={tradeId} disabled={!payload} />
        {payload && <UserActionArea isOwner={isOwner} />}
      </Stack>
    </Layout>
  );
};

const UserActionArea: React.FC<{ isOwner: boolean }> = ({ isOwner }) => {
  return isOwner ? (
    <Link href="/trade-requests/new" passHref={true}>
      <Fab variant="extended" color="primary" aria-label="add">
        <AddCircle sx={{ mr: 1 }} />
        取引リクエストを編集
      </Fab>
    </Link>
  ) : (
    <Link href="/trade-requests/new" passHref={true}>
      <Fab variant="extended" color="primary" aria-label="add">
        <AddCircle sx={{ mr: 1 }} />
        この取引リクエストを受け取る
      </Fab>
    </Link>
  );
};

/**コメント区域 */
const CommentArea: React.FC<{ tradeRequestId: number; disabled: boolean }> = ({ tradeRequestId, disabled }) => {
  const [value, setValue] = useState("");
  const [skip, setSkip] = useState(0);
  const { data: initData } = useQuery<NestedQuery<"getComments", WithPagination<TradeRequestComment>>>(GET_COMMENTS, {
    variables: { requestId: tradeRequestId, take: 5, skip },
  });
  const [getMoreQuery] = useLazyQuery<NestedQuery<"getComments", WithPagination<TradeRequestComment>>>(GET_COMMENTS);
  const [hasNextValue, setHasNextValue] = useState(false);
  const [addComment] = useMutation(ADD_COMMENT);
  const [comments, setComments] = useState<TradeRequestComment[]>([]);
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

/**単一コメント */
const Comment: React.FC<{ comment: TradeRequestComment }> = ({ comment }) => {
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
          <Link href={`/users/${comment.author!.id}`} passHref={true}>
            <Avatar alt={comment.author!.displayName} src={comment.author?.imgUrl || undefined} />
          </Link>
        </ListItemAvatar>
        <ListItemText primary={<Header />} secondary={comment.content} />
      </ListItem>
      <Divider variant="inset" />
    </>
  );
};

const TradeRequestImages: React.FC<{ images: [TradeRequestImage] }> = ({ images }) => {
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

export const getServerSideProps: GetServerSideProps = (ctx) =>
  withAuth(ctx, async ({ params, req }) => {
    if (!params) throw null;
    const { country } = params;
    const id = Number(params.id);
    const { getTradeRequestById } = await client
      .query<NestedQuery<"getTradeRequestById", TradeRequest>>({ query: GET_TRADE_REQUEST_BY_ID, variables: { id } })
      .then((res) => res.data);
    return { props: { data: getTradeRequestById } };
  });

export default SingleTradeRequest;
