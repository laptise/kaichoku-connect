export class Urls {
  static hostName = process.env.NEXT_PUBLIC_HOST_NAME;
  static backendUrl = `http://${this.hostName}:3018`;
  static subscriptEndPoint = `ws://${this.hostName}:3018/graphql`;
  static queryEndPoint = `http://${this.hostName}:3018/graphql`;
}
