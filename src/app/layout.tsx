import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export const metadata = {
  title: "Kinema — Cinema as it should be",
  description: "Discover, explore, and fall in love with movies and series. A beautiful, modern streaming experience.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[var(--color-bg)] text-[var(--color-text)] dark:bg-[var(--color-bg-dark)] dark:text-[var(--color-text-light)] min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col justify-start">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
