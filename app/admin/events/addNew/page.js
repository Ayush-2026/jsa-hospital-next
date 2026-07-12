import TagItemForm from "@/components/admin/TagItemForm";

export default function AddNewEventPage() {
  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #f0faf7 0%, #f4f8ff 100%)" }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-8 py-10">
        <h1 className="text-3xl font-extrabold text-[#265957] tracking-tight">New Event</h1>
        <div className="mt-3 h-1 w-16 rounded-full mb-8" style={{ background: "linear-gradient(to right, #1e7a62, #2c608e)" }} />
        <TagItemForm
          dateField="event_date"
          apiBase="/api/admin/events"
          listHref="/admin/events"
          dateLabel="Event Date"
        />
      </div>
    </div>
  );
}
