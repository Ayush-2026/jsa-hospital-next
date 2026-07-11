"use client";
import { useRouter } from "next/navigation";

export default function DeleteArticleButton({ slug }) {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        if (confirm("Delete this article?")) {
          await fetch(`/api/admin/articles/${slug}`, { method: "DELETE" });
          router.refresh();
        }
      }}
      className="px-3 py-1 rounded-xl text-white text-sm font-semibold cursor-pointer transition-opacity hover:opacity-80"
      style={{ background: "linear-gradient(to right, #dc2626, #b91c1c)" }}
    >
      Delete
    </button>
  );
}
