import { JWTPayload } from "@entities";
import { useContext, useEffect } from "react";
import { AuthContext } from "../pages/_app";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { checkAuthSSR } from "../axios";

export async function withAuth<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
>(context: GetServerSidePropsContext<Q, D>, fn?: GetServerSideProps<P, Q, D>): Promise<GetServerSidePropsResult<P>> {
  const [payload, res]: any = await Promise.all([checkAuthSSR(context.req), fn?.(context)].filter(Boolean));
  return fn ? { ...res, ...{ props: { ...res.props, payload } } } : { props: { payload } };
}

export async function requireAuth<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
>(context: GetServerSidePropsContext<Q, D>, fn?: GetServerSideProps<P, Q, D>): Promise<GetServerSidePropsResult<P>> {
  const [payload, res]: any = await Promise.all([checkAuthSSR(context.req), fn?.(context)].filter(Boolean));
  const redirect = payload ? {} : { redirect: { destination: "/signin", permanent: false } };
  const result = fn ? { ...res, ...{ props: { ...res.props, payload } }, ...redirect } : { ...{ props: { payload } }, ...redirect };
  console.log(result);
  return result;
}

export const useAuth = (payload?: JWTPayload) => {
  const [auth, setAuth] = useContext(AuthContext).authState;
  useEffect(() => {
    const validUserId = auth?.userId;
    const validPayload = payload?.userId;
    if (validPayload && validUserId != validPayload) {
      setAuth(payload);
    } else if (payload === null) {
      setAuth(null);
    }
  });
  return auth || null;
};
