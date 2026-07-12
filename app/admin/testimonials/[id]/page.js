import { notFound } from "next/navigation";
import TestimonialForm from "../TestimonialForm";
import { sql } from "@/lib/db";

export default async function EditTestimonialPage({ params }) {
  const { id } = await params;
  const rows = await sql`SELECT * FROM testimonials WHERE id = ${id} LIMIT 1`;
  const testimonial = rows?.[0];
  if (!testimonial) return notFound();

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #f0faf7 0%, #f4f8ff 100%)" }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-8 py-10">
        <h1 className="text-3xl font-extrabold text-[#265957] tracking-tight">Edit Testimonial</h1>
        <div className="mt-3 h-1 w-16 rounded-full mb-8" style={{ background: "linear-gradient(to right, #1e7a62, #2c608e)" }} />
        <TestimonialForm initial={testimonial} />
      </div>
    </div>
  );
}
