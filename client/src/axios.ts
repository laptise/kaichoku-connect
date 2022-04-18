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
