import { Card } from "@heroui/react";
import type { IProduct } from "@/types/type";
import Link from "next/link";

interface Props {
  product: IProduct;
  direction: "up" | "down";
}

const PriceChangedCard = ({ product, direction }: Props) => {
  const isUp = direction === "up";

  const unit =
    product.unit === "kg"
      ? "প্রতি কেজি"
      : product.unit === "dozen"
        ? "প্রতি ডজন"
        : product.unit === "piece"
          ? "প্রতি পিস"
          : product.unit === "litre"
            ? "প্রতি লিটার"
            : `প্রতি ${product.unit}`;

  return (
    <Link href={`${process.env.NEXT_PUBLIC_API_URL}/products/${product.id}`}>
      <Card className="rounded-[20px] border border-[#dce7dd] bg-[#fcfdfc] shadow-none">
        <Card.Content className="p-5">
          {/* Product Information */}
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0] text-3xl">
              {product.image}
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#17221a]">
                {product.nameBn}
              </h3>

              <p className="text-sm text-[#68736b]">{unit}</p>
            </div>
          </div>

          {/* Today's Price */}
          <div className="flex items-end justify-between">
            <div>
              <p className="mb-1 text-sm text-[#68736b]">আজকের দাম</p>

              <p className="text-xl font-extrabold text-[#17221a]">
                {product.today} টাকা
              </p>
            </div>

            {/* Price Change */}
            <div
              className={`rounded-full px-3 py-1.5 text-sm font-bold ${
                isUp
                  ? "bg-[#f0f5f0] text-red-500"
                  : "bg-[#f0f5f0] text-green-600"
              }`}
            >
              {isUp ? "▲" : "▼"} {Math.abs(product.change.pct).toFixed(1)}%
            </div>
          </div>
        </Card.Content>
      </Card>
    </Link>
  );
};

export default PriceChangedCard;
