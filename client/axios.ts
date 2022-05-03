// axios を require してインスタンスを生成する
import { JWTPayload } from "@entities";
import Axios from "axios";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { IncomingMessage } from "node:http";
import { Urls } from "./env";
import { isBrowser } from "./util";
/**APIサーバーfetchインスタン */
export const $api = Axios.create({
  baseURL: Urls.backendUrl, // バックエンドB のURL:port を指定する
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  responseType: "json",
});

export const $sapi = Axios.create({
  baseURL: "http://server:3018", // バックエンドB のURL:port を指定する
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  responseType: "json",
});

export const checkAuthSSR = async (
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
  }
): Promise<JWTPayload | null> => {
  try {
    const token = isBrowser() ? sessionStorage.getItem("access_token") : req?.cookies?.["access_token"].toString();
    const res = await $sapi.get("profile", {
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data as unknown as JWTPayload;
  } catch {
    return null;
  }
};

const $graphql = Axios.create({
  baseURL: Urls.backendUrl,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  responseType: "json",
});

export const $gqlQuery = async (data: any) => {
  return await $graphql.post("graphql", data);
};
