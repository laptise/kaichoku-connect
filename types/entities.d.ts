/**利用者 */
export type UserEntity = {
  /**ID(識別子) */
  id: number;
  /**Eメール */
  email: string;
  /**パスワード */
  password: string;
  /**表示名 */
  displayName: string;

  requestingTrades?: [TradeRequestEntity];
};

/**取引依頼 */
export type TradeRequestEntity = {
  id: number;
  /**題名 */
  title: string;
  /**内容 */
  content: string;
  /**依頼者ID */
  ownerId: number;
  /**作成日時 */
  createdAt: Date;

  owner?: UserEntity;
};

export type NestedQuery<KeyName, ResType> = {
  [key in KeyName]: ResType;
};
