# Magnezoo 2026

## 概要

本プロジェクトは Next.js を用いて構築されたウェブアプリケーションです。本書はプロジェクトの概要、開発手順、およびデプロイ手順を記載します。

## 開発環境の起動

開発サーバーを起動するには、プロジェクトルートで以下のいずれかのコマンドを実行してください。

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

起動後、ブラウザで `http://localhost:3000` を開き、動作を確認してください。表示内容を編集する場合は、`app/page.tsx` を編集すると自動的にページが更新されます。

## フォント設定

本プロジェクトでは `next/font` を利用し、Vercel 提供のフォントファミリー「Geist」を自動で最適化して読み込む設定を行っています。

## 参考資料

- Next.js ドキュメント: https://nextjs.org/docs — Next.js の機能および API を参照してください。
- Learn Next.js: https://nextjs.org/learn — インタラクティブなチュートリアルです。
- Next.js GitHub リポジトリ: https://github.com/vercel/next.js — 実装例や問題報告、貢献情報を確認できます。

## デプロイ

本アプリケーションの簡易なデプロイ方法としては Vercel の利用を推奨します。Vercel の新規デプロイページ: https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme

デプロイ方法の詳細は Next.js のデプロイに関するドキュメントを参照してください: https://nextjs.org/docs/app/building-your-application/deploying

## その他

追加の設定やプロジェクト固有の手順が必要な場合は、プロジェクトの担当者に問い合わせてください。
