"use client";

import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Chip } from "@heroui/react";
import Link from "next/link";
import { IProduct } from "@/types/type";

const API_URL = "YOUR_API_URL";

export default function Marque() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products`,
        );
        const data: IProduct[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full bg-white text-black flex items-center h-11 overflow-hidden border-b border-slate-200">
      <Marquee
        pauseOnHover={true}
        speed={45}
        gradient={false}
        className="flex items-center h-full overflow-hidden"
      >
        {products.map((item) => {
          const isUp = item.change.dir === "up";
          const isDown = item.change.dir === "down";

          return (
            <Link
              key={item.id}
              href={`/product/${item.slug}`}
              className="flex items-center gap-2 mx-3 px-3 py-1 rounded-lg hover:bg-slate-800/80 transition-colors whitespace-nowrap text-xs sm:text-sm"
            >
              {/* Product Icon */}
              <span className="text-base leading-none">{item.image}</span>

              {/* Product Name */}
              <span className="font-bold text-white">{item.nameBn}</span>

              {/* Category */}
              <span className="text-slate-900 text-xs">
                ({item.categoryNameBn})
              </span>

              {/* Today's Price */}
              <span className="font-bold text-blue-500">
                {item.today} টাকা/{item.unit === "kg" ? "কেজি" : "লিটার"}
              </span>

              {/* Price Change */}
              <Chip
                size="sm"
                className={`px-2 py-0.5 h-5 rounded-full text-[11px] font-bold flex items-center gap-0.5 ${
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
            </Link>
          );
        })}
      </Marquee>
    </div>
  );
}
