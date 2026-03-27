"use client";
import Link from "next/link";

const eventsData = [
  {
    tag: "Health Camp",
    tagStyle: "bg-green-100 text-green-700",
    title: "Free Heart Health Checkup Camp",
    desc: "Comprehensive cardiac screening for early detection of heart conditions. Free consultation with senior cardiologists.",
    date: "March 15, 2024",
  },
  {
    tag: "Workshop",
    tagStyle: "bg-blue-100 text-blue-700",
    title: "Diabetes Awareness Workshop",
    desc: "Learn about diabetes management, nutrition, and lifestyle modifications. Expert dietitians and endocrinologists.",
    date: "March 20, 2024",
  },
  {
    tag: "Conference",
    tagStyle: "bg-purple-100 text-purple-700",
    title: "Medical Technology Conference",
    desc: "Latest advances in medical technology and surgical procedures. CME accredited for medical professionals.",
    date: "March 25, 2024",
  },
];

const updatesData = [
  {
    tag: "Equipment",
    tagStyle: "bg-orange-100 text-orange-700",
    title: "New Advanced MRI Machine Installed",
    desc: "State-of-the-art 3 Tesla MRI machine for superior imaging quality and faster diagnosis capabilities.",
    date: "March 10, 2024",
  },
  {
    tag: "Service",
    tagStyle: "bg-sky-100 text-sky-700",
    title: "24/7 Emergency Services Enhanced",
    desc: "Upgraded emergency department with additional trauma bays and critical care monitoring systems.",
    date: "March 8, 2024",
  },
  {
    tag: "Digital",
    tagStyle: "bg-indigo-100 text-indigo-700",
    title: "Telemedicine Services Launched",
    desc: "Online consultation services now available for follow-up appointments and routine medical advice.",
    date: "March 5, 2024",
  },
];

function CardItem({ item, accent = "border-gray-200", ctaText, ctaHref }) {
  return (
    <div className="relative pl-5 py-4">
      <div className={`absolute left-1.5 top-4 bottom-4 w-0.75 rounded-full ${accent}`} />

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className={`text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${item.tagStyle}`}>
          {item.tag}
        </span>
        <span className="text-[10px] sm:text-xs text-gray-400 ml-auto">{item.date}</span>
      </div>

      <h4 className="mt-2 font-semibold text-sm sm:text-base text-gray-800 leading-snug">{item.title}</h4>
      <p className="mt-1.5 text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-2">{item.desc}</p>

      <Link
        href={ctaHref}
        className="inline-flex items-center gap-1 mt-2 text-xs sm:text-sm font-semibold text-[#1e7a62] hover:underline"
      >
        {ctaText} <span>›</span>
      </Link>
    </div>
  );
}

export default function EventsUpdatesSection({ lang = "en" }) {
  return (
    <>
      <style>{`
        @keyframes euShine {
          0%   { left: -120%; }
          100% { left: 130%;  }
        }
        .eu-btn {
          position: relative;
          overflow: hidden;
          display: block;
          text-align: center;
          background: linear-gradient(to right, #1e7a62, #2c608e);
          color: white;
          padding: 12px 0;
          border-radius: 12px;
          font-weight: 600;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 18px rgba(30,122,98,0.25);
        }
        .eu-btn::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -120%;
          width: 55%;
          height: 200%;
          background: linear-gradient(
            120deg,
            transparent 20%,
            rgba(255,255,255,0.32) 50%,
            transparent 80%
          );
          transform: skewX(-15deg);
        }
        .eu-btn:hover::after {
          animation: euShine 0.55s ease forwards;
        }
        .eu-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 44px rgba(30,122,98,0.42), 0 4px 16px rgba(44,96,142,0.22);
        }
        .eu-btn span { position: relative; z-index: 1; }
      `}</style>

      <section className="w-full py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <h2 className="text-center text-2xl sm:text-4xl font-bold text-[#265957]">
            Events and Updates
          </h2>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Events */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-4 sm:p-7">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center">
                    <span className="text-base sm:text-lg">📅</span>
                  </div>
                  <h3 className="text-base sm:text-xl font-semibold text-gray-800">
                    Events & Conferences
                  </h3>
                </div>

                <div className="mt-4 divide-y divide-gray-100">
                  {eventsData.map((item, idx) => (
                    <div key={idx} className="py-2">
                      <CardItem
                        item={item}
                        accent="bg-blue-200"
                        ctaText="Learn More"
                        ctaHref={`/${lang}/events`}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Link href={`/${lang}/events`} className="eu-btn">
                    <span>View All Events</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Updates */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-4 sm:p-7">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-xl bg-green-50 flex items-center justify-center">
                    <span className="text-base sm:text-lg">🔔</span>
                  </div>
                  <h3 className="text-base sm:text-xl font-semibold text-gray-800">
                    Hospital Updates
                  </h3>
                </div>

                <div className="mt-4 divide-y divide-gray-100">
                  {updatesData.map((item, idx) => (
                    <div key={idx} className="py-2">
                      <CardItem
                        item={item}
                        accent="bg-green-200"
                        ctaText="Read More"
                        ctaHref={`/${lang}/updates`}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Link href={`/${lang}/updates`} className="eu-btn">
                    <span>View All Updates</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
