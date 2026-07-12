import { tr } from "@/lib/translations";
import { getEvents } from "@/lib/queries/events";

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default async function EventsPage({ params }) {
  const { lang } = await params;
  const t = tr(lang).home.events;
  const events = await getEvents({ publishedOnly: true });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#265957]">
        {t.eventsPageTitle}
      </h1>
      <p className="mt-2 text-gray-500">{t.eventsPageSubtitle}</p>

      <div className="mt-8 grid gap-5">
        {events.map((e) => {
          const tag = e[`tag_${lang}`] || e.tag_en;
          const title = e[`title_${lang}`] || e.title_en;
          const desc = e[`desc_${lang}`] || e.desc_en;
          return (
            <div key={e.id} className="bg-white rounded-2xl shadow border border-gray-100 p-6">
              <div className="flex items-center justify-between gap-4">
                {tag && (
                  <span className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{ color: e.tag_color, background: e.tag_bg }}>
                    {tag}
                  </span>
                )}
                <span className="text-xs text-gray-500">{formatDate(e.event_date)}</span>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-gray-800">{title}</h2>
              {desc && <p className="mt-2 text-sm text-gray-500 leading-relaxed">{desc}</p>}
            </div>
          );
        })}

        {events.length === 0 && (
          <p className="text-gray-400 text-sm">No events published yet.</p>
        )}
      </div>
    </div>
  );
}
