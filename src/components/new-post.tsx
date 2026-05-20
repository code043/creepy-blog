"use client";

import { newPostAction } from "@/actions/new-post-action";
import { useAuth } from "@/app/context/auth-content";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewPost() {
  const router = useRouter();
  const { getAccessToken } = useAuth();
  const [preview, setPreview] = useState<string | null>(null);
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      if (preview) {
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
        await newPostAction(formData, token);
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      console.error(err);
    }
  }

  return (
    <div className="bg-[#060309] text-[#f5b461]  flex justify-center gap-4 p-4 rounded-lg shadow-sm w-200 px-20 pb-15 pt-8">
      <div className="w-full">
        <h1 className="text-center text-4xl font-bold tracking-tight leading-tight">
          Post
        </h1>
        <form
          action={handleSubmit}
          className="flex flex-col items-start space-y-4 mx-auto"
        >
          <label className="text-2xl font-medium mb-1" htmlFor="image">
            Image
          </label>
          <input
            name="file"
            className="cursor-pointer"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="preview"
              className="w-full object-contain"
            />
          )}
          <label className="text-2xl font-medium mb-1" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring"
            type="text"
            placeholder="Your title here..."
          />
          <label className="text-2xl font-medium mb-1" htmlFor="description">
            Description
          </label>
          <input
            name="description"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring"
            type="text"
            placeholder="Your description here..."
          />
          <label className="text-2xl font-medium mb-1" htmlFor="content">
            Content
          </label>
          <textarea
            name="content"
            className="w-full h-50 border rounded-md px-3 py-2 focus:outline-none focus:ring resize-none"
            placeholder="Write something..."
          ></textarea>

          <label className="text-2xl font-medium mb-1" htmlFor="slug">
            Slug
          </label>
          <input
            name="slug"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring"
            type="text"
            placeholder="slug..."
          />
          <input
            className="w-full mt-8 px-4 py-2 rounded-md font-medium bg-[#424e5a] text-white cursor-pointer"
            type="submit"
            value="Create"
          />
        </form>
      </div>
    </div>
  );
}
