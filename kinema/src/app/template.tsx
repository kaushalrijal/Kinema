"use client";

import Footer from "./components/footer";
import Navbar from "./components/navbar";
import { NextUIProvider } from "@nextui-org/react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full bg-white">
      <NextUIProvider>
        <Navbar />
        {children}
        <Footer></Footer>
      </NextUIProvider>
    </div>
  );
}
