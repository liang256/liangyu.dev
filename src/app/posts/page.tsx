import { getSortedPostsData } from "@/services/posts";
import { PostPreview } from "../_components/post-preview";

export default function PostList() {
  const posts = getSortedPostsData();
  return (
    <div>
      <h1 className="text-3xl">Posts</h1>
      <div className="mt-4">
      {posts.map((post) => (
        // <p>{JSON.stringify(post)}</p>
        <PostPreview
          key={post.id}
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          author={post.author}
          slug={post.id}
          excerpt={post.excerpt}
        />
      ))}
      </div>
    </div>
  );
}