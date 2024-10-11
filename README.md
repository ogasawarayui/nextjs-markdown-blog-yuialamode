<div id="top"></div>

## 使用技術一覧

<!-- シールド一覧 -->
<p style="display: inline">
<!-- フロントエンドのフレームワーク一覧 -->
![Node.js](https://img.shields.io/badge/-Node.js-000000.svg?logo=next.js&style=flat-square&logoColor=ffffff)
![Next.js](https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=flat-square&logoColor=ffffff)
![tailwind](https://img.shields.io/badge/-tailwind-000000.svg?logo=next.js&style=flat-square&logoColor=ffffff)
![React](https://img.shields.io/badge/-React-000000.svg?logo=next.js&style=flat-square&logoColor=ffffff)
<!-- フロントエンド言語一覧 -->
![TypeScript](https://img.shields.io/badge/-TypeScript-000000.svg?logo=next.js&style=flat-square&logoColor=ffffff)
![JavaScript](https://img.shields.io/badge/-JavaScript-000000.svg?logo=next.js&style=flat-square&logoColor=ffffff)
</p>

## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [環境](#環境)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [開発環境構築](#開発環境構築)
5. [トラブルシューティング](#トラブルシューティング)

<!-- READMEの作成方法のドキュメントのリンク -->
<br />
<div align="right">
    <a href="https://qiita.com/shun198/items/c983c713452c041ef787"><strong>READMEの作成方法 »</strong></a>
</div>
<br />

<!-- プロジェクト名を記載 -->

## プロジェクト名

nextjs-markdown-blog

<!-- プロジェクトについて -->

## プロジェクトについて

Markdownファイルを用いたブログ構築

<!-- プロジェクトの概要を記載 -->

  <p align="left">
    <br />
    <!-- プロジェクト詳細のリンク -->
    <a href="https://reffect.co.jp/react/nextjs-markdown-blog"><strong>プロジェクト詳細 »</strong></a>
    <br />
    <br />

<p align="right">(<a href="#top">トップへ</a>)</p>

## 環境

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| 言語・フレームワーク  | バージョン |
| --------------------- | ---------- |
| Node.js               | 21.6.0     |
| Next.js               | 14.2.14    |
| tailwind              | 3.4.13     |
| React                 | 18.3.1     |
| TypeScript            | 5.6.2      |

その他のパッケージのバージョンは package.json を参照してください

<p align="right">(<a href="#top">トップへ</a>)</p>

## ディレクトリ構成

<!-- Treeコマンドを使ってディレクトリ構成を記載 -->

❯ tree -a -I "node_modules|.next|.git|.pytest_cache|static" -L 2
.
├── .env
├── .eslintrc.json
├── .gitignore
├── README.md
├── components
│   ├── Footer.js
│   ├── Header.js
│   ├── Layout.js
│   ├── Pagination.js
│   └── PostCard.js
├── eslint.config.mjs
├── next-env.d.ts
├── next-seo.config.js
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.js
├── postcss.config.mjs
├── posts
│   ├── laravel-vite.md
│   └── next-js-markdown-blog.md
├── public
│   ├── favicon.ico
│   ├── laravel.png
│   ├── nextjs-welcome.png
│   └── nextjs.png
├── src
│   ├── pages
│   └── styles
├── tailwind.config.js
├── tailwind.config.ts
└── tsconfig.json

<p align="right">(<a href="#top">トップへ</a>)</p>

## 開発環境構築

<!-- コンテナの作成方法、パッケージのインストール方法など、開発環境構築に必要な情報を記載 -->

### インストール

プロジェクトをクローンし、依存関係をインストールするには以下のコマンドを実行してください。

```bash
git clone https://github.com/ogasawarayui/yuialamode.blog.git
cd nextjs-markdown-blog
npm install

### サーバーの起動

開発環境を立ち上げるには、次のコマンドを実行します。
npm run dev

http://localhost:3000 にアクセス

### コマンド一覧

| コマンド　　　　　　　　                            | 実行する処理                             |------------------------------------------------------------------------------------------ |
| npm install -D tailwindcss postcss autoprefixer |Tailwind CSS パッケージのインストール       |
| npx tailwindcss init -p                         |npx tailwindcss init -p                 |
| npm install gray-matter                         |gray-matterライブラリのインストール         |
| npm install marked                              |markedのインストール　                 　　 |
| npm install markdown-it                         |markdown-itのインストール　　　　　　　　　   |
| npm install react-mark                          |react-markのインストール                   |
| npm install unified remark-parse remark-rehype rehype-stringify |4つのライブラリのインストール｜
| npm install -D @tailwindcss/typography          |プラグインのインストール　　　　　　　　　　　　 |
| npm install next-seo                            |next-seoのインストール                     |
| npm install remark-toc                          |remark-tocのインストール                   |
| npm install rehype-slug                         |rehype-slugのインストール                  |
| npm install remark-prism                        |remark-prismのインストール                 |
| npm install rehype-parse rehype-react           |rehype-reactとrehype-parseのインストール    |



