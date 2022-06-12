import { useQuery } from "@apollo/client";
import { BankInfo, JWTPayload, Trade, User, UserBankInfo, WithPagination } from "@entities";
import { Avatar, Button, Stack, TextField, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { FC, ReactNode, useRef, useState } from "react";
import client from "../../apollo-client";
import { DashboardLayout } from "../../components/dashboard-layout";
import ImageUploaderModal, { ModalForwards } from "../../components/image-uploader";
import { requireAuth } from "../../components/use-auth";
import { AuthNextPage, AuthRequiredPage } from "../../env";
import { GET_TRADES_WITH_QUERY } from "../../gqls/queries/trade";
import { GET_INFO_FOR_DASHBOARD } from "../../gqls/queries/user";
import { DynamicSearcher } from "../../components/dynamic-searcher";
import { GET_BANKS_BY_USER_LANG } from "../../gqls/queries/bank-info";

const emails = ["username@gmail.com", "user02@gmail.com"];

export type DashboardProps = {
  userData: User;
};

const DashTrade: AuthRequiredPage<DashboardProps> = ({ payload, userData }) => {
  const { data, loading } = useQuery<NestedQuery<"getTrades", WithPagination<Trade>>>(GET_TRADES_WITH_QUERY, {
    variables: { userId: payload.userId, userType: "All" },
  });
  const modalRef = useRef<ModalForwards>(null);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const openImageUpdate = () => {
    modalRef.current?.openModal();
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return payload ? (
    <DashboardLayout pageTitle={"取引 - ダッシュボード"} mainId={"dashboard"} payload={payload} tabIndex={3}>
      <ImageUploaderModal ref={modalRef} />
      <Button onClick={openImageUpdate}>プロフィール画像を変更</Button>
      <Stack gap={5}>
        <BasicInfo payload={payload} />
        <BankInfo payload={payload} bankInfo={userData.bankInfo} />
      </Stack>
    </DashboardLayout>
  ) : (
    <>no</>
  );
};

const Row: FC<{ children: ReactNode; title: string }> = ({ children, title }) => (
  <Stack direction="row" alignItems={"center"} gap={5}>
    <Typography sx={{ minWidth: 120 }}>{title}</Typography>
    {children}
  </Stack>
);

const BasicInfo: AuthRequiredPage = ({ payload }) => {
  return (
    <Stack gap={2}>
      <Typography variant="h5">基本情報</Typography>
      <Row title="プロフィール画像">
        <Avatar alt={payload?.username} src={payload?.userImgUrl} sx={{ width: 56, height: 56 }} />
      </Row>
      <Row title="ユーザーID">
        <Typography variant="body1">@{payload?.userId}</Typography>
      </Row>
      <Row title="表示名">
        <Typography variant="h4">{payload?.username}</Typography>
      </Row>
      <Row title="メールアドレス">
        <Typography variant="body2">{payload?.userEmail}</Typography>
      </Row>
    </Stack>
  );
};

const BankInfo: AuthRequiredPage<{ bankInfo?: UserBankInfo }> = ({ payload, bankInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: banksRes } = useQuery<NestedQuery<"getBanksByUserLang", BankInfo[]>>(GET_BANKS_BY_USER_LANG);
  const banks = banksRes?.getBanksByUserLang || [];
  const bankState = useState<BankInfo | null>(null);
  const [bankValue, setBankValue] = bankState;
  return (
    <Stack gap={2}>
      <Stack direction="row" alignItems={"center"}>
        <Typography variant="h5">口座情報</Typography>
        <Button variant="outlined" onClick={() => setIsEditing(true)}>
          編集
        </Button>
      </Stack>
      <Row title="銀行名">
        {isEditing ? (
          <DynamicSearcher<BankInfo>
            labelKey="name"
            label="銀行名"
            valueState={bankState}
            searchTarget={banks}
            disabled={false}
            renderOption={(props, option) => (
              <li {...props}>
                <Avatar sx={{ width: 20, height: 20, mr: 1 }} src={option.imgUrl} alt={option.name} /> {option["name"] as any}
              </li>
            )}
          />
        ) : (
          <Typography variant="body1">{bankInfo?.bank?.name ? bankInfo.bank.name : "-"}</Typography>
        )}
      </Row>
      {Boolean(bankValue?.isAccountTypeNeeded) && (
        <Row title="口座種別">
          <Typography variant="body1">{bankInfo?.accountType ? bankInfo?.accountType : "-"}</Typography>
        </Row>
      )}
      {Boolean(bankValue?.isBranchNeeded) && (
        <Row title="支店名">
          <Typography variant="body1">{bankInfo?.branchCode ? bankInfo?.branchCode : "-"}</Typography>
        </Row>
      )}
      <Row title="口座番号">
        {isEditing ? (
          <TextField id="account-number" label="口座番号" variant="outlined" />
        ) : (
          <Typography variant="body1">{bankInfo?.accountNo ? bankInfo?.accountNo : "-"}</Typography>
        )}
      </Row>
    </Stack>
  );
};

type UserBoxProps = {
  auth: JWTPayload;
  openImageUpdate(): void;
};

export default DashTrade;

export const getServerSideProps: GetServerSideProps = (ctx) =>
  requireAuth<DashboardProps>(ctx, async ({ payload }) => {
    const userData = await client
      .query<NestedQuery<"getUserById", User>>({ query: GET_INFO_FOR_DASHBOARD, variables: { userId: payload.userId } })
      .then((res) => res.data.getUserById);
    return { props: { userData } };
  });
