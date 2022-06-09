import Layout, { LayoutProp } from "./layout";
import { JWTPayload, Trade } from "@entities";
import { Box, Button, Dialog, DialogTitle, List, ModalProps, Paper, Stack, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import { csp } from "chained-style-props";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { createContext, FC, useContext, useState } from "react";
import { AuthNextPage } from "../env";

export const TradeLayoutContext = createContext<Trade | null>(null);

type TradeLayoutProps = { mobileTradeInfoViewingState?: State<boolean>; trade: Trade; payload: JWTPayload } & LayoutProp;

const steps = ["取引依頼", "販売者の申請", "取引開始", "商品購買", "商品確認", "商品配送", "到着", "取引終了"];

const TradeLayout: FC<TradeLayoutProps> = (props) => {
  const { children, mobileTradeInfoViewingState, trade, payload, ...propsToLayout } = props; // パスワード情報を外部に出さないようにする
  const defaultState = useState(false);
  const [isMobileTradeInfoViewing] = mobileTradeInfoViewingState || defaultState;
  return (
    <Layout {...propsToLayout} payload={payload}>
      <TradeLayoutContext.Provider value={trade}>
        <TradeInfo expanded={!isMobileTradeInfoViewing} payload={payload} />
        {children}
      </TradeLayoutContext.Provider>
    </Layout>
  );
};

const TradeInfo: AuthNextPage<{ expanded: boolean }> = ({ expanded, payload }) => {
  const trade = useContext(TradeLayoutContext);
  const currentStep = 3;
  return (
    <Paper id="tradeInfoArea" className={expanded ? "expanded" : "not-expanded"}>
      <Button className="forMobile expandButton">取引内容を表示</Button>
      <Stack>
        <Box>
          <Typography variant="h5">{trade?.tradeRequest?.title}</Typography>
        </Box>
        <Box>
          <Typography variant="caption">分類</Typography>
          {trade?.tradeRequest?.majorCategory?.name} - {trade?.tradeRequest?.minorCategory?.name}
        </Box>
        <Box>
          <Typography variant="caption">商品</Typography>
          {trade?.tradeRequest?.maker?.name} - {trade?.tradeRequest?.product?.name}
        </Box>
        <Box>
          <Typography variant="caption">依頼者</Typography>
          {trade?.owner?.displayName}
        </Box>
        <Box>
          <Typography variant="caption">販売者</Typography>
          {trade?.catcher?.displayName}
        </Box>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={currentStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label} expanded={true}>
                <StepLabel>{label}</StepLabel>
                <SingleStepContent isClosed={index < currentStep} stepNumber={index} payload={payload} />
              </Step>
            ))}
          </Stepper>
        </Box>
      </Stack>
    </Paper>
  );
};

const SingleStepContent: AuthNextPage<{ stepNumber: number; isClosed: boolean }> = ({ stepNumber, payload, isClosed }) => {
  const trade = useContext(TradeLayoutContext);

  const TradeStarted = () => {
    const date = new Date(trade!.tradeRequest!.createdAt!);
    return (
      <StepContent>
        <Stack>
          <Typography variant="body2">{format(date, "yyyy年M月d日 H時m分")}</Typography>
        </Stack>
      </StepContent>
    );
  };

  const SellerConfirmed = () => {
    const date = new Date(trade!.requestCatch?.createdAt!);
    return (
      <StepContent>
        <Stack>{isClosed && <Typography variant="body2">{format(date, "yyyy年M月d日 H時m分")}</Typography>}</Stack>
      </StepContent>
    );
  };

  const TradeHasBegun = () => {
    const date = new Date(trade!.createdAt!);
    return (
      <StepContent>
        <Stack>{isClosed && <Typography variant="body2">{format(date, "yyyy年M月d日 H時m分")}</Typography>}</Stack>
      </StepContent>
    );
  };

  switch (stepNumber) {
    case 0:
      return <TradeStarted />;
    case 1:
      return <SellerConfirmed />;
    case 2:
      return <TradeHasBegun />;
    case 3:
      return <Purchasing payload={payload} isClosed={isClosed} />;
    default:
      return <StepContent />;
  }
};

const Purchasing: AuthNextPage<{ isClosed: boolean }> = ({ payload, isClosed }) => {
  const [modalViewing, setModalViewing] = useState(false);
  const trade = useContext(TradeLayoutContext);
  const isOwner = trade?.ownerId === payload?.userId;
  const openModal = () => setModalViewing(true);
  const handleClose: ModalProps["onClose"] = (_, reason) => {
    setModalViewing(false);
  };
  const date = new Date(trade!.createdAt!);
  return (
    <>
      <Dialog onClose={handleClose} open={modalViewing}>
        <ProductModal />
      </Dialog>
      <StepContent>
        <Stack gap={1}>
          {isClosed && <Typography variant="body2">{format(date, "yyyy年M月d日 h時m分")}</Typography>}
          {isOwner ? (
            <Typography variant="body2">商品が手配されるまでお待ちください。</Typography>
          ) : (
            <>
              <Link href={`/trades/${trade?.id}/spec`} passHref={true}>
                <Button variant="outlined">商品情報の確認</Button>
              </Link>
              <Link href={`/trades/${trade?.id}/purchase-report`} passHref={true}>
                <Button variant="outlined">商品手配完了のお知らせを送る</Button>
              </Link>
            </>
          )}
        </Stack>
      </StepContent>
    </>
  );
};

const ProductModal = () => {
  const trade = useContext(TradeLayoutContext);
  return (
    <>
      <DialogTitle>商品情報</DialogTitle>
      <Stack direction="row">
        <Typography>{trade?.tradeRequest?.majorCategory?.name}</Typography>
        {" - "}
        <Typography>{trade?.tradeRequest?.minorCategory?.name}</Typography>
      </Stack>
      <Stack direction="row">
        <Typography>{trade?.tradeRequest?.maker?.name}</Typography>
        {" - "}
        <Typography>{trade?.tradeRequest?.product?.name}</Typography>
        <Button variant="outlined">商品情報の確認・手配完了</Button>
      </Stack>
    </>
  );
};

export default TradeLayout;
