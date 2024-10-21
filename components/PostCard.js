import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import MarkdownIt from 'markdown-it';

const PostCard = ({ post }) => {
  const md = new MarkdownIt();
  const { title, description, date } = post.frontMatter;
  let imageSrc = post.frontMatter.image;

  console.log("Image Source:", imageSrc);

  if (imageSrc.startsWith('//')) {
    imageSrc = imageSrc.slice(1);
  }
  if (!imageSrc.startsWith('/')) {
    imageSrc = `/${imageSrc}`;
  }

  console.log("Description:", description);

  return (
    <Link href={`/posts/${post.slug}`}>
        <div className="border rounded-lg">
          <Image
            src={imageSrc}
            width={1200}
            height={700}
            alt={title}
            onError={(e) => {
              e.target.src = "/default-image.JPG"; // フォールバック画像
            }}
          />
        </div>
        <div className="px-2 py-4">
          <h1 className="font-bold text-lg">{title}</h1>
          {/* MarkdownItを使用してdescriptionをHTMLに変換 */}
          <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: md.render(description) }}/>
          <span className="text-gray-500">{date}</span>
        </div>
    </Link>
  );
};

export default PostCard;