import fs from "fs";
import matter from "gray-matter";
import Pagination from "components/Pagination";
import PostCard from "components/PostCard";

const PAGE_SIZE = 4;

const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i);

export async function getStaticProps({ params }) {
  const current_page = params?.page ? parseInt(params.page, 10) : 1;

  // 例外処理を追加
  let posts = [];
  try {
  const files = fs.readdirSync("posts");
  posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fileContent = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data } = matter(fileContent);
    return {
      frontMatter: data,
      slug,
    };
  });
} catch (error) {
  console.error("Error reading posts:", error);
  return {
    notFound: true, // エラー発生時に404ページを表示
  };
}

  // 投稿を日付でソート（最新のものが最初）
  const sortedPosts = posts.sort((postA, postB) =>
    new Date(postB.frontMatter.date) - new Date(postA.frontMatter.date)
  );

  // 現在のページ用に投稿をスライス
  const slicedPosts = sortedPosts.slice(
    PAGE_SIZE * (current_page - 1),
    PAGE_SIZE * current_page
  );

  // ページ情報
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const pages = range(1, totalPages);

  return {
    props: {
      posts: slicedPosts,
      pages,
      current_page,
      totalPages,
    },
  };
}

export async function getStaticPaths() {
  const files = fs.readdirSync("posts");
  const totalPages = Math.ceil(files.length / PAGE_SIZE);

  const paths = range(1, totalPages).map((i) => ({
    params: { page: i.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

const Page = ({ posts, pages, current_page }) => {
  if (!posts || posts.length === 0) {
    return <div>Loading...</div>; // フォールバックの間に表示する内容
  }

  return (
    <div className="my-8">
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <Pagination pages={pages} current_page={current_page} />
    </div>
  );
};

export default Page;
