import BookTestsHero from "@/components/book-tests/BookTestsHero";

export default async function BookTestsPage({ params }) {
  const { lang } = await params;
  return (
    <BookTestsHero
      lang={lang || "en"}
      phoneNumberDial="919876543210"
      phoneNumberDisplay="+91 98765 43210"
    />
  );
}
