import fs from "fs";
import matter from "gray-matter";
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

const PAGE_SIZE = 4;

const range = (start: number, end: number, length = end - start + 1): number[] =>
  Array.from({ length }, (_, i) => start + i);

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

  // ページ数の計算
  const pages = range(1, Math.ceil(posts.length / PAGE_SIZE));

  return {
    props: {
      posts: sortedPosts.slice(0, PAGE_SIZE),// ページごとの表示件数に制限
      pages,
    },
  };
} catch (error) {
  console.error("Error loading posts:", error);
  return {
    props: {
      posts: [],
      pages: [],
    },
  };
}
};


export default function Home({ posts, pages }: { posts: Post[]; pages: number[] }) {
  return (
    <div className="my-8 flex flex-wrap">
      <div className="grid grid-cols-4 gap-4">
      {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <p>投稿がありません。</p>
        )}
      </div>
      {pages.length > 0 && <Pagination pages={pages} current_page={1} />}
    </div>
  );
}
