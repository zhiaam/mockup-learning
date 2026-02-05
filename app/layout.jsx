import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://domainanda.com"),
  title: {
    default: "Platform Belajar Online",
    template: "%s | Platform Belajar Online",
  },
  description:
    "Belajar skill teknologi dengan materi sederhana dan terstruktur.",
  openGraph: {
    title: "Platform Belajar Online",
    description:
      "Belajar skill teknologi dengan materi sederhana dan terstruktur.",
    url: "https://domainanda.com",
    siteName: "Platform Belajar Online",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Belajar online",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Platform Belajar Online",
    description:
      "Belajar skill teknologi dengan materi sederhana dan terstruktur.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-[#FFF8EE] text-gray-800">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
