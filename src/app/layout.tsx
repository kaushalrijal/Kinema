import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next"

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata = {
  title: "Kinema — Cinema as it should be",
  description: "Discover, explore, and fall in love with movies and series. A beautiful, modern streaming experience.",
  openGraph: {
    title: "Kinema — Cinema as it should be",
    description: "Discover, explore, and fall in love with movies and series. A beautiful, modern streaming experience.",
    url: "https://kinematv.vercel.app",
    siteName: "Kinema",
    locale: "en_US",
    type: "website",
  },
  canonical: "https://kinematv.vercel.app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Kinema",
              "url": "https://kinematv.vercel.app",
              "description": "Discover, explore, and fall in love with movies and series. A beautiful, modern streaming experience.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://kinematv.vercel.app/search?query={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${poppins.variable} font-poppins bg-[var(--color-bg)] text-[var(--color-text)] dark:bg-[var(--color-bg-dark)] dark:text-[var(--color-text-light)] min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 flex flex-col justify-start">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
