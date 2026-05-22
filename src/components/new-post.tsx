"use client";

import { newPostAction } from "@/actions/new-post-action";
import { uploadFileService } from "@/services/new-post-service";
import { useAuth } from "@/app/context/auth-content";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Block, BlockType } from "@/types/blocks";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function NewPost() {
  const router = useRouter();
  const { getAccessToken } = useAuth();

  // Filds
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  // --- Content builder ---
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Cover image ---
  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  }

  // --- Block helpers ---
  function addBlock() {
    setBlocks((prev) => [
      ...prev,
      { id: Date.now(), type: "paragraph", value: "" },
    ]);
  }

  function removeBlock(id: number) {
    setBlocks((prev) => {
      const block = prev.find((b) => b.id === id);
      if (block?.preview) URL.revokeObjectURL(block.preview);
      return prev.filter((b) => b.id !== id);
    });
  }

  function changeBlockType(id: number, type: BlockType) {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, type, value: "", preview: undefined } : b,
      ),
    );
  }

  function changeBlockText(id: number, value: string) {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, value } : b)));
  }

  async function handleBlockImageChange(
    id: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);

    setBlocks((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, value: file, preview: localPreview, uploading: true }
          : b,
      ),
    );

    try {
      const token = getAccessToken();
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch(`${baseURL}/api/posts/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      const url: string = data.url ?? data.secure_url ?? "";

      setBlocks((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, value: url, uploading: false } : b,
        ),
      );
    } catch (err) {
      console.error(err);
      setBlocks((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, uploading: false, value: "" } : b,
        ),
      );
    }
  }

  // --- Submit ---
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const token = getAccessToken();
    if (!token) return;

    if (blocks.some((b) => b.uploading)) {
      setError("Aguarde o upload das imagens terminar.");
      return;
    }

    const contentJson = blocks.map((b) => ({
      type: b.type,
      value: typeof b.value === "string" ? b.value : "",
    }));

    try {
      setSubmitting(true);

      let coverUrl: string | undefined;
      if (coverFile) {
        coverUrl = await uploadFileService(coverFile, token);
      }

      await newPostAction(
        title,
        description,
        contentJson,
        slug,
        coverUrl,
        token,
      );
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Erro inesperado.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-[#060309] text-[#f5b461] flex justify-center gap-4 p-4 rounded-lg shadow-sm w-200 px-20 pb-15 pt-8">
      <div className="w-full">
        <h1 className="text-center text-4xl font-bold tracking-tight leading-tight mb-6">
          New Post
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Cover image */}
          <label className="text-2xl font-medium" htmlFor="cover">
            Cover Image
          </label>
          <input
            id="cover"
            type="file"
            accept="image/*"
            className="cursor-pointer text-sm"
            onChange={handleCoverChange}
          />
          {coverPreview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={coverPreview}
              alt="cover preview"
              className="w-full max-h-60 object-contain rounded border border-gray-700"
            />
          )}

          {/* Title */}
          <label className="text-2xl font-medium" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full border rounded-md px-3 py-2 bg-transparent focus:outline-none focus:ring"
            placeholder="Your title here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Description */}
          <label className="text-2xl font-medium" htmlFor="description">
            Description
          </label>
          <input
            id="description"
            type="text"
            className="w-full border rounded-md px-3 py-2 bg-transparent focus:outline-none focus:ring"
            placeholder="Your description here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          {/* Slug */}
          <label className="text-2xl font-medium" htmlFor="slug">
            Slug
          </label>
          <input
            id="slug"
            type="text"
            className="w-full border rounded-md px-3 py-2 bg-transparent focus:outline-none focus:ring"
            placeholder="slug..."
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />

          

          {blocks.length === 0 && (
            <p className="text-sm text-gray-500 italic">
              No blocks yet. Click &quot;+ Add block&quot; to start building
              your content.
            </p>
          )}

          <div className="flex flex-col gap-4">
            {blocks.map((block, index) => (
              <div
                key={block.id}
                className="border border-gray-700 rounded-md p-3 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Block {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeBlock(block.id)}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    remove
                  </button>
                </div>

                {/* Seletor de tipo */}
                <select
                  value={block.type}
                  onChange={(e) =>
                    changeBlockType(block.id, e.target.value as BlockType)
                  }
                  className="bg-[#060309] border border-gray-600 rounded px-2 py-1 text-sm text-[#f5b461]"
                >
                  <option value="paragraph">Paragraph</option>
                  <option value="subtitle">Subtitle</option>
                  <option value="image">Image</option>
                </select>

                {/* Dynamic input */}
                {block.type === "image" ? (
                  <div className="flex flex-col gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      className="cursor-pointer text-sm"
                      onChange={(e) => handleBlockImageChange(block.id, e)}
                    />
                    {block.uploading && (
                      <span className="text-xs text-yellow-400 animate-pulse">
                        Uploading...
                      </span>
                    )}
                    {block.preview && !block.uploading && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={block.preview}
                        alt="inline preview"
                        className="max-h-40 object-contain rounded border border-gray-700"
                      />
                    )}
                    {typeof block.value === "string" && block.value && (
                      <span className="text-xs text-green-400 break-all">
                        ✓ {block.value}
                      </span>
                    )}
                  </div>
                ) : block.type === "subtitle" ? (
                  <input
                    type="text"
                    placeholder="Subtitle..."
                    value={block.value as string}
                    onChange={(e) => changeBlockText(block.id, e.target.value)}
                    className="w-full border border-gray-600 rounded px-3 py-2 bg-transparent text-lg font-semibold focus:outline-none focus:ring"
                  />
                ) : (
                  <textarea
                    placeholder="Paragraph..."
                    value={block.value as string}
                    onChange={(e) => changeBlockText(block.id, e.target.value)}
                    className="w-full h-28 border border-gray-600 rounded px-3 py-2 bg-transparent text-sm focus:outline-none focus:ring resize-none"
                  />
                )}
              </div>
            ))}
          </div>
            {/* Content builder */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-medium">Content</span>
            <button
              type="button"
              onClick={addBlock}
              className="px-3 py-1 text-sm border border-[#f5b461] rounded hover:bg-[#f5b461] hover:text-black transition-colors"
            >
              + Add block
            </button>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={submitting || blocks.some((b) => b.uploading)}
            className="w-full mt-8 px-4 py-2 rounded-md font-medium bg-[#424e5a] text-white cursor-pointer hover:bg-[#526070] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
