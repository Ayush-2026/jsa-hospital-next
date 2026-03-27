// app/[lang]/about-us/page.js
import Link from "next/link";

export default async function AboutUsPage({ params }) {
  const { lang } = await params;

  return (
    <main className="w-full mt-10 bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#dff3ff] via-[#edf9ff] to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-12 sm:py-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-[#255C8D]">
                About JSA Hospital
              </p>
              <h1 className="mt-2 text-3xl sm:text-5xl font-bold text-[#265957] leading-tight">
                Trusted healthcare with compassion, technology, and excellence.
              </h1>
              <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                JSA Hospital is committed to delivering high-quality medical
                care through experienced doctors, modern infrastructure, and a
                patient-first approach. From preventive checkups to specialized
                treatments, we focus on safety, transparency, and comfort for
                every patient.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={`/${lang}/doctors`}
                  className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-white font-semibold transition"
                  style={{ background: "linear-gradient(to right, #1e7a62, #2c608e)" }}
                >
                  Find a Doctor
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="w-full lg:w-[420px] bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-gray-900">
                At a Glance
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-[#f2fbff] p-4">
                  <p className="text-2xl font-bold text-[#255C8D]">20+</p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Years of Service
                  </p>
                </div>
                <div className="rounded-xl bg-[#f2fbff] p-4">
                  <p className="text-2xl font-bold text-[#255C8D]">50+</p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Specialist Doctors
                  </p>
                </div>
                <div className="rounded-xl bg-[#f2fbff] p-4">
                  <p className="text-2xl font-bold text-[#255C8D]">24/7</p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Emergency Care
                  </p>
                </div>
                <div className="rounded-xl bg-[#f2fbff] p-4">
                  <p className="text-2xl font-bold text-[#255C8D]">100K+</p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Patients Served
                  </p>
                </div>
              </div>

              <p className="mt-5 text-xs text-gray-500">
                *Numbers are indicative and can be updated later.
              </p>
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
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Our Mission
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                To provide accessible, ethical, and affordable healthcare with
                consistent quality, guided by clinical excellence and patient
                safety.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center">
                <span className="text-lg">👁️</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Our Vision
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                To be the most trusted hospital in the region by combining
                advanced technology, compassionate care, and continuous
                improvement.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <span className="text-lg">🤝</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Our Values
              </h3>
              <ul className="mt-2 text-sm text-gray-600 space-y-2">
                <li>• Patient-first approach</li>
                <li>• Integrity & transparency</li>
                <li>• Safety & hygiene standards</li>
                <li>• Respect & empathy</li>
                <li>• Teamwork & accountability</li>
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
                Why Choose JSA Hospital
              </h2>
              <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                We focus on accurate diagnosis, timely treatment, and a caring
                experience. Our team follows standardized clinical protocols and
                supports patients at every step — from consultation to recovery.
              </p>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Experienced Specialists",
                    desc: "Multi-specialty doctors with strong clinical expertise.",
                    icon: "👨‍⚕️",
                  },
                  {
                    title: "Modern Diagnostics",
                    desc: "Reliable investigations with advanced equipment.",
                    icon: "🧪",
                  },
                  {
                    title: "Patient Support",
                    desc: "Clear communication and assistance at every step.",
                    icon: "🫶",
                  },
                  {
                    title: "Emergency Services",
                    desc: "Prepared for urgent care and critical situations.",
                    icon: "🚑",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
                        <span className="text-lg">{item.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety / Quality card */}
            <div className="w-full lg:w-[420px] rounded-2xl text-white p-7 sm:p-8 shadow-xl" style={{ background: "linear-gradient(135deg, #1e7a62, #2c608e)" }}>
              <h3 className="text-xl font-bold">Safety & Quality</h3>
              <p className="mt-3 text-sm text-white/90 leading-relaxed">
                We follow strict hygiene protocols and maintain quality
                standards across consultations, procedures, and patient care.
                Our goal is to ensure a safe, reliable, and comfortable
                experience for every patient and family.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-white/10 p-4">
                  <p className="font-semibold">Hygiene</p>
                  <p className="text-xs text-white/80 mt-1">
                    Sanitization & SOPs
                  </p>
                </div>
                <div className="rounded-xl bg-white/10 p-4">
                  <p className="font-semibold">Protocols</p>
                  <p className="text-xs text-white/80 mt-1">
                    Standard care pathways
                  </p>
                </div>
                <div className="rounded-xl bg-white/10 p-4">
                  <p className="font-semibold">Transparency</p>
                  <p className="text-xs text-white/80 mt-1">
                    Clear guidance & billing
                  </p>
                </div>
                <div className="rounded-xl bg-white/10 p-4">
                  <p className="font-semibold">Support</p>
                  <p className="text-xs text-white/80 mt-1">
                    Patient assistance team
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <Link
                  href={`/${lang}/contact-us`}
                  className="inline-flex items-center justify-center rounded-xl bg-white text-[#1e7a62] px-5 py-2.5 font-semibold hover:bg-gray-100 transition"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      
     
    </main>
  );
}
