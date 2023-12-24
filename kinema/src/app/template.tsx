import Footer from "./components/footer";
import Navbar from "./components/navbar";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full bg-white">
      <Navbar />

      {children}
      <Footer></Footer>
    </div>
  );
}
