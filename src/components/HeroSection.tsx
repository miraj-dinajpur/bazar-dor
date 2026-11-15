"use client";

import Image from "next/image";
import { Button, Card } from "@heroui/react";
import Link from "next/link";


const HeroSection = () => {
  return (
    <div className="bg-[#f0f5f0]">
      <section className="container mx-auto px-4 py-5 md:px-6">
        <Card className="rounded-[28px] border border-[#dce7dd] bg-[#fcfdfc] shadow-none">
          <Card.Content className="p-6 sm:p-8 lg:px-10 lg:py-9">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1.2fr_0.8fr] lg:gap-10">
              {/* Left Content */}
              <div className="flex flex-col items-start">
                <span className="mb-5 inline-flex items-center rounded-full bg-[#e5f1e7] px-5 py-2.5 text-base font-semibold text-[#07883e]">
                  রবিবার, ১৫ নভেম্বর, ২০২৬
                </span>

                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-[#17221a] sm:text-4xl lg:text-[42px]">
                  আজকের বাজারের দাম এক নজরে
                </h1>

                <p className="mb-7 max-w-2xl text-base leading-relaxed text-[#68736b] lg:text-lg">
                  চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
                  বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক
                  জায়গায়।
                </p>

                <Link href={"#allproducts"}>
                  <Button
                    size="lg"
                    variant="primary"
                    onPress={() => {
                      document
                        .getElementById("products")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="h-14 rounded-xl bg-[#07883e] px-7 text-base font-bold text-white shadow-md hover:bg-[#067535]"
                  >
                    সব পণ্য দেখুন
                  </Button>
                </Link>
                
              </div>

              {/* Right Image */}
              <div className="flex items-center justify-center">
                <Image
                  src="/asset/bazar-hero.png"
                  alt="বাজারের পণ্যের ঝুড়ি"
                  width={450}
                  height={400}
                  priority
                  className="h-auto w-full max-w-[400px] object-contain"
                />
              </div>
            </div>
          </Card.Content>
        </Card>
      </section>
    </div>
  );
};

export default HeroSection;
