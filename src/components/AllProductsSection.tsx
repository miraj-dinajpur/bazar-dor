"use client";

import React, { useEffect, useState } from "react";
import { Chip } from "@heroui/react";
import { TrendingUp } from "lucide-react";
import { IProduct } from "@/types/type";
import PriceChangedCard from "./PriceChangedCard";

export default function PriceIncreaseSection() {
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: IProduct[] = await res.json();

        setAllProducts(data);
      } catch (error) {
        console.error("Error loading all products data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <section id="allproducts" className="w-full  py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-7 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div className="flex flex-col items-start gap-2">
            <span className=" gap-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              সব পণ্য
            </span>

            <p className="text-xs font-medium text-slate-500 sm:text-sm">
              {`মোট ${allProducts.length}টি পণ্য দেখানো হচ্ছে`}
            </p>
          </div>
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
            {allProducts.map((product) => (
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
