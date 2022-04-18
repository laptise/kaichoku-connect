# Kaichoku Connect Front End

## 構造

`Layout`コンポーネントが全ページを包む

```tsx
<App>
    <Layout>
        <Header />
        <PageContents> // その他ページ
    </Layout>
</App>
```

## グローバル型定義

`~/global.d.ts` インポート不要

## リクエスト instance

`$server` : NestServer へ Axios

`client` : Graphql 用 Apollo client

## Roadmap

### Pages

- [ ] ホーム
- [ ] プロフィール
- [ ] チャット
- [ ] 多国語サーポート
- [ ] 取引

## Env

- Next.js
- TypeScript
- Apollo Client
- Sass
- Scss
- Axios
