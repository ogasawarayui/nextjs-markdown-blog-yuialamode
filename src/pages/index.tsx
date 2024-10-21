import fs from "fs";
import matter from "gray-matter";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Pagination from "components/Pagination";
import PostCard from "components/PostCard";

interface Post {
  frontMatter: {
    title?: string;
    date?: string;
    description?: string;
    image?: string;
    [key: string]: unknown;
  };
  slug: string;
}

const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

export const getStaticProps = async () => {
  try {
  // ファイルのリストを取得
  const files = fs.readdirSync("posts");
  if (!files || files.length === 0) {
    throw new Error("No posts found.");
  }

  // 各Markdownファイルを処理してPostオブジェクトを作成
  const posts: Post[] = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fileContent = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data } = matter(fileContent);
    // titleやdateが存在しない場合はエラー
    if (!data.title || !data.date) {
      throw new Error(`Invalid front matter in ${fileName}`);
    }
    return {
      frontMatter: data,
      slug,
    };
  });

  // 日付順にソート（新しい順）
  const sortedPosts = posts.sort((postA, postB) => {
    const dateA = new Date(postA.frontMatter.date || 0); // 日付がundefined の場合は 0 を使用
    const dateB = new Date(postB.frontMatter.date || 0);
    return dateB.getTime() - dateA.getTime(); // 新しい日付が先になるように
});

  return {
    props: {
      posts: sortedPosts,
    },
  };
} catch (error) {
  console.error("Error loading posts:", error);
  return {
    props: {
      posts: [],
    },
  };
}
};


export default function Home({ posts }: { posts: Post[] }) {
  const [currentPage] = useState<number>(1);  // currentPageの型も明示的に指定
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const pageSize = isMobile ? 1 : 4;

  const totalPages = Math.ceil(posts.length / pageSize);
  const pages = range(1, totalPages); // pagesを定義

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedPosts = posts.slice(start, end);

  return (
    <div className="my-8 flex flex-wrap">
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-4'} gap-4`}>
      {paginatedPosts.length > 0 ? (
          paginatedPosts.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <p>投稿がありません。</p>
        )}
      </div>

      {pages.length > 0 && (
      <Pagination
      pages={pages}
      current_page={currentPage}
      />
    )}
    </div>
  );
}
