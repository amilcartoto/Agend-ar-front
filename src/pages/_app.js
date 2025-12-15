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

      <main className="pt-28 min-h-screen bg-[#1e293b]">
        <Component {...pageProps} />
      </main>

      <Footer />
    </>
  );
}
