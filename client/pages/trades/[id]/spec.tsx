import { Trade, TradeRequestImage } from "@entities";
import { Box, Fab, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { FC, useContext, useState } from "react";
import client from "../../../apollo-client";
import TradeLayout, { TradeLayoutContext } from "../../../components/trade-layout";
import { requireAuth } from "../../../components/use-auth";
import { AuthRequiredPage } from "../../../env";
import { GET_TRADE_BY_ID } from "../../../gqls/queries/trade";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
type SingleTradeProps = {
  trade: Trade;
};

const TradeSpec: AuthRequiredPage<SingleTradeProps> = ({ trade, payload }) => {
  return (
    <TradeLayout pageTitle="商品詳細情報" mainId={"tradeMain"} trade={trade} payload={payload}>
      <Paper style={{ flex: 1, padding: 10 }}>
        <Stack>
          <Header />
          <Content />
        </Stack>
      </Paper>
    </TradeLayout>
  );
};

const Header = () => {
  const trade = useContext(TradeLayoutContext);
  return (
    <Stack direction="row" style={{ justifyContent: "space-between", borderBottom: "1px solid #ccc", paddingBottom: 10 }}>
      <Typography variant="h5">{trade?.tradeRequest?.title}</Typography>
      <Link passHref={true} href={`/trades/${trade?.id}`}>
        <Tooltip title="チャットに戻る">
          <IconButton aria-label="delete" size="medium">
            <ArrowBackIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Link>
    </Stack>
  );
};

const Content = () => {
  const trade = useContext(TradeLayoutContext);
  return (
    <Stack>
      <Typography variant="h4">{trade?.tradeRequest?.content}</Typography>
      <ProductImages />
    </Stack>
  );
};

const ProductImages = () => {
  const trade = useContext(TradeLayoutContext);
  return (
    <Stack direction="row">
      {trade?.tradeRequest?.images?.map((img) => (
        <SingleImage key={img.id} image={img} />
      ))}
    </Stack>
  );
};

const SingleImage: FC<{ image: TradeRequestImage }> = ({ image }) => {
  return <Image alt={image.title} src={image.url} />;
};

export default TradeSpec;

export const getServerSideProps: GetServerSideProps = (ctx) =>
  requireAuth(ctx, async ({ params, payload }) => {
    const res = await client
      .query<NestedQuery<"getTradeById", Trade>>({ query: GET_TRADE_BY_ID, variables: { id: Number(params!.id) } })
      .then((x) => x.data.getTradeById);
    return { props: { trade: res, payload } };
  });
