/**利用者 */
export interface UserEntity {
  /**ID(識別子) */
  id: number;
  /**Eメール */
  email: string;
  /**パスワード */
  password: string;
  /**表示名 */
  displayName: string;
}

/**取引依頼 */
export interface TradeRequestEntity {
  id: number;
  /**題名 */
  title: string;
  /**内容 */
  content: string;
  /**依頼者ID */
  ownerId: number;
  /**作成日時 */
  createdAt: Date;
}
