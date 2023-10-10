"use client";

import { createPostSchema } from "@/lib/validations";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CreatePostForm() {
  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof createPostSchema>
  >({
    resolver: zodResolver(createPostSchema),
  });
  const router = useRouter();

  const isDisabled = formState.isSubmitting || !formState.isValid;

  const createPost: SubmitHandler<z.infer<typeof createPostSchema>> = async (
    data
  ) => {
    if (isDisabled) {
      return;
    }

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      alert("Failed to create post");
      return;
    }

    const post = await response.json();
    router.push(`/posts/${post.id}`);
  };

  return (
    <form onSubmit={handleSubmit(createPost)} className="flex flex-col gap-2">
      <label htmlFor="title">Title</label>
      <input id="title" type="text" {...register("title")} />
      {formState.errors.title && <span>{formState.errors.title.message}</span>}
      <label htmlFor="content">Content</label>
      <input id="content" type="text" {...register("content")} />
      {formState.errors.content && (
        <span>{formState.errors.content.message}</span>
      )}
      <button type="submit" aria-disabled={isDisabled}>
        {formState.isSubmitting && "submitting..."} Submit
      </button>
    </form>
  );
}
