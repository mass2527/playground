import prisma from "@/lib/prisma";
import { CreateReplyForm } from "./comment-form";

export default async function Comments({ postId }: { postId: string }) {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
      parentId: null,
    },
    include: {
      sender: true,
      replies: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <div>
      {comments.map((comment) => {
        return (
          <div key={comment.id} className="flex items-center gap-2">
            <div>{comment.sender.username}</div>
            <div>{comment.content}</div>
            replies
            <ul>
              {comment.replies.map((reply) => {
                return <li key={reply.id}>{reply.content}</li>;
              })}
            </ul>
            <CreateReplyForm postId={postId} commentId={comment.id} />
          </div>
        );
      })}
    </div>
  );
}
