import fs from 'fs';
import matter from 'gray-matter';
import PostCard from 'components/PostCard';

export const getStaticProps = ({ params }) => {
  const files = fs.readdirSync('posts');
  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fileContent = fs.readFileSync(`posts/${fileName}`, 'utf-8');
    const { data } = matter(fileContent);
    return {
      frontMatter: data,
      slug,
    };
  });

  const category = params.category;

  const filteredPosts = posts.filter((post) => {
    return post.frontMatter.categories && post.frontMatter.categories.includes(category);
  });

  const sortedPosts = filteredPosts.sort((postA, postB) =>
    new Date(postB.frontMatter.date) - new Date(postA.frontMatter.date)
  );

  return {
    props: {
      posts: sortedPosts,
    },
  };
};

export const getStaticPaths = () => {
  const categories = ['記事一覧'];
  const paths = categories.map((category) => ({ params: { category } }));

  return {
    paths,
    fallback: false,
  };
};

const Category = ({ posts }) => {
  return (
    <div className="my-8">
      <div className="grid grid-cols-4 gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Category;