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

  // Only allow safe filename characters.
  const allowRegex = /^[a-zA-Z0-9._-]+$/;
  if (!allowRegex.test(filename)) {
    return new Response("Invalid filename", { status: 400 });
  }

  const fileType = filename.split(".").pop()?.toLowerCase();
  if (!fileType || !["jpg", "jpeg", "png", "gif", "webp"].includes(fileType)) {
    return new Response("Unsupported image format", { status: 400 });
  }

  const usersDir = path.join(process.cwd(), "public", "img", "users");
  const requestedPath = path.resolve(usersDir, filename);

  // Prevent path traversal by ensuring resolved path stays under usersDir.
  const relative = path.relative(usersDir, requestedPath);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return new Response("Access denied", { status: 403 });
  }

  try {
    const file = await fs.readFile(requestedPath);
    return new Response(file, {
      headers: {
        "Content-Type": `image/${fileType === "jpg" ? "jpeg" : fileType}`,
      },
    });
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError.code === "ENOENT") {
      return new Response("Image not found", { status: 404 });
    }

    return new Response(`Error fetching image: ${(error as Error).message}`, {
      status: 500,
    });
  }
};
