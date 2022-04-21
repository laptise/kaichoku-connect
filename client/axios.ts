// axios を require してインスタンスを生成する
import Axios from "axios";
/**APIサーバーfetchインスタン */
export const $api = Axios.create({
  baseURL: "http://localhost:3018", // バックエンドB のURL:port を指定する
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  responseType: "json",
});

const $graphql = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  responseType: "json",
});

export const $gqlQuery = async (data: any) => {
  return await $graphql.post("graphql", data);
};
