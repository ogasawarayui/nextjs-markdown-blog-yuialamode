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
    [key: string]: any;
  };
  slug: string;
}

const PAGE_SIZE = 4;

const range = (start: number, end: number, length = end - start + 1): number[] =>
  Array.from({ length }, (_, i) => start + i);

export const getStaticProps = async () => {
  const files = fs.readdirSync("posts");
  const posts: Post[] = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fileContent = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data } = matter(fileContent);

    if (!data.title || !data.date) {
      throw new Error(`Invalid front matter in ${fileName}`);
    }
    return {
      frontMatter: data,
      slug,
    };
  });

  const sortedPosts = posts.sort((postA, postB) => {
    const dateA = new Date(postA.frontMatter.date || 0); // undefined の場合は 0 を使用
    const dateB = new Date(postB.frontMatter.date || 0);
    return dateB.getTime() - dateA.getTime(); // 新しい日付が先になるように
});

  const pages = range(1, Math.ceil(posts.length / PAGE_SIZE));

  return {
    props: {
      posts: sortedPosts.slice(0, PAGE_SIZE),
      pages,
    },
  };
};

export default function Home({ posts, pages }: { posts: Post[]; pages: number[] }) {
  return (
    <div className="my-8 flex flex-wrap">
      <div className="grid grid-cols-4 gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <Pagination pages={pages} current_page={1} />
    </div>
  );
}
