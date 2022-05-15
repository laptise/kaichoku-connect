import { gql } from "@apollo/client";
import { TradeRequestEntity } from "@entities";
import { Divider, Stack } from "@mui/material";
import format from "date-fns/format";
import { GetServerSideProps } from "next";
import Link from "next/link";
import client from "../../../apollo-client";
import Layout, { TreeNodes } from "../../../components/layout";
import { withAuth } from "../../../components/use-auth";
import { AuthNextPage } from "../../../env";

const CountryRequests: AuthNextPage<{ countryCode: string; requests: TradeRequestEntity[] }> = ({ payload, countryCode, requests }) => (
  <Layout
    pageTitle={`asdas`}
    mainId=""
    isCommonLayout={true}
    pagePaths={[
      {
        label: "新規取引リクエスト",
        path: "/newRequests/",
      },
      {
        label: countryCode === "kor" ? "韓国向けリクエスト" : "日本向けリクエスト",
        path: countryCode === "kor" ? "/trade-requests/kor/" : "/trade-requests/jpn/",
      },
    ]}
    payload={payload}
    commonMenuProps={{
      selected: countryCode === "kor" ? TreeNodes.OpenedKor : TreeNodes.OpenedJpn,
      expanded: [countryCode === "kor" ? TreeNodes.OpenedKor : TreeNodes.OpenedJpn, TreeNodes.Opened],
    }}
  >
    <Stack flex={1} padding={2} divider={<Divider />}>
      <h3 style={{ margin: 0 }}>新着リクエスト</h3>
      {requests?.map(({ id, title, content, owner, createdAt, targetCountryCode }) => (
        <Link key={id} passHref={true} href={`/trade-requests/${targetCountryCode}/${id}`}>
          <Stack margin={1} justifyContent="space-between" direction={"row"} style={{ cursor: "pointer" }}>
            <span>{title}</span>
            <span> {format(new Date(createdAt), "MM-dd")}</span>
          </Stack>
        </Link>
      ))}
    </Stack>
  </Layout>
);
export default CountryRequests;

export const getServerSideProps: GetServerSideProps = (ctx) =>
  withAuth(ctx, async ({ params, req }) => {
    if (!params) throw null;
    const { country } = params;
    const query = gql`
      query getTradeRequests($countryCode: Countries) {
        getTradeRequests(limit: 10, countryCode: $countryCode) {
          targetCountryCode
          id
          title
          createdAt
          owner {
            displayName
          }
        }
      }
    `;
    const { getTradeRequests } = await client
      .query<NestedQuery<"getTradeRequests", TradeRequestEntity>>({ query, variables: { countryCode: country } })
      .then((res) => res.data);
    return { props: { countryCode: country, requests: getTradeRequests } };
  });
