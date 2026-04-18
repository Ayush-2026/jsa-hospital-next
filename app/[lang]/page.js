import HeaderSlider from "@/components/home/HeaderSlider";
import MedicalAssistance from "@/components/home/MedicalAssistance";
import Excellence from "@/components/home/Excellence";
import DoctorMessageSection from "@/components/home/DoctorMessageSection";
import TalkToOurTeam from "@/components/home/TalkToOurTeam";
import EventsUpdatesSection from "@/components/home/EventUpdatesSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getDepartments } from "@/lib/queries/departments";
import { getDoctors } from "@/lib/queries/doctors";

export default async function Home({ params }) {
  const { lang } = await params;
  const [allDepartments, allDoctors] = await Promise.all([getDepartments(), getDoctors()]);
  const departments = allDepartments.slice(0, 6);

  return (
    <>
      {/* Hero — no reveal, visible immediately */}
      <HeaderSlider lang={lang} doctors={allDoctors} departments={allDepartments} />

      {/* Medical assistance — zooms in */}
      <ScrollReveal variant="zoom" duration={700}>
        <MedicalAssistance lang={lang} />
      </ScrollReveal>

      {/* Departments carousel — fades up */}
      <ScrollReveal variant="fadeUp" duration={750} delay={50}>
        <Excellence lang={lang} departments={departments} />
      </ScrollReveal>

      {/* Doctor messages — slides in from right */}
      <ScrollReveal variant="fadeRight" duration={750}>
        <DoctorMessageSection lang={lang} />
      </ScrollReveal>

      {/* Events & Updates — slides in from left */}
      <ScrollReveal variant="fadeLeft" duration={750}>
        <EventsUpdatesSection lang={lang} />
      </ScrollReveal>

      {/* Talk to our team — zooms in from above */}
      <ScrollReveal variant="zoomDown" duration={700} delay={50}>
        <TalkToOurTeam lang={lang} />
      </ScrollReveal>
    </>
  );
}
