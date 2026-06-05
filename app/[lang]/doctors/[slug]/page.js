import Image from "next/image";
import { notFound } from "next/navigation";
import { getDoctorBySlug, getDoctors } from "@/lib/queries/doctors";
import { tr } from "@/lib/translations";

export async function generateStaticParams() {
  const doctors = await getDoctors();
  const langs = ["en", "hi", "mr"];
  return langs.flatMap((lang) =>
    doctors.map((d) => ({ lang, slug: d.slug }))
  );
}

export default async function DoctorDetailPage({ params }) {
  const { lang, slug } = await params;

  const doctor = await getDoctorBySlug(slug);
  if (!doctor) return notFound();

  const pick = (row, key) => row[`${key}_${lang}`] || row[`${key}_en`];

  const name = pick(doctor, "name");
  const specialization = pick(doctor, "specialization");
  const bio = doctor[`bio_${lang}`] || doctor.bio_en || "";
  const t = tr(lang).doctors;

  return (
    <main className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 py-10 sm:py-14">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-8 items-start">
          {/* Photo */}
          <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100 shadow">
            <Image
              src={doctor.image_url || "/assets/doctor-placeholder.png"}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 360px"
              priority
            />
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl sm:text-5xl font-bold text-[#265957]">
              {name}
            </h1>

            {/* Specialization highlighted */}
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2">
              <span className="text-xs sm:text-sm font-semibold text-blue-700">
                {t.specialization}:
              </span>
              <span className="text-xs sm:text-sm font-bold text-blue-800">
                {specialization || t.specialist}
              </span>
            </div>

            {/* Bio (3 paragraphs rendered with line breaks) */}
            <div className="mt-6 text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {bio}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 sm:mt-14 rounded-2xl border border-gray-100 bg-gradient-to-r from-[#eaf6ff] to-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#265957]">
              {t.wantToConsult} {name}?
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {t.bookOnline}
            </p>
          </div>

          <button
            disabled
            className="mt-6 rounded-xl bg-blue-600 text-white px-6 py-3 font-semibold opacity-60 cursor-not-allowed"
          >
            {t.bookConsultation}
          </button>
        </div>
      </div>
    </main>
  );
}
