# Sora

Sora は、画像とタイトルをアップロードして閲覧できる Web アプリケーションです。
閲覧は、事前に登録されたユーザーのみに制限します。

## 技術スタック

- Next.js
- Vercel
- microCMS
- Supabase (authentication)

## 実装する機能

- Email/Passwordを用いたログイン
- Supabase Authenticationを使った認証・認可
- 事前登録ユーザーのみ閲覧可能なアクセス制御
- 画像 + タイトルの投稿機能
- 投稿一覧・詳細の閲覧機能
- microCMS 連携

## ローカル開発

### 環境変数の設定

.env.exampleを参考に、各環境変数を.env.localに設定してください

### アプリケーション起動

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開いて確認できます。

### Supabase Authentication Local Development

Dockerを起動した後、次のコマンドを実行します。

```shell
npx supabase start
```

コンテナのストップ

```shell
npx supabase stop
```
