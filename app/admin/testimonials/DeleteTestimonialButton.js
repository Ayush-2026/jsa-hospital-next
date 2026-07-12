"use client";
import { useRouter } from "next/navigation";

export default function DeleteTestimonialButton({ id }) {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        if (confirm("Delete this testimonial?")) {
          await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
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
