import { JWTPayload } from "@entities";
import { useContext, useEffect } from "react";
import { AuthContext } from "../pages/_app";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { checkAuthSSR } from "../axios";

type WithAuthFn<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
> = (context: GetServerSidePropsContext<Q, D> & { payload: JWTPayload | null }) => Promise<GetServerSidePropsResult<P>>;

type RequireAuthFn<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
> = (context: GetServerSidePropsContext<Q, D> & { payload: JWTPayload }) => Promise<GetServerSidePropsResult<P>>;

async function resolveFn<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
>(context: GetServerSidePropsContext<Q, D>, fn: WithAuthFn<P, Q, D>, payload: JWTPayload | null): Promise<{ props: P | Promise<P> }> {
  const injectedContext = { ...context, ...{ payload } };
  return (await fn(injectedContext)) as any;
}

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
>(context: GetServerSidePropsContext<Q, D>, fn?: RequireAuthFn<P, Q, D>): Promise<GetServerSidePropsResult<P>> {
  const payload = await checkAuthSSR(context.req);
  if (!payload) {
    return { redirect: { destination: "/signin", permanent: false } };
  }
  const blankProps = { props: {} } as { props: P };
  if (fn) {
    const res = await resolveFn(context, fn as WithAuthFn<P, Q, D>, payload);
    const resWithPayload = { props: { ...res.props, ...{ payload } } };
    return { ...resWithPayload };
  } else {
    return { ...blankProps };
  }
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
