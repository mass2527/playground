import prisma from "@/lib/prisma";

export default async function Comments({ postId }: { postId: string }) {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      sender: true,
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
          </div>
        );
      })}
    </div>
  );
}
