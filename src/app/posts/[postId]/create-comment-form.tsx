"use client";

import { createCommentSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export default function CreateCommentForm({ postId }: { postId: string }) {
  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof createCommentSchema>
  >({
    resolver: zodResolver(createCommentSchema),
  });

  const isDisabled = formState.isSubmitting || !formState.isValid;

  const onSubmit: SubmitHandler<z.infer<typeof createCommentSchema>> = async (
    data
  ) => {
    if (isDisabled) {
      return;
    }

    const response = await fetch(`/api/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      alert("Failed to add comment");
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input id="content" type="text" {...register("content")} />
      <button
        placeholder="Add comment"
        type="submit"
        aria-disabled={isDisabled}
      >
        Add comment
      </button>
    </form>
  );
}
