import { PostPreview } from "../_components/post-preview";
import { getAllPosts } from "@/lib/api";
import Header from "../_components/header";

export default function PostList() {
  const posts = getAllPosts();
  return (
    <div>
      <Header/>
      <div className="mt-4">
      {posts.map((post) => (
        <PostPreview
          key={post.slug}
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          author={post.author}
          slug={post.slug}
          excerpt={post.excerpt}
        />
      ))}
      </div>
    </div>
  );
}