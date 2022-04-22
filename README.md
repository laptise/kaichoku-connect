# Kaichoku Connect

中古取引サービス(兼勉強)

ユーザー間で国際取引を仲介するサイト。

手軽な取引をサポートする機能、チャット機能などを取り入れ、多国語サポートをして各国の利用者一箇所に集める。

言語が違う利用者間でも、できる限りストレスなく取引ができるようにする。

# 開発

```
Root
 ┣━ client  Next.jsクライアント
 ┣━ server  Nest.js(Garphql)サーバー
 ┗━ types   共有型定義ファイル
```

### `types` フォルダ

クライアントコンテナ・サーバーコンテナ間で共有部分

Entity の型定義に利用

```ts
import { UserEntity } from "@entities";
```

## Client

- Next.js
- Apollo Client
- Material UI
- Scss

## Server

- Nest.js
- Graphql
- MySql
- TypeORM
- Nginx

## Auth

- JWT Token
- Nestjs Auth guards
