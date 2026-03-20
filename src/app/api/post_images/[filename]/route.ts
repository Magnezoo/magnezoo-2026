import { promises as fs } from "node:fs";
import path from "node:path";

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ filename: string }> },
) => {
  const { filename } = await params;

  if (!filename) {
    return new Response("Image URL is required", { status: 400 });
  }

  // Basic allowlist for filenames: only letters, numbers, dot, underscore, hyphen
  const allowRegex = /^[a-zA-Z0-9._-]+$/;
  if (!allowRegex.test(filename)) {
    return new Response("Invalid filename", { status: 400 });
  }

  // Not Allow other directory traversal characters like / or \ to prevent path traversal
  if (filename.includes("/") || filename.includes("\\")) {
    return new Response("Invalid filename", { status: 400 });
  }

  // Allowed extensions
  const fileType = filename.split(".").pop()?.toLowerCase();
  if (
    !fileType ||
    !["jpg", "jpeg", "png", "gif", "webp", "heic"].includes(fileType)
  ) {
    return new Response("Unsupported image format", { status: 400 });
  }

  try {
    const postsDir = path.join(process.cwd(), "public", "img", "posts");
    const requestedPath = path.resolve(postsDir, filename);

    // Prevent path traversal: ensure the resolved path is inside postsDir
    const relative = path.relative(postsDir, requestedPath);
    if (relative.startsWith("..") || path.isAbsolute(relative)) {
      return new Response("Access denied", { status: 403 });
    }

    const file = await fs.readFile(requestedPath);
    if (!file) {
      return new Response("Image not found", { status: 404 });
    }

    const blob = new Blob([file], { type: `image/${fileType}` });
    return new Response(blob, {
      headers: { "Content-Type": blob.type },
    });
  } catch (error) {
    return new Response(`Error fetching image: ${(error as Error).message}`, {
      status: 500,
    });
  }
};
