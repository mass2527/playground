"use client";

import { createCommentSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export function CreateCommentForm({ postId }: { postId: string }) {
  const router = useRouter();

  return (
    <CommentForm
      onSubmit={async (data) => {
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

        router.refresh();
      }}
    />
  );
}

export function CreateReplyForm({
  postId,
  commentId,
}: {
  postId: string;
  commentId: string;
}) {
  const router = useRouter();

  return (
    <CommentForm
      onSubmit={async (data) => {
        const response = await fetch(
          `/api/posts/${postId}/comments/${commentId}/replies`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!response.ok) {
          alert("Failed to add reply");
          return;
        }

        router.refresh();
      }}
    />
  );
}

function CommentForm({
  onSubmit,
}: {
  onSubmit: SubmitHandler<z.infer<typeof createCommentSchema>>;
}) {
  const { register, handleSubmit, formState, reset } = useForm<
    z.infer<typeof createCommentSchema>
  >({
    resolver: zodResolver(createCommentSchema),
  });
  const isDisabled = formState.isSubmitting || !formState.isValid;

  useEffect(() => {
    reset();
  }, [formState.isSubmitSuccessful, reset]);

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        if (isDisabled) {
          return;
        }

        onSubmit(data);
      })}
    >
      <input id="content" type="text" {...register("content")} />
      <button
        placeholder="Add comment"
        type="submit"
        aria-disabled={isDisabled}
      >
        {formState.isSubmitting && "submitting..."} Add comment
      </button>
    </form>
  );
}
