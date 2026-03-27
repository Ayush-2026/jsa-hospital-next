import "../app/[lang]/globals.css";
import { satoshi } from "@/lib/fonts/satoshi";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={satoshi.variable}>
        {children}
      </body>
    </html>
  );
}
