/**利用者 */
export type UserEntity = {
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
  requestingTrades?: [TradeRequest];
  /**使用中のバッジ */
  usingBadges?: [UserBadgeStatusEntity];
};

export interface JWTPayload {
  userId: UserEntity["id"];
  username: UserEntity["displayName"];
  userEmail: UserEntity["email"];
  userImgUrl: UserEntity["imgUrl"];
}

/**国家マスタ */
export type CountryMstEntity = {
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
  owner?: UserEntity;
  /**大カテゴリー */
  majorCategory?: MajorCategoryMstEntity;
  /**小カテゴリー */
  minorCategory?: MinorCategoryMstEntity;
  /**対象国コード */
  targetCountryCode: string;

  /**画像 */
  images?: [TradeRequestImageEntity];
  /**個数 */
  count: number;
  /**pv数 */
  viewedTimes: number;
  /**製品 */
  product?: ProductMstEntity;
  /**メーカ */
  maker?: MakerMstEntity;
};

export type UserBadgeMstEntity = {
  id: number;
  name: string;
  note: string;
  content: string;
};

export type UserBadgeStatusEntity = {
  ownerId: string;
  badgeId: number;
  gotAt: Date;
  isUsing: number;
  /**バッジ情報 */
  badgeInfo?: UserBadgeMstEntity;
};

export type MajorCategoryMstEntity = {
  id: number;
  name: string;
};

export type MinorCategoryMstEntity = {
  id: number;
  majorId: number;
  name: string;
  majorCategory?: MajorCategoryMstEntity;
};

export type TradeRequestImageRelationEntity = {
  tradeRequestId: number;
  tradeRequestImageId: number;
};

export type TradeRequestImageEntity = {
  id: number;
  url: string;
  title: string;
  content: string;
};

export type MakerMstEntity = {
  id: number;
  name: string;
  isVerificated: number;
};

export type ProductMstEntity = {
  makerId: number;
  id: number;
  name: string;
  isVerificated: number;
};

export type NotificationEntity = {
  id: number;
  targetUserId?: string;
  msg: string;
  createdAt: Date;
  createdBy: string;
};

export type TradeRequestComment = {
  tradeRequestId: number;
  id: number;
  content: string;
  repliesTo?: number;
  createdAt: Date;
  updatedAt: Date;
  isSecret: number;
  createdBy: string;

  author?: UserEntity;
};

export type PageInfoType = {
  hasNextPage: boolean;
  totalCount: number;
};

export type WithPagination<T> = {
  nodes: T[];
  pageInfo: PageInfoType;
};

export type ChatRoomEntity = {
  id: number;
  /**チャットの理由 */
  fromType: number;
  fromId: number;
  isExpired: number;
};

export type Trade = {
  id: number;
  tradeRequestId: number;
  ownerId: string;
  catcherId: string;
  createdAt: Date;
};

export type TradeRequestCatch = {
  tradeRequestId: number;
  catcherId: string;
  createdAt: Date;
  msg: string;
};
