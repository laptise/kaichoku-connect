import { GetServerSideProps } from "next";
import { checkAuthSSR } from "../../../axios";
import Layout, { TreeNodes } from "../../../components/layout";
import { AuthNextPage } from "../../../env";

const CountryRequests: AuthNextPage<{ countryCode: string }> = ({ payload, countryCode }) => (
  <Layout
    pageTitle={`asdas`}
    mainId="singleTradeRequest"
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
    <div>test</div>
  </Layout>
);
export default CountryRequests;

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  if (!params) throw null;
  const { country } = params;
  const payload = await checkAuthSSR(req);

  return { props: { data: payload, countryCode: country } };
};
