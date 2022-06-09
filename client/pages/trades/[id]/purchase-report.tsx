import { Trade } from "@entities";
import { IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";
import client from "../../../apollo-client";
import TradeLayout from "../../../components/trade-layout";
import { requireAuth } from "../../../components/use-auth";
import { AuthRequiredPage } from "../../../env";
import { GET_TRADE_BY_ID } from "../../../gqls/queries/trade";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type SingleTradeProps = {
  trade: Trade;
};

const PurchaseReport: AuthRequiredPage<SingleTradeProps> = ({ trade, payload }) => {
  return (
    <TradeLayout pageTitle="商品手配完了" mainId={"tradeMain"} trade={trade} payload={payload}>
      <Paper style={{ flex: 1, padding: 10 }}>
        <Stack>
          <Stack direction="row" style={{ justifyContent: "space-between", borderBottom: "1px solid #ccc", paddingBottom: 10 }}>
            <Typography variant="h5" style={{ borderBottom: "1px solid #ccc", paddingBottom: 10 }}>
              商品手配完了の登録
            </Typography>
            <Link passHref={true} href={`/trades/${trade.id}`}>
              <Tooltip title="チャットに戻る">
                <IconButton aria-label="delete" size="medium">
                  <ArrowBackIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Link>
          </Stack>
        </Stack>
      </Paper>
    </TradeLayout>
  );
};

export default PurchaseReport;

export const getServerSideProps: GetServerSideProps = (ctx) =>
  requireAuth(ctx, async ({ params, payload }) => {
    const res = await client
      .query<NestedQuery<"getTradeById", Trade>>({ query: GET_TRADE_BY_ID, variables: { id: Number(params!.id) } })
      .then((x) => x.data.getTradeById);
    return { props: { trade: res, payload } };
  });
