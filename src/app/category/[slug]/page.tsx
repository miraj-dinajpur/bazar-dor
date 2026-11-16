"use client";
import CategoryLoading from "@/components/CategoryLoading";
import { ICategory, IProduct } from "@/types/type";
import { Card } from "@heroui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryDetailsPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [category, setCategory] = useState<ICategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("default");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products?category=${slug}`,
        );
        const product = await res.json();

        const resCat = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories/${slug}`,
        );
        const category = await resCat.json();

        setProducts(product);
        setCategory(category);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [slug]);

  if (loading) {
    return <CategoryLoading />;
  }

  const sortedProducts = [...products];

  if (sort === "low") {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sort === "high") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  const formatPrice = (price: number) => price.toLocaleString("bn-BD");

  if (!category) {
    return (
      <>
        <h2>Category is not Available </h2>
        <Link href={"/"}>Go to Homepage</Link>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <section className="container mx-auto space-y-6 px-4 py-6 md:px-6">
        {/* Category Header */}
        <Card className="rounded-2xl border border-[#dce7dd] bg-[#fcfdfc] shadow-none">
          <Card.Content className="flex flex-row items-center gap-4 p-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0] text-4xl">
              {category.icon}
            </div>

            <div>
              <h1 className="text-2xl font-extrabold text-[#202b23]">
                {category.nameBn}
              </h1>
              <p className="mt-1 text-sm text-[#68736b]">
                {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </Card.Content>
        </Card>

        {/* Sorting */}
        <Card className="rounded-2xl border border-[#dce7dd] bg-[#fcfdfc] shadow-none">
          <Card.Content className="p-4">
            <div className="flex w-full justify-end items-center gap-3">
              <span className="text-sm text-[#68736b]">সাজান</span>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border border-[#cfd9d0] bg-transparent px-3 py-2 text-sm text-[#202b23] outline-none"
              >
                <option value="default">ফিচার্ড</option>
                <option value="low">দাম: কম থেকে বেশি</option>
                <option value="high">দাম: বেশি থেকে কম</option>
              </select>
            </div>
          </Card.Content>
        </Card>

        {/* Product Count */}
        <p className="text-sm text-[#68736b]">
          মোট {products.length}টি পণ্য দেখানো হচ্ছে
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => {
            const isUp = product.change.dir === "up";
            const isDown = product.change.dir === "down";

            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="block"
              >
                <Card className="h-full rounded-2xl border border-[#dce7dd] bg-[#fcfdfc] shadow-none transition-all duration-200 hover:-translate-y-1 hover:border-[#a9c3ac] hover:shadow-sm">
                  <Card.Content className="p-4 sm:p-5">
                    {/* Product Information */}
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0] text-3xl">
                        {product.image}
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-[#202b23]">
                          {product.nameBn}
                        </h3>

                        <p className="text-sm text-[#68736b]">
                          প্রতি{" "}
                          {product.unit === "kg"
                            ? "কেজি"
                            : product.unit === "litre"
                              ? "লিটার"
                              : product.unit === "dozen"
                                ? "ডজন"
                                : "পিস"}
                        </p>
                      </div>
                    </div>

                    {/* Today's Price */}
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <p className="mb-1 text-sm text-[#68736b]">আজকের দাম</p>

                        <p className="text-xl font-extrabold text-[#202b23]">
                          {formatPrice(product.today)}{" "}
                          <span className="text-sm font-medium">টাকা</span>
                        </p>
                      </div>

                      {/* Price Change */}
                      <div
                        className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${
                          isUp
                            ? "bg-[#fdf0ef] text-red-500"
                            : isDown
                              ? "bg-[#edf7ef] text-green-600"
                              : "bg-[#f0f5f0] text-slate-600"
                        }`}
                      >
                        {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                        {Math.abs(product.change.pct).toFixed(1)}%
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default CategoryDetailsPage;
