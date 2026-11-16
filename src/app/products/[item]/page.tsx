

import { Card } from "@heroui/react";
import type { IProduct } from "@/types/type";
import Link from "next/link";
import { Home } from "lucide-react";


const ProductDetails = async({ params }: { params: Promise<{ item: string }> }) => {
  
    const { item } = await params;
    let product: IProduct | null = null;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${item}`,
        { cache: "no-store" },
      );
      if (res.ok) {
        product = await res.json();
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }

    const formatPrice = (price: number) =>
    price.toLocaleString("bn-BD", {
      maximumFractionDigits: 1,
    });

    if (!product) {
      return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center space-y-4">
          <span className="text-6xl block">🗺️</span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            No Products Found
          </h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Please Contact With Boss
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>হোম পেজে ফিরে যান</span>
            </Link>
          </div>
        </div>
      );
    }

  const minPrice = Math.min(...product.markets.map((market) => market.min));

  const maxPrice = Math.max(...product.markets.map((market) => market.max));

  const averagePrice =
    product.markets.reduce(
      (total, market) => total + (market.min + market.max) / 2,
      0,
    ) / product.markets.length;

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const priceDifference = product.today - product.yesterday;

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <section className="container mx-auto space-y-6 px-4 py-6 md:px-6">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#68736b]">
          <span>হোম</span>
          <span>›</span>
          <span>{product.categoryNameBn}</span>
          <span>›</span>
          <span className="font-medium text-[#202b23]">{product.nameBn}</span>
        </div>

        {/* item Header */}
        <Card className="rounded-[24px] border border-[#dce7dd] bg-[#fcfdfc] shadow-none">
          <Card.Content className="p-5 sm:p-7">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0] text-4xl">
                  {product.image}
                </div>

                <div>
                  <h1 className="text-2xl font-extrabold text-[#202b23] sm:text-3xl">
                    {product.nameBn}
                  </h1>

                  <p className="mt-1 text-sm text-[#68736b]">
                    প্রতি {product.unit === "kg" ? "কেজি" : "লিটার"} ·{" "}
                    {product.categoryNameBn}
                  </p>

                  <p className="mt-3 text-sm text-[#202b23]">
                    গতকালের তুলনায় আজ দাম{" "}
                    <span
                      className={`font-bold ${
                        isUp
                          ? "text-red-500"
                          : isDown
                            ? "text-green-600"
                            : "text-slate-600"
                      }`}
                    >
                      {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত"}
                    </span>
                    {priceDifference !== 0 &&
                      ` · ${formatPrice(Math.abs(priceDifference))} টাকা`}
                  </p>
                </div>
              </div>

              {/* Today's Price */}
              <div className="w-full rounded-2xl bg-[#f0f5f0] px-7 py-4 text-center sm:w-auto sm:min-w-[140px]">
                <p className="text-sm text-[#68736b]">আজকের দাম</p>

                <h2 className="text-4xl font-extrabold text-[#202b23]">
                  {formatPrice(product.today)}
                </h2>

                <p className="text-sm text-[#68736b]">
                  টাকা / {product.unit === "kg" ? "কেজি" : "লিটার"}
                </p>

                <p
                  className={`mt-2 text-sm font-bold ${
                    isUp
                      ? "text-red-500"
                      : isDown
                        ? "text-green-600"
                        : "text-slate-500"
                  }`}
                >
                  {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                  {product.change.pct.toFixed(1)}%
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Price Summary */}
        <Card className="rounded-[24px] border border-[#dce7dd] bg-[#fcfdfc] shadow-none">
          <Card.Content className="space-y-7 p-5 sm:p-7">
            <div>
              <h2 className="mb-4 text-lg font-bold text-[#202b23]">
                দামের সারসংক্ষেপ
              </h2>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#dce7dd] p-5">
                  <p className="text-sm text-[#68736b]">সর্বনিম্ন দাম</p>
                  <h3 className="mt-1 text-2xl font-extrabold text-green-600">
                    {formatPrice(minPrice)}{" "}
                    <span className="text-base font-medium">টাকা</span>
                  </h3>
                  <p className="mt-1 text-xs text-[#68736b]">
                    সবচেয়ে কম দামের বাজার
                  </p>
                </div>

                <div className="rounded-2xl border border-[#dce7dd] p-5">
                  <p className="text-sm text-[#68736b]">সর্বাধিক দাম</p>
                  <h3 className="mt-1 text-2xl font-extrabold text-red-500">
                    {formatPrice(maxPrice)}{" "}
                    <span className="text-base font-medium">টাকা</span>
                  </h3>
                  <p className="mt-1 text-xs text-[#68736b]">
                    সবচেয়ে বেশি দামের বাজার
                  </p>
                </div>

                <div className="rounded-2xl border border-[#dce7dd] p-5">
                  <p className="text-sm text-[#68736b]">গড় দাম</p>
                  <h3 className="mt-1 text-2xl font-extrabold text-green-600">
                    {formatPrice(averagePrice)}{" "}
                    <span className="text-base font-medium">টাকা</span>
                  </h3>
                  <p className="mt-1 text-xs text-[#68736b]">
                    প্রতি {product.unit === "kg" ? "কেজি" : "লিটার"}-এর হিসাবে
                  </p>
                </div>
              </div>
            </div>

            {/* Market-wise Price Table */}
            <div>
              <h2 className="mb-4 text-lg font-bold text-[#202b23]">
                বাজারভিত্তিক আজকের দাম
              </h2>

              <div className="overflow-x-auto rounded-2xl border border-[#dce7dd]">
                <table className="w-full min-w-[650px] border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#f0f5f0] text-[#68736b]">
                      <th className="px-4 py-4 text-left font-semibold">
                        বাজার
                      </th>
                      <th className="px-4 py-4 text-left font-semibold">
                        বিভাগ
                      </th>
                      <th className="px-4 py-4 text-right font-semibold">
                        সর্বনিম্ন
                      </th>
                      <th className="px-4 py-4 text-right font-semibold">
                        সর্বাধিক
                      </th>
                      <th className="px-4 py-4 text-right font-semibold">গড়</th>
                    </tr>
                  </thead>

                  <tbody>
                    {product.markets.map((market, index) => {
                      const marketAverage = (market.min + market.max) / 2;

                      return (
                        <tr
                          key={`${market.market}-${index}`}
                          className={`border-t border-[#dce7dd] text-[#202b23] ${
                            index % 2 === 1 ? "bg-[#f0f5f0]" : "bg-[#fcfdfc]"
                          }`}
                        >
                          <td className="px-4 py-4 font-medium">
                            {market.market}
                          </td>
                          <td className="px-4 py-4">{market.division}</td>
                          <td className="px-4 py-4 text-right">
                            {formatPrice(market.min)} টাকা
                          </td>
                          <td className="px-4 py-4 text-right">
                            {formatPrice(market.max)} টাকা
                          </td>
                          <td className="px-4 py-4 text-right font-bold">
                            {formatPrice(marketAverage)} টাকা
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </Card.Content>
        </Card>
      </section>
    </div>
  );
};

export default ProductDetails;
