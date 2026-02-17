# Sora

Sora は、画像とタイトルをアップロードして閲覧できる Web アプリケーションです。
閲覧は、事前に登録されたユーザーのみに制限します。

## 技術スタック

- Next.js
- Vercel
- microCMS
- better-auth
- Google OAuth

## 実装する機能

- Google OAuth を用いたログイン
- better-auth を使った認証・認可
- 事前登録ユーザーのみ閲覧可能なアクセス制御
- 画像 + タイトルの投稿機能
- 投稿一覧・詳細の閲覧機能
- microCMS 連携

## ローカル開発

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開いて確認できます。
