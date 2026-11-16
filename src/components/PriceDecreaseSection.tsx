"use client";

import React, { useEffect, useState } from "react";
import { Chip } from "@heroui/react";
import { TrendingDown } from "lucide-react";
import { IProduct } from "@/types/type";
import PriceChangedCard from "./PriceChangedCard";

export default function PriceDecreaseSection() {
  const [topDecreasedItem, setTopDecreasedItem] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);

        if (!res.ok) throw new Error("Failed to fetch products");

        const data: IProduct[] = await res.json();

        const filteredAndSorted = data
          .filter((item) => item.change.dir === "down")
          .sort((a, b) => b.change.pct - a.change.pct)
          .slice(0, 6);

        setTopDecreasedItem(filteredAndSorted);
      } catch (error) {
        console.error("Error loading price decrease data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="w-full bg-[#f8fafc] py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-7 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div className="flex flex-col items-start gap-2">
            <Chip
              size="sm"
              className="flex h-auto items-center gap-1.5 rounded-full bg-[#d1fae5] px-3 py-1 text-xs font-bold text-[#059669]"
            >
              <TrendingDown size={14} className="shrink-0" />
              <span>মূল্য হ্রাস</span>
            </Chip>

            <h2 className="flex items-center gap-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              <span>আজ দাম কমেছে</span>
              <span className="text-xl text-[#10b981] sm:text-2xl">▼</span>
            </h2>

            <p className="text-xs font-medium text-slate-500 sm:text-sm">
              আজ যেসব পণ্যের দাম কমেছে (শীর্ষ ৬টি পণ্য)
            </p>
          </div>

          <span className="text-xs font-medium text-slate-400">
            সর্বোচ্চ হ্রাস অনুযায়ী সাজানো
          </span>
        </div>

        {/* Product Cards */}
        {loading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="h-52 animate-pulse rounded-3xl bg-slate-200/60"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {topDecreasedItem.map((product) => (
              <PriceChangedCard
                key={product.id}
                product={product}
                direction="down"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
