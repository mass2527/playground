import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function PostDetailsPage({
  params,
}: {
  params: { postId: string };
}) {
  const post = await prisma.post.findUnique({
    where: {
      id: params.postId,
    },
    include: {
      author: true,
    },
  });
  if (!post) {
    notFound();
  }
  if (!post.published) {
    <div>This post is not published</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <div>Posted by {post.author.username}</div>
      <p>{post.content}</p>
    </div>
  );
}
