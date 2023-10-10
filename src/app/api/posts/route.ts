import prisma from "@/lib/prisma";
import { z } from "zod";

const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = createPostSchema.parse(json);
    const post = await prisma.post.create({
      data: {
        ...body,
        authorId: "clniv9vhg0000xn57j704j0y3",
      },
    });

    return Response.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(error.issues, { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
