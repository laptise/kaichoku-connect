// axios を require してインスタンスを生成する
import Axios from "axios";
import { Urls } from "./env";
/**APIサーバーfetchインスタン */
export const $api = Axios.create({
  baseURL: Urls.backendUrl, // バックエンドB のURL:port を指定する
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  responseType: "json",
});

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
