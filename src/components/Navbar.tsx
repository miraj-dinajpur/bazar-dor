"use client";

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  ProgressCircle,
  Separator,
} from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import { ICategory } from "@/types/type";
import { CircleUserRound, SquareArrowRightExit } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const [categories, setCategories] = useState<ICategory[]>([]);

  // Current date in Bangla
  const formattedDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        );

        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const { data, isPending } = useSession();
//   console.log("Session Data:", data);
  
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FBFDFB] border-b border-[#E5EBE5]">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Top Navbar */}
        <div className="flex items-center justify-between py-3.5">
          {/* Logo and Date */}
          <div className="flex flex-col gap-1.5">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              {/* Logo Icon */}
              <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#078A43] text-white text-2xl">
                🛒
              </span>

              {/* Brand Name */}
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#202B24]">
                বাজার দর
              </span>
            </Link>

            {/* Date */}
            <div className="flex items-center gap-1.5 text-xs text-[#68746B] font-medium">
              <span>🗓️</span>
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-2">
            {isPending ? (
              <ProgressCircle aria-label="Loading" value={60}>
                <ProgressCircle.Track>
                  <ProgressCircle.TrackCircle />
                  <ProgressCircle.FillCircle />
                </ProgressCircle.Track>
              </ProgressCircle>
            ) : data?.user ? (
              /* Logged In User */
              <Dropdown>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-2 py-1.5 h-auto rounded-xl hover:bg-[#F0F5F0]"
                >
                  <Avatar className="w-10 h-10">
                    <Avatar.Image
                      src={data.user.image || ""}
                      alt={data.user.name}
                    />
                    <Avatar.Fallback>
                      {data.user.name?.charAt(0).toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar>

                  <span className="hidden sm:block text-sm font-semibold text-[#253129]">
                    {data.user.name}
                  </span>

                  <span className="text-xs text-[#758078]">▾</span>
                </Button>

                <Dropdown.Popover>
                  <Dropdown.Menu>
                    <Dropdown.Item id="dataicons">
                      <div className="text-xs text-green-950 font-semibold border rounded-xl p-2">
                        <h2>{data.user.name}</h2>
                        <p>{data.user.email}</p>
                      </div>
                    </Dropdown.Item>

                    <Dropdown.Item id="profile">
                      <Link href="/profile" className="w-full">
                        <div className="flex gap-2 text-blue-900 font-semibold">
                          <CircleUserRound />
                          প্রোফাইল
                        </div>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item id="signout">
                      <div className="flex gap-2 text-red-900 font-bold">
                        <SquareArrowRightExit />
                        <button onClick={handleSignOut}>সাইন আউট</button>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            ) : (
              /* Logged Out User */
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="text-sm font-semibold text-[#253129] hover:text-[#078A43] px-2 py-2 transition-colors"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  className="text-sm font-semibold text-white bg-[#078A43] hover:bg-[#067638] px-4 py-2.5 rounded-lg transition-colors"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <Separator className="w-full bg-[#E8EDE8]" />

        {/* Category Navigation */}
        <nav
          aria-label="Category Navigation"
          className="flex items-center  gap-6 sm:gap-9 py-3 overflow-x-auto no-scrollbar"
        >
          {categories.map((cat) => {
            const isActive =
              pathname === `/${cat.slug}` ||
              pathname === `/category/${cat.slug}`;

            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`flex items-center gap-1.5 whitespace-nowrap text-xs sm:text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#078A43] font-bold"
                    : "text-[#253129] hover:text-[#078A43]"
                }`}
              >
                <span className="text-base leading-none">{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
