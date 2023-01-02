import Header from "@/components/header";
import { Be_Vietnam_Pro } from "@next/font/google";
import "@/styles/global.css";
// import "@/styles/prism.css";
import "@/sass/index.scss";
import "animate.css";

const vietnamese = Be_Vietnam_Pro({
  weight: ["400", "700"],
  subsets: ["vietnamese"],
});
export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={vietnamese.className}>
      <body className="bg-dracula-aro min-h-screen">
        <Header />
        <>{children}</>
      </body>
    </html>
  );
}
