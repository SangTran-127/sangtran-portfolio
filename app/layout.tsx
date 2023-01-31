import Header from "@/components/header";
import Footer from "@/components/footer/Footer";
import { Be_Vietnam_Pro } from "@next/font/google";
import "@/styles/global.css";
import "@/sass/index.scss";
import "animate.css";

const vietnamese = Be_Vietnam_Pro({
  weight: ["400", "700"],
  subsets: ["vietnamese"],
  style: ["normal"],
});
export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={vietnamese.className}>
      <head />
      <body className="bg-dracula-aro relative min-h-screen">

        <Header />
        <div className="main-content">{children}</div>
        <Footer />

      </body>
    </html>
  );
}
