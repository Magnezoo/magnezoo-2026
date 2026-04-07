"use client";

import { Dialog } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Modal({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <Dialog open={true} onClose={() => router.back()} maxWidth="sm" fullWidth>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Post ID: {params.id}</h2>
        <p>
          This is a modal for post details. Implement the details view here.
        </p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Close
        </button>
      </div>
    </Dialog>
  );
}
