// app/[lang]/about-us/page.js
import Link from "next/link";
import { tr } from "@/lib/translations";

export default async function AboutUsPage({ params }) {
  const { lang } = await params;
  const t = tr(lang).about;

  return (
    <main className="w-full mt-10 bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#dff3ff] via-[#edf9ff] to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-12 sm:py-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-[#255C8D]">
                {t.eyebrow}
              </p>
              <h1 className="mt-2 text-3xl sm:text-5xl font-bold text-[#265957] leading-tight">
                {t.hero}
              </h1>
              <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                {t.heroDesc}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={`/${lang}/doctors`}
                  className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-white font-semibold transition"
                  style={{ background: "linear-gradient(to right, #1e7a62, #2c608e)" }}
                >
                  {t.findDoctor}
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="w-full lg:w-[420px] bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-gray-900">
                {t.atGlance}
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-4">
                {[
                  { value: "20+", label: t.statsLabels[0] },
                  { value: "50+", label: t.statsLabels[1] },
                  { value: "24/7", label: t.statsLabels[2] },
                  { value: "100K+", label: t.statsLabels[3] },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-[#f2fbff] p-4">
                    <p className="text-2xl font-bold text-[#255C8D]">{stat.value}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs text-gray-500">{t.statsNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <span className="text-lg">🎯</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{t.mission.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{t.mission.desc}</p>
            </div>

            <div className="rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center">
                <span className="text-lg">👁️</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{t.vision.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{t.vision.desc}</p>
            </div>

            <div className="rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <span className="text-lg">🤝</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{t.values.title}</h3>
              <ul className="mt-2 text-sm text-gray-600 space-y-2">
                {t.values.list.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-b from-white to-[#f7fbff]">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-12 sm:py-16">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="flex-1">
              <h2 className="text-2xl sm:text-4xl font-bold text-[#265957]">
                {t.whyTitle}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                {t.whyDesc}
              </p>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.whyCards.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
                        <span className="text-lg">{item.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety / Quality card */}
            <div className="w-full lg:w-[420px] rounded-2xl text-white p-7 sm:p-8 shadow-xl" style={{ background: "linear-gradient(135deg, #1e7a62, #2c608e)" }}>
              <h3 className="text-xl font-bold">{t.safety.title}</h3>
              <p className="mt-3 text-sm text-white/90 leading-relaxed">{t.safety.desc}</p>

              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                {t.safety.cards.map((card) => (
                  <div key={card.title} className="rounded-xl bg-white/10 p-4">
                    <p className="font-semibold">{card.title}</p>
                    <p className="text-xs text-white/80 mt-1">{card.sub}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7">
                <Link
                  href={`/${lang}/contact-us`}
                  className="inline-flex items-center justify-center rounded-xl bg-white text-[#1e7a62] px-5 py-2.5 font-semibold hover:bg-gray-100 transition"
                >
                  {t.safety.contactUs}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
