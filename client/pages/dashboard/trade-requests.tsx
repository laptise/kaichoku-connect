import { useLazyQuery, useMutation } from "@apollo/client";
import { TradeRequest, TradeRequestCatch, User } from "@entities";
import { Avatar, Badge, Box, Button, Chip, List, ListItem, Modal, Skeleton, Stack, Tooltip, Typography } from "@mui/material";
import { csp } from "chained-style-props";
import { GetServerSideProps } from "next";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { DashboardProps } from ".";
import client from "../../apollo-client";
import { DashboardLayout } from "../../components/dashboard-layout";
import { requireAuth } from "../../components/use-auth";
import { AuthRequiredPage } from "../../env";
import { makeNotification } from "../../gqls/mutations/notification";
import { NEW_TRADE_FROM_CATCH } from "../../gqls/mutations/trade";
import { GET_PENDING_REQUEST_CATCH_BY__ID } from "../../gqls/queries/trade-request-catch";
import { GET_INFO_FOR_DASHBOARD } from "../../gqls/queries/user";
import { useUserData } from "../../hooks/use-user-data";

const dashboardInits = { openTargetState: [] };
const DashboardContext = createContext<{ openTargetState: State<number | null> }>(null as any);

const TradeReuqestDashboard: AuthRequiredPage<DashboardProps> = ({ payload, userData }) => {
  const user = useUserData(payload);
  const openTargetState = useState<number | null>(null);

  return (
    <DashboardContext.Provider value={{ openTargetState: openTargetState }}>
      <CatchInfoModal />
      <DashboardLayout payload={payload} pageTitle={"取引依頼 - ダッシュボード"} mainId={""} tabIndex={1}>
        <Stack direction="row" justifyContent="space-between">
          <RequestingTrades requests={userData?.requestingTrades || []} />
        </Stack>
      </DashboardLayout>
    </DashboardContext.Provider>
  );
};

const RequestingTrades: React.FC<{ requests: TradeRequest[] }> = ({ requests }) => {
  return (
    <Box style={{ flex: 1 }}>
      <h3>取引リクエスト一覧</h3>
      <List>
        {requests.map((request) => (
          <SingleTradeRequest key={request.id} request={request} />
        ))}
      </List>
    </Box>
  );
};

enum Chips {
  None,
  Comment,
  Request,
}

const SingleTradeRequest: React.FC<{ request: TradeRequest }> = ({ request }) => {
  const [selecting, setSelecting] = useState(Chips.None);
  return (
    <ListItem>
      <Stack style={csp().Flex.gap(5).csp}>
        <h2>{request.title}</h2>
        <Stack direction="row">
          <Badge color="primary" badgeContent={request.comments?.length} sx={{ ml: 2 }}>
            <Chip
              label="コメント"
              onClick={() => setSelecting((val) => (val === Chips.Comment ? Chips.None : Chips.Comment))}
              variant={selecting === Chips.Comment ? undefined : "outlined"}
            />
          </Badge>
          <Badge color="primary" badgeContent={request.pendingCatches?.length} sx={{ ml: 2 }}>
            <Chip
              label="取引開始申請"
              onClick={() => setSelecting((val) => (val === Chips.Request ? Chips.None : Chips.Request))}
              variant={selecting === Chips.Request ? undefined : "outlined"}
            />
          </Badge>
        </Stack>
        {selecting === Chips.Comment && <Box>da</Box>}
        {selecting === Chips.Request && <TradeRequestConfirmation pendings={request.pendingCatches!} />}
      </Stack>
    </ListItem>
  );
};

const TradeRequestConfirmation: FC<{ pendings: TradeRequestCatch[] }> = ({ pendings }) => {
  return (
    <List>
      {pendings.map((pending) => (
        <SinglePendings key={pending.id} pending={pending} />
      ))}
    </List>
  );
};

const SinglePendings: FC<{ pending: TradeRequestCatch }> = ({ pending }) => {
  const { msg, catcher, id } = pending;
  const { displayName, id: catcherId, imgUrl: catcherUrl } = catcher!;
  const targetState = useContext(DashboardContext).openTargetState;

  const openForThis = () => {
    if (targetState) {
      const [, setTarget] = targetState;
      setTarget(id);
    }
  };

  return (
    <Tooltip title="クリックして確認" placement="top-start">
      <ListItem onClick={openForThis}>
        <Button>
          <Avatar sx={{ width: 20, height: 20, marginRight: 1 }} alt={displayName} src={catcherUrl} /> {displayName}- {msg}
        </Button>
      </ListItem>
    </Tooltip>
  );
};

const style = {
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const CatchInfoModal = () => {
  const [targetId, setTarget] = useContext(DashboardContext).openTargetState;
  const [query, result] = useLazyQuery<NestedQuery<"getPendingRequestCatchById", TradeRequestCatch>>(GET_PENDING_REQUEST_CATCH_BY__ID);
  const { loading } = result;
  const [data, setData] = useState<TradeRequestCatch | null>(null);
  const [mutation] = useMutation(NEW_TRADE_FROM_CATCH);
  const MessageZone = () =>
    data ? (
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {data?.msg}
      </Typography>
    ) : (
      <Skeleton variant="text" />
    );

  const AvatarZone = () => (data?.catcher ? <Avatar src={data.catcher.imgUrl} alt={data.catcher.displayName} /> : <Skeleton variant="text" />);

  useEffect(() => {
    if (targetId)
      query({ variables: { id: targetId } }).then((res) => {
        const result = res.data?.getPendingRequestCatchById;
        if (result) setData(result);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetId]);
  const handleClose = (_: {}, reason: "backdropClick" | "escapeKeyDown") => {
    if (reason === "backdropClick") setTarget(null);
  };

  const tradeStart = async () => {
    await Promise.all([mutation({ variables: { catchId: targetId } }), makeNotification(data!.catcherId, "取引が承諾されました。", "/")]);
  };
  return (
    <Modal open={Boolean(targetId)} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box
        sx={{
          ...style,
          ...csp() //
            .Position.absolute.top("50%")
            .left("50%")
            .Size.width(500).csp,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          取引が可能な会員が見つかりました！
        </Typography>
        <Stack>
          <Stack style={csp().Flex.row.verticalCenterAlign.csp}>
            <AvatarZone />
            <MessageZone />
          </Stack>
          <Stack>
            <Typography variant="caption">取引を始めると、他の人から来たリクエストは削除されます。</Typography>
            <Button onClick={tradeStart} variant="contained">
              取引を始める
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default TradeReuqestDashboard;

export const getServerSideProps: GetServerSideProps = (ctx) =>
  requireAuth<DashboardProps>(ctx, async ({ payload }) => {
    const userData = await client
      .query<NestedQuery<"getUserById", User>>({ query: GET_INFO_FOR_DASHBOARD, variables: { userId: payload.userId } })
      .then((res) => res.data.getUserById);
    return { props: { userData } };
  });
