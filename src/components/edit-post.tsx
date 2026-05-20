"use client";

import { editPostAction } from "@/actions/edit-post-action";
import { useAuth } from "@/app/context/auth-content";
import { useOnePost } from "@/hooks/useOnePost";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPost({ id }: { id: string }) {
  const router = useRouter();
  const { getAccessToken } = useAuth();
  const { post, loading } = useOnePost(id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");

  const [preview, setPreview] = useState<string | null>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }

      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  }

  async function handleSubmit(formData: FormData) {
    const token = getAccessToken();
    try {
      if (token) {
        formData.set("title", title);
        formData.set("description", description);
        formData.set("content", content);
        formData.set("slug", slug);

        await editPostAction(formData, token, id);
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (post) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(post.title ?? "");
      setDescription(post.description ?? "");
      setContent(post.content ?? "");
      setSlug(post.slug ?? "");

      if (post.image) {
        setPreview(post.image);
      }
    }
  }, [post]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10 text-[#f5b461]">
        <p className="text-xl font-medium animate-pulse">
          Loading post data...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#060309] text-[#f5b461] flex justify-center gap-4 p-4 rounded-lg shadow-sm w-125 px-20 pb-15 pt-10">
      <div className="w-full">
        <h1 className="text-center text-4xl font-bold tracking-tight leading-tight">
          Edit Post
        </h1>
        <form
          action={handleSubmit}
          className="flex flex-col items-start space-y-4 mx-auto w-full"
        >
          <label className="text-2xl font-medium mb-1" htmlFor="image">
            Image
          </label>
          <input
            id="image"
            name="file"
            className="cursor-pointer text-sm"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="preview"
              className="w-full max-h-60 object-contain rounded border border-gray-700 my-2"
            />
          )}

          <label className="text-2xl font-medium mb-1" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            className="w-full border rounded-md px-3 py-2 bg-transparent focus:outline-none focus:ring"
            type="text"
            placeholder="Your title here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="text-2xl font-medium mb-1" htmlFor="description">
            Description
          </label>
          <input
            id="description"
            name="description"
            className="w-full border rounded-md px-3 py-2 bg-transparent focus:outline-none focus:ring"
            type="text"
            placeholder="Your description here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="text-2xl font-medium mb-1" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            className="w-full h-50 border rounded-md px-3 py-2 bg-transparent focus:outline-none focus:ring resize-none"
            placeholder="Write something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <label className="text-2xl font-medium mb-1" htmlFor="slug">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            className="w-full border rounded-md px-3 py-2 bg-transparent focus:outline-none focus:ring"
            type="text"
            placeholder="slug..."
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />

          <input
            className="w-full mt-8 px-4 py-2 rounded-md font-medium bg-[#424e5a] text-white cursor-pointer hover:bg-[#526070] transition-colors"
            type="submit"
            value="Save Changes"
          />
        </form>
      </div>
    </div>
  );
}
