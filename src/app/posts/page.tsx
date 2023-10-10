import { formatDate } from "@/lib/date";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return (
    <div>
      <h1>All posts</h1>
      <div>
        {posts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <div className="border">
              <h2>{post.title}</h2>
              <div>
                {post.author.username} {formatDate(post.createdAt)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
