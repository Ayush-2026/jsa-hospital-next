import ConsultationForm from "@/components/booking/ConsultationForm";
import { getDoctors } from "@/lib/queries/doctors";

export default async function ConsultationPage({ params }) {
  const doctors = await getDoctors({ activeOnly: true });
  const { lang } = await params;

  return (
    <div className="bg-gray-200 py-10 px-4">
      <div className="mx-auto max-w-xl">
        <h1 className="text-center text-2xl sm:text-3xl font-semibold text-blue-500">
          Book Appointment
        </h1>

        <div className="mt-8">
          <ConsultationForm lang={params.lang} doctors={doctors || []} />
        </div>
      </div>
    </div>
  );
}
