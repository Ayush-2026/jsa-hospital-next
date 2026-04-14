import Heading from "@/components/layout/Heading";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import VelocityComponent from "@/components/layout/VelocityComponent";
import { satoshi } from "@/lib/fonts/satoshi";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

export default async function LangLayout({ children, params }) {
 
const {lang} = await params;
 
  return (
    <>
      <VelocityComponent />
      <Heading lang={lang} />
      <Navbar lang={lang} />
      {children}
      <Footer lang={lang}/>
      <WhatsAppButton />
    </>
  );
}
