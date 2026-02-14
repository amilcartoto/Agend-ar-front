import "../styles/globals.css";
import { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function App({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogin={() => setIsLoggedIn(true)}
      />

      <main className="min-h-screen bg-[#0f172a]">
        <Component {...pageProps} />
      </main>

      <Footer />
    </>
  );
}
