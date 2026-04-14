import Link from "next/link";
import Image from "next/image";
import { getDoctors } from "@/lib/queries/doctors";
import DeleteButton from "./DeleteButton";

export default async function DoctorsPage({ params }) {
  
  const doctors = await getDoctors();

  const pick = (row, key) => row[`${key}_en`]


  return (
    <>
      <style>{`
        @keyframes docBtnShine {
          0%   { left: -120%; }
          100% { left: 130%;  }
        }
        .doc-book-btn {
          position: relative;
          overflow: hidden;
          display: block;
          text-align: center;
          background: linear-gradient(to right, #1e7a62, #2c608e);
          color: white;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.75rem;
          padding: 9px 12px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 3px 12px rgba(30,122,98,0.25);
        }
        @media (min-width: 640px) {
          .doc-book-btn { font-size: 0.875rem; padding: 10px 14px; }
        }
        .doc-book-btn::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -120%;
          width: 55%;
          height: 200%;
          background: linear-gradient(
            120deg,
            transparent 20%,
            rgba(255,255,255,0.3) 50%,
            transparent 80%
          );
          transform: skewX(-15deg);
        }
        .doc-book-btn:hover::after {
          animation: docBtnShine 0.55s ease forwards;
        }
        .doc-book-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(30,122,98,0.38);
        }
        .doc-book-btn span { position: relative; z-index: 1; }
      `}</style>

      <div
        className="min-h-screen"
        style={{ background: "linear-gradient(135deg, #f0faf7 0%, #f4f8ff 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#265957] tracking-tight">
            Our Doctors
          </h1>
          <p className="mt-2 text-sm sm:text-base font-medium text-gray-500">
           Add edit and delete doctors.
          </p>
          <div className="mt-3 h-1 w-16 rounded-full" style={{ background: "linear-gradient(to right, #1e7a62, #2c608e)" }} />

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {doctors.map((d)=> (
              <div
                key={d.id}
                className="bg-white rounded-2xl shadow border border-gray-100 hover:shadow-lg transition p-4 flex flex-col"
              >
                <div  className="flex flex-col flex-1">
                  <div className="relative w-full aspect-4/5 rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={d.image_url || "/assets/doctor-placeholder.png"}
                      alt={pick(d, "name")}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>

                  <h3 className="mt-3 font-semibold text-gray-900 text-sm sm:text-base">
                    {pick(d, "name")}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {pick(d, "specialization")}
                  </p>
                </div>

                {/* <Link
                  href={`/${lang}/consultation?doctor=${encodeURIComponent(d.slug)}`}
                  className="doc-book-btn mt-3"
                >
                  <span>Book Appointment</span>
                </Link> */}

                  <div className="flex gap-2 mt-2 flex-wrap">
                    <Link href={`/admin/doctors/${d.slug}`} className="px-3 py-1 mr-2 border rounded-xl text-white bg-blue-700">Edit</Link>
                    <DeleteButton slug={d.slug}/>
                    

                  </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
