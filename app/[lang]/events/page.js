import { tr } from "@/lib/translations";

export default async function EventsPage({ params }) {
  const { lang } = await params;
  const t = tr(lang).home.events;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#265957]">
        {t.eventsPageTitle}
      </h1>
      <p className="mt-2 text-gray-500">{t.eventsPageSubtitle}</p>

      <div className="mt-8 grid gap-5">
        {t.eventsData.map((e, i) => (
          <div key={i} className="bg-white rounded-2xl shadow border border-gray-100 p-6">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs px-2 py-1 rounded-full font-medium"
                style={{ color: e.tagColor, background: e.tagBg }}>
                {e.tag}
              </span>
              <span className="text-xs text-gray-500">{e.date}</span>
            </div>
            <h2 className="mt-3 text-lg font-semibold text-gray-800">{e.title}</h2>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">{e.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
