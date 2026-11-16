import { Button, Card } from "@heroui/react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-[#f0f5f0] px-4 py-10">
      <Card className="w-full max-w-xl !rounded-2xl border border-[#dce7dd] bg-[#fcfdfc] shadow-none">
        <Card.Content className="flex flex-col items-center px-6 py-12 text-center sm:px-10">
          {/* 404 Illustration */}
          <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-[#edf5ed] text-7xl">
            🛒
          </div>

          {/* Error Code */}
          <h1 className="text-7xl font-black tracking-tight text-[#355e3b] sm:text-8xl">
            404
          </h1>

          {/* Message */}
          <h2 className="mt-5 text-2xl font-extrabold text-[#202b23]">
            পেজটি খুঁজে পাওয়া যায়নি!
          </h2>

          <p className="mt-3 max-w-sm text-sm leading-7 text-[#68736b]">
            দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না। পেজটি সরানো হতে
            পারে অথবা ঠিকানাটি ভুল হতে পারে।
          </p>

          {/* Homepage Button */}
          <Link href="/">
            <Button className="mt-8 rounded-xl bg-[#355e3b] px-7 py-3 font-semibold text-white transition-colors hover:bg-[#284a2e]">
              <span>←</span>
              হোমপেজে ফিরে যান
            </Button>
          </Link>

          <p className="mt-6 text-xs text-[#9aa59b]">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </Card.Content>
      </Card>
    </div>
  );
};

export default NotFound;
