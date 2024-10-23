import fs from "fs";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import Image from "next/image";
import { NextSeo } from "next-seo";
import rehypeSlug from "rehype-slug";
import remarkPrism from "remark-prism";
import React,{ createElement, Fragment } from "react";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import Link from "next/link";
import "prismjs/themes/prism-tomorrow.css";
import remarkUnwrapImages from "remark-unwrap-images";
import { visit } from "unist-util-visit";

///ブログ記事を表示するためのページの一部

// カスタムコードのマークダウン変換処理
const customCode = () => {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "p" && node.children && node.children.length > 0) {
      const firstChild = node.children[0];
      if (firstChild.type === "text" && firstChild.value.startsWith("[comment]")) {
          node.tagName = "div";
          node.properties = {
            className: ["alert"],
          };
          const value = firstChild.value.replace(/\[\/?comment\]/g, "");
          node.children = [
            {
              type: "element",
              tagName: "div",
              properties: { className: ["alert-2"] },
              children: [{ type: "text", value }],
            },
          ];
        }
      }
    });
  };
};

// Markdownファイルの読み込み
export async function getStaticProps({ params }) {
  try {//fs.readFileSyncを使って、postsというフォルダにあるMarkdownファイル（.mdファイル）を読み込む
    const file = fs.readFileSync(`posts/${params.slug}.md`, "utf-8");
    const { data, content } = matter(file);//gray-matterというライブラリを使って、記事のタイトルや日付などのメタデータと、記事の内容に分けています。
    console.log("Content:", content);//実際のMarkdown形式の文章（記事の本文）が入っています。
    console.log("FrontMatter:", data);//記事のタイトルや日付、画像のURLなど、記事の基本的な情報が含まれます。
    if (data.image && data.image.startsWith('/')) {
      data.image = data.image.slice(1);
    }

  // Markdownの本文（content）をunifiedというライブラリを使ってHTMLに変換
  const result = await unified()//いくつかのプラグインを使って、追加の機能を提供しています。
    .use(remarkParse)//Markdown形式を解析するためのプラグイン
    .use(remarkPrism, {//コードブロックをシンタックスハイライト（色分け）して表示するためのプラグイン
      plugins: ["line-numbers"],
    })
    .use(remarkUnwrapImages)//Markdownの画像タグを適切に処理するためのプラグイン
    .use(remarkRehype, { allowDangerousHtml: true })//MarkdownをHTMLに変換します
    .use(customCode)//特定の記号で始まるテキスト（[comment]で始まる部分）を、特定のHTML構造（divタグ）に変換するカスタム処理
    .use(rehypeSlug)//見出し（<h1>, <h2>など）にスラッグ（ID）を追加して、リンク可能にするためのプラグイン
    .use(rehypeStringify, { allowDangerousHtml: true })//解析されたHTMLを文字列として出力するプラグインです。
    .process(content);

  return {
    props: {
      frontMatter: data,
      content: result.toString(),
      slug: params.slug,
    },
  };
} catch (err) {
  console.error("Error processing markdown content:", err);
  return {
    props: {
      error: true,
      message: "記事の読み込みに失敗しました。",
    },
  };
}
}

// 変換されたHTMLを、rehype-reactというプラグインを使ってReactのコンポーネントに変換
const toReactNode = (html) => {
  console.log("Input HTML:", html);

  return unified()
    .use(rehypeParse, {
      fragment: true,
    })
    .use(rehypeReact, {
      createElement,
      Fragment,
      components: {
        a: MyLink,//リンクが外部サイトか内部リンクかを判断し、適切な処理（新しいタブで開くかどうかなど）を行う
        img: MyImage,//画像のURLの形式をチェックし、必要に応じて修正して表示します。画像が見つからない場合には、デフォルトの画像を表示するように設定
      },
    })
    .processSync(html).result;
};

// Static Pathsの生成
export async function getStaticPaths() {
  const files = fs.readdirSync("posts");
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

//画像の定義
const MyImage = ({ src, alt }) => {
  let imageSrc = src;
  if (imageSrc.startsWith('//')) {
    imageSrc = imageSrc.slice(1);
  }
  if (!imageSrc.startsWith('/')) {
    imageSrc = `/${imageSrc}`;
  }

  return (
    <div className="relative max-w-full h-96">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        style={{ objectFit: "contain" }}
        onError={(e) => {
          e.target.src = "/default-image.JPG"; // 画像が見つからない場合のフォールバック
        }}
        />
    </div>
  );
};

//リンクの定義
const MyLink = ({ children, href }) => {
  if (!href) href = "/";
  return href.startsWith("/") || href.startsWith("#") ? (
    <Link href={href}>{children}</Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

//ページ全体の構造を作っている
const Post = ({ frontMatter, content, slug, error, message }) => {
  if (error) {
    return <p>{message}</p>;
  }

  return (//NextSeoを使って、ページのタイトルや説明、SNSなどでシェアされたときに表示される情報（OGP: Open Graph Protocol）を設定
    <>
      <NextSeo
        title={frontMatter.title}//ページのタイトル
        description={frontMatter.description}//ページの説明
        openGraph={{
          type: "website",
          url: process.env.NEXT_PUBLIC_SITE_URL + `/posts/${slug}`,
          title: frontMatter.title,
          description: frontMatter.description,
          images: [//OGP用の画像の設定→もし記事に画像がない場合、デフォルトの画像を表示
            {
              url: frontMatter.image
              ? `/${frontMatter.image}`
              : "/default-image.jpg", // デフォルトの画像
              width: 1200,
              height: 700,
              alt: frontMatter.title,
            },
          ],
        }}
      />
      <div className="prose prose-lg max-w-none">
        <div className="border">
          <Image
            src={`/${frontMatter.image}`}
            width={1200}
            height={700}
            alt={frontMatter.title}
          />
        </div>
        <h1 className="mt-12">{frontMatter.title}</h1>
        <span>{frontMatter.date}</span>
        <div className="space-x-2">
          {frontMatter.categories && frontMatter.categories.length > 0 ? (
            frontMatter.categories.map((category) => (
              <span key={category}>
                <Link href={`/categories/${category}`}>{category}</Link>
              </span>
            ))
          ) : (
            <span>カテゴリーがありません</span>
          )}
        </div>
        <div>{toReactNode(content) || "記事を読み込めませんでした。"}</div>
      </div>
    </>
  );
};

export default Post;
