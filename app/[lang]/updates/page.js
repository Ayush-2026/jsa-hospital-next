import { tr } from "@/lib/translations";
import { getUpdates } from "@/lib/queries/updates";

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default async function UpdatesPage({ params }) {
  const { lang } = await params;
  const t = tr(lang).home.events;
  const updates = await getUpdates({ publishedOnly: true });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#265957]">
        {t.updatesPageTitle}
      </h1>
      <p className="mt-2 text-gray-500">{t.updatesPageSubtitle}</p>

      <div className="mt-8 grid gap-5">
        {updates.map((u) => {
          const tag = u[`tag_${lang}`] || u.tag_en;
          const title = u[`title_${lang}`] || u.title_en;
          const desc = u[`desc_${lang}`] || u.desc_en;
          return (
            <div key={u.id} className="bg-white rounded-2xl shadow border border-gray-100 p-6">
              <div className="flex items-center justify-between gap-4">
                {tag && (
                  <span className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{ color: u.tag_color, background: u.tag_bg }}>
                    {tag}
                  </span>
                )}
                <span className="text-xs text-gray-500">{formatDate(u.update_date)}</span>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-gray-800">{title}</h2>
              {desc && <p className="mt-2 text-sm text-gray-500 leading-relaxed">{desc}</p>}
            </div>
          );
        })}

        {updates.length === 0 && (
          <p className="text-gray-400 text-sm">No updates published yet.</p>
        )}
      </div>
    </div>
  );
}
