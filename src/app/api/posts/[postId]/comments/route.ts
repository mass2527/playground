import prisma from "@/lib/prisma";
import { createCommentSchema } from "@/lib/validations";
import { z } from "zod";

export async function POST(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const json = await request.json();
    const body = createCommentSchema.parse(json);
    const comment = await prisma.comment.create({
      data: {
        ...body,
        senderId: "clniv9vhg0000xn57j704j0y3",
        postId: params.postId,
      },
    });

    return Response.json(comment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(error.issues, { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
