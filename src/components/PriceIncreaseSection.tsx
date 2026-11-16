"use client";

import React, { useEffect, useState } from "react";
import { Chip } from "@heroui/react";
import { TrendingUp } from "lucide-react";
import { IProduct } from "@/types/type";
import PriceChangedCard from "./PriceChangedCard";

export default function PriceIncreaseSection() {
  const [topIncreasedItem, setTopIncreasedItem] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);

        if (!res.ok) throw new Error("Failed to fetch products");

        const data: IProduct[] = await res.json();

        const filteredAndSorted = data
          .filter((item) => item.change.dir === "up")
          .sort((a, b) => b.change.pct - a.change.pct)
          .slice(0, 6);

        setTopIncreasedItem(filteredAndSorted);
      } catch (error) {
        console.error("Error loading price increase data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="w-full py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-7 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div className="flex flex-col items-start gap-2">
            <Chip
              size="sm"
              className="flex h-auto items-center gap-1.5 rounded-full bg-[#ffe4e6] px-3 py-1 text-xs font-bold text-[#e11d48]"
            >
              <TrendingUp size={14} className="shrink-0" />
              <span>মূল্য বৃদ্ধি</span>
            </Chip>

            <h2 className="flex items-center gap-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              <span>আজ দাম বেড়েছে</span>
              <span className="text-xl text-[#ef4444] sm:text-2xl">▲</span>
            </h2>

            <p className="text-xs font-medium text-slate-500 sm:text-sm">
              আজ যেসব পণ্যের দাম বেড়েছে (শীর্ষ ৬টি পণ্য)
            </p>
          </div>

          <span className="text-xs font-medium text-slate-400">
            সর্বোচ্চ বৃদ্ধি অনুযায়ী সাজানো
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
            {topIncreasedItem.map((product) => (
              <PriceChangedCard
                key={product.id}
                product={product}
                direction="up"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
