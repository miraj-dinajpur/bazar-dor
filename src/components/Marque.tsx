"use client";

import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Chip } from "@heroui/react";
import { IProduct } from "@/types/type";

export default function Marque() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        const data: IProduct[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex h-11 w-full items-center overflow-hidden border-b border-slate-200 bg-white text-black">
      <Marquee
        pauseOnHover={true}
        speed={45}
        gradient={false}
        className="flex h-full items-center overflow-hidden"
      >
        {products.map((item) => {
          const isUp = item.change.dir === "up";
          const isDown = item.change.dir === "down";

          return (
            <div
              key={item.id}
              className="mx-3 flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-1 text-xs transition-colors hover:bg-slate-100 sm:text-sm"
            >
              <span className="text-base leading-none">{item.image}</span>

              <span className="font-bold text-slate-900">{item.nameBn}</span>

              <span className="text-xs text-slate-500">
                ({item.categoryNameBn})
              </span>

              <span className="font-bold text-blue-500">
                {item.today} টাকা/{item.unit === "kg" ? "কেজি" : "লিটার"}
              </span>

              <Chip
                size="sm"
                className={`flex h-5 items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                  isUp
                    ? "bg-[#ffe4e6] text-[#e11d48]"
                    : isDown
                      ? "bg-[#d1fae5] text-[#059669]"
                      : "bg-slate-200 text-slate-700"
                }`}
              >
                {isUp && "▲ "}
                {isDown && "▼ "}
                {!isUp && !isDown && "— "}
                {Math.abs(item.change.pct).toFixed(1)}%
              </Chip>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
}
