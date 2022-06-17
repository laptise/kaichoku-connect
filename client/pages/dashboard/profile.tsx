import { useMutation, useQuery } from "@apollo/client";
import { AddressCtxMst, BankInfo, JWTPayload, Trade, User, UserBankInfo, WithPagination } from "@entities";
import { Avatar, Button, Stack, TextField, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { FC, ReactNode, useRef, useState } from "react";
import client from "../../apollo-client";
import { DashboardLayout } from "../../components/dashboard-layout";
import { DynamicSearcher } from "../../components/dynamic-searcher";
import ImageUploaderModal, { ModalForwards } from "../../components/image-uploader";
import { requireAuth } from "../../components/use-auth";
import { AuthRequiredPage } from "../../env";
import { UPDATE_USER_BANK_INFO } from "../../gqls/mutations/user-bank-info";
import { GET_ADDRESS_CTX } from "../../gqls/queries/address-ctx";
import { GET_BANKS_BY_USER_LANG } from "../../gqls/queries/bank-info";
import { GET_TRADES_WITH_QUERY } from "../../gqls/queries/trade";
import { GET_INFO_FOR_DASHBOARD } from "../../gqls/queries/user";

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
        <AddressInfo payload={payload} />
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

const BankInfo: AuthRequiredPage<{ bankInfo?: UserBankInfo }> = ({ payload, bankInfo: initBank }) => {
  const [bankInfo, setBankInfo] = useState(initBank);
  const [isEditing, setIsEditing] = useState(false);
  const { data: banksRes } = useQuery<NestedQuery<"getBanksByUserLang", BankInfo[]>>(GET_BANKS_BY_USER_LANG);
  const banks = banksRes?.getBanksByUserLang || [];
  const bankState = useState<BankInfo | null>(null);
  const [bankValue, setBankValue] = bankState;
  const [accountName, setAccountName] = useState(bankInfo?.accountName || "");
  const [accountNo, setAccountNo] = useState(bankInfo?.accountNo || "");
  const [q] = useMutation(UPDATE_USER_BANK_INFO);
  const submitBankInfo = async () => {
    if (bankValue && accountNo && accountName) {
      q({ variables: { swiftCode: bankValue.swiftCode, accountNo, accountName } });
      setBankInfo(
        (currBank) =>
          ({
            ...currBank,
            ...{ swiftCode: bankValue.swiftCode, accountNo, accountName, bank: { ...currBank?.bank, ...{ name: bankValue.name } } },
          } as UserBankInfo)
      );
    }
    setIsEditing(false);
  };
  return (
    <Stack gap={2}>
      <Stack direction="row" alignItems={"center"}>
        <Typography variant="h5">口座情報</Typography>
        {Boolean(isEditing) ? (
          <Button variant="outlined" onClick={() => submitBankInfo()}>
            完了
          </Button>
        ) : (
          <Button variant="outlined" onClick={() => setIsEditing(true)}>
            編集
          </Button>
        )}
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
          <Typography variant="body1">
            {/* <Avatar src={bankInfo?.bank?.imgUrl || ""} alt={bankInfo?.bank?.name} sx={{ width: 20, height: 20, mr: 1 }} /> */}
            {bankInfo?.bank?.name ? bankInfo.bank.name : "-"}
          </Typography>
        )}
      </Row>
      {Boolean(bankValue?.isAccountTypeNeeded) && (
        <Row title="口座種別">
          <Typography variant="body1">{bankInfo?.accountType || "-"}</Typography>
        </Row>
      )}
      {Boolean(bankValue?.isBranchNeeded) && (
        <Row title="支店名">
          <Typography variant="body1">{bankInfo?.branchCode || "-"}</Typography>
        </Row>
      )}
      <Row title="口座番号">
        {isEditing ? (
          <TextField
            id="account-number"
            value={accountNo}
            onChange={(e) => setAccountNo(e.currentTarget.value)}
            label="口座番号"
            variant="outlined"
          />
        ) : (
          <Typography variant="body1">{bankInfo?.accountNo || "-"}</Typography>
        )}
      </Row>
      <Row title="口座名義">
        {isEditing ? (
          <TextField
            id="account-name"
            value={accountName}
            onChange={(e) => setAccountName(e.currentTarget.value)}
            label="口座名義"
            variant="outlined"
          />
        ) : (
          <Typography variant="body1">{bankInfo?.accountName || "-"}</Typography>
        )}
      </Row>
    </Stack>
  );
};

const AddressInfo: AuthRequiredPage = ({ payload }) => {
  const { data, loading } = useQuery<NestedQuery<"getAddressCtx", AddressCtxMst>>(GET_ADDRESS_CTX);
  console.log(data);
  const [isEditing, setIsEditing] = useState(false);
  const submitAddressInfo = () => {
    setIsEditing(false);
  };

  return (
    <Stack>
      <Stack direction="row" alignItems={"center"}>
        <Typography variant="h5">配送地情報</Typography>
        {Boolean(isEditing) ? (
          <Button variant="outlined" onClick={() => submitAddressInfo()}>
            完了
          </Button>
        ) : (
          <Button variant="outlined" onClick={() => setIsEditing(true)}>
            編集
          </Button>
        )}
      </Stack>
      <Stack gap={2}>{Boolean(data) && <AddressBox ctx={data!.getAddressCtx} />}</Stack>
    </Stack>
  );
};

const AddressBox: FC<{ ctx: AddressCtxMst }> = ({ ctx }) => {
  const { zipCode, ctx1, ctx2, ctx3, ctx4, ctx5 } = ctx;
  return (
    <>
      <Row title={zipCode}>
        <Typography variant="body1">ABC</Typography>
      </Row>
      {Boolean(ctx1) && (
        <Row title={ctx1}>
          <Typography variant="body1">ABC</Typography>
        </Row>
      )}
      {Boolean(ctx2) && (
        <Row title={ctx2}>
          <Typography variant="body1">ABC</Typography>
        </Row>
      )}
      {Boolean(ctx3) && (
        <Row title={ctx3}>
          <Typography variant="body1">ABC</Typography>
        </Row>
      )}
      {Boolean(ctx4) && (
        <Row title={ctx4}>
          <Typography variant="body1">ABC</Typography>
        </Row>
      )}
    </>
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
