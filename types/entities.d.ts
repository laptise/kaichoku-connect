export type EntityStatus = "deleted" | "expired";
export type TradeRequestStatus = EntityStatus | "opened" | "pending" | "catched";

/**利用者 */
export type User = {
  /**ID(識別子) */
  id: string;
  /**Eメール */
  email: string;
  /**パスワード */
  password: string;
  /**表示名 */
  displayName: string;
  /**プロフィール画像URL */
  imgUrl: string;
  /**リクエスト中の取引 */
  requestingTrades?: TradeRequest[];
  /**使用中のバッジ */
  usingBadges?: [UserBadgeStatus];
};

export interface JWTPayload {
  userId: User["id"];
  username: User["displayName"];
  userEmail: User["email"];
  userImgUrl: User["imgUrl"];
}

/**国家マスタ */
export type CountryMst = {
  telCode: number;
  code: string;
  name: string;
};

/**取引依頼 */
export type TradeRequest = {
  id: number;
  /**題名 */
  title: string;
  /**内容 */
  content: string;
  /**依頼者ID */
  ownerId: string;
  /**大カテゴリーID */
  majorCategoryId: number;
  /**小カテゴリーID */
  minorCategoryId: number;
  /**メーカーID */
  makerId: number;
  /**製品ID */
  productId: number;
  /**作成日時 */
  createdAt: Date;
  /**依頼者(所有者) */
  owner?: User;
  /**大カテゴリー */
  majorCategory?: MajorCategoryMst;
  /**小カテゴリー */
  minorCategory?: MinorCategoryMst;
  /**対象国コード */
  targetCountryCode: string;
  status: TradeRequestStatus;

  pendingCatches?: TradeRequestCatch[];
  comments?: TradeRequestComment[];
  /**画像 */
  images?: [TradeRequestImage];
  /**個数 */
  count: number;
  /**pv数 */
  viewedTimes: number;
  /**製品 */
  product?: ProductMst;
  /**メーカ */
  maker?: MakerMst;
};

/**利用者バッジマスタ
 * 利用者がプロフィールを飾るときに利用
 */
export type UserBadgeMst = {
  id: number;
  name: string;
  note: string;
  content: string;
};

/**利用者バッジ着用状態 */
export type UserBadgeStatus = {
  ownerId: string;
  badgeId: number;
  gotAt: Date;
  isUsing: number;
  /**バッジ情報 */
  badgeInfo?: UserBadgeMst;
};

/**大カテゴリーマスタ */
export type MajorCategoryMst = {
  id: number;
  name: string;
};

/**小カテゴリーマスタ */
export type MinorCategoryMst = {
  id: number;
  majorId: number;
  name: string;
  majorCategory?: MajorCategoryMst;
};

/**取引依頼画像リレーションテーブル */
export type TradeRequestImageRelation = {
  tradeRequestId: number;
  tradeRequestImageId: number;
};

/**取引依頼画像 */
export type TradeRequestImage = {
  id: number;
  url: string;
  title: string;
  content: string;
};

/**製造会社マスタ */
export type MakerMst = {
  id: number;
  name: string;
  isVerificated: number;
};

/**製品マスタ */
export type ProductMst = {
  makerId: number;
  id: number;
  name: string;
  isVerificated: number;
};

/**通知 */
export type Notification = {
  id: number;
  targetUserId?: string;
  actionLink?: string;
  msg: string;
  createdAt: Date;
  createdBy: string;
};

/**取引依頼コメント */
export type TradeRequestComment = {
  tradeRequestId: number;
  id: number;
  content: string;
  repliesTo?: number;
  createdAt: Date;
  updatedAt: Date;
  isSecret: number;
  createdBy: string;

  author?: User;
};

export type PageInfoType = {
  hasNextPage: boolean;
  totalCount: number;
};

export type WithPagination<T> = {
  nodes: T[];
  pageInfo: PageInfoType;
};

export type ChatRoomFromType = "catch";

/**チャットルーム */
export type ChatRoom = {
  id: number;
  /**チャットの理由 */
  fromType: ChatRoomFromType;
  fromId: number;
};

/**取引 */
export type Trade = {
  id: number;
  tradeRequestId: number;
  requestCatchId: number;
  createdAt: Date;

  owner?: User;
  catcher?: User;
  requestCatch?: TradeRequestCatch;
  tradeRequest?: TradeRequest;
};

/**取引依頼承諾 */
export type TradeRequestCatch = {
  id: number;
  tradeRequestId: number;
  catcherId: string;
  createdAt: Date;
  msg: string;

  catcher?: User;
};
