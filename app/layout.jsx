import { DM_Sans, Barlow } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dmSans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

/* =========================
   SEO METADATA (GLOBAL)
========================= */
export const metadata = {
  title: {
    default: "PT. Benny Group",
    template: "%s | PT. Benny Group",
  },
  description:
    "PT. Benny Group adalah grup perusahaan Indonesia yang bergerak di berbagai sektor usaha dengan komitmen profesionalisme dan keberlanjutan.",
  keywords: [
    "PT Benny Group",
    "Benny Group",
    "Perusahaan Indonesia",
    "Holding Company",
    "Jasa Profesional",
  ],
  authors: [{ name: "PT. Benny Group" }],
  creator: "PT. Benny Group",
  metadataBase: new URL("https://bennygroup.co.id"),

  openGraph: {
    title: "PT. Benny Group",
    description:
      "Grup perusahaan Indonesia dengan beragam lini usaha dan komitmen profesional.",
    url: "https://bennygroup.co.id",
    siteName: "PT. Benny Group",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "PT. Benny Group",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "PT. Benny Group",
    description:
      "Grup perusahaan Indonesia dengan beragam lini usaha dan komitmen profesional.",
    images: ["/assets/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${dmSans.variable} ${barlow.variable} antialiased`}>
        <Header />
        {children}
        <Footer />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "PT. Benny Group",
              url: "https://bennygroup.co.id",
              logo: "https://bennygroup.co.id/assets/logo.png",
              sameAs: [
                "https://facebook.com",
                "https://instagram.com",
                "https://linkedin.com",
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jl. Contoh Raya No. 123",
                addressLocality: "Jakarta",
                addressCountry: "ID",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
