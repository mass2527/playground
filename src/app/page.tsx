import CreatePostForm from "./create-post-form";

export default async function Home() {
  return (
    <main className="grid place-items-center min-h-screen">
      <div>
        <h1>Create Post</h1>
        <CreatePostForm />
      </div>
    </main>
  );
}
