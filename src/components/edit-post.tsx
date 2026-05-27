"use client";

import { editPostAction } from "@/actions/edit-post-action";
import { useAuth } from "@/app/context/auth-content";
import { useOnePost } from "@/hooks/posts/useOnePost";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

type BlockType = "subtitle" | "paragraph" | "image";

type Block = {
  id: number;
  type: BlockType;
  value: string | File;
  preview?: string;
  uploading?: boolean;
   caption?: string; //
};

export default function EditPost({ id }: { id: string }) {
  const router = useRouter();
  const { getAccessToken } = useAuth();
  const { post, loading } = useOnePost(id);

  // Fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  // Content builder
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!post) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTitle(post.title ?? "");
    setDescription(post.description ?? "");
    setSlug(post.slug ?? "");

    if (post.image) {
      setCoverPreview(post.image);
    }

    if (Array.isArray(post.content)) {
      const loaded: Block[] = (
        post.content as { type: BlockType; value: string; caption?: string }[]
      ).map((b) => ({
        id: Date.now() + Math.random(),
        type: b.type,
        value: b.value ?? "",
        preview: b.type === "image" ? b.value : undefined,
        caption: b.caption || "",
      }));
      setBlocks(loaded);
    }
  }, [post]);

  // --- Cover ---
  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (coverPreview?.startsWith("blob:")) URL.revokeObjectURL(coverPreview);
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
      if (block?.preview?.startsWith("blob:"))
        URL.revokeObjectURL(block.preview);
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

  // Upload
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
          b.id === id ? { ...b, value: "", uploading: false } : b,
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
      setError("Wait upload be finished.");
      return;
    }

    const contentJson = blocks.map((b) => ({
      type: b.type,
      value: typeof b.value === "string" ? b.value : "",
      caption: b.caption || "",
    }));

    try {
      setSubmitting(true);

      const fd = new FormData();
      fd.append("title", title);
      fd.append("description", description);
      fd.append("slug", slug);
      fd.append("content", JSON.stringify(contentJson));
      if (coverFile) fd.append("file", coverFile);

      await editPostAction(fd, token, id);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Erro inesperado.");
    } finally {
      setSubmitting(false);
    }
  }

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
    <div className="bg-[#060309] text-[#f5b461] flex justify-center gap-4 p-4 rounded-lg shadow-sm w-200 px-20 pb-15 pt-10">
      <div className="w-full">
        <h1 className="text-center text-4xl font-bold tracking-tight leading-tight mb-6">
          Edit Post
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Cover */}
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

          {/* Second title */}
          <label className="text-2xl font-medium" htmlFor="description">
            Second title
          </label>
          <input
            id="description"
            type="text"
            className="w-full border rounded-md px-3 py-2 bg-transparent focus:outline-none focus:ring"
            placeholder="Your second title here..."
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

          {/* Content builder */}

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

                {block.type === "image" ? (
                  <div className="flex flex-col gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      className="cursor-pointer text-sm"
                      onChange={(e) => handleBlockImageChange(block.id, e)}
                    />
                    <input
                      type="text"
                      placeholder="Add a caption..."
                      value={block.caption || ""}
                      onChange={(e) =>
                        setBlocks((prev) =>
                          prev.map((b) =>
                            b.id === block.id
                              ? { ...b, caption: e.target.value }
                              : b,
                          ),
                        )
                      }
                      className="text-xs border border-gray-600 rounded px-2 py-1 bg-transparent"
                    />
                    {block.uploading && (
                      <span className="text-xs text-yellow-400 animate-pulse">
                        Uploading...
                      </span>
                    )}
                    {/* image preview */}
                    {(block.preview ||
                      (typeof block.value === "string" && block.value)) &&
                      !block.uploading && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={block.preview ?? (block.value as string)}
                          alt="inline preview"
                          className="max-h-40 object-contain rounded border border-gray-700"
                        />
                      )}
                    {typeof block.value === "string" &&
                      block.value &&
                      !block.uploading && (
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

          {error && <p className="text-red-400 text-sm">{error}</p>}
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
          <button
            type="submit"
            disabled={submitting || blocks.some((b) => b.uploading)}
            className="w-full mt-8 px-4 py-2 rounded-md font-medium bg-[#424e5a] text-white cursor-pointer hover:bg-[#526070] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
