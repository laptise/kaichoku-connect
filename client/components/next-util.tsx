import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { checkAuthSSR } from "../axios";

export async function withAuth<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
>(context: GetServerSidePropsContext<Q, D>, fn?: GetServerSideProps<P, Q, D>): Promise<GetServerSidePropsResult<P>> {
  const [payload, res]: any = await Promise.all([checkAuthSSR(context.req), fn?.(context)].filter(Boolean));
  return fn ? { ...res, ...{ props: { ...res.props, payload } } } : { props: payload };
}
