"use client";
import { useEffect, useState } from "react";

export default function Carrito() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCount(storedCart.length);
  }, []);

  return (
    <button className="relative text-gray-300 hover:text-white transition">
      🛒
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#2dd4bf] text-black text-xs px-2 rounded-full">
          {count}
        </span>
      )}
    </button>
  );
}
