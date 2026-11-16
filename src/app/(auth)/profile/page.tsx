"use client";

import React from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Label,
  TextField,
  ProgressCircle,
} from "@heroui/react";
import { useSession, updateUser, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ArrowLeftRight } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const user = session?.user;

  // Update Profile
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const name = (data.name as string).trim();

    if (!name) {
      toast.error("নাম লিখুন");
      return;
    }

    if (name === user?.name) {
      toast.error("নামে কোনো পরিবর্তন করা হয়নি");
      return;
    }

    const { error } = await updateUser({
      name: name,
    });

    if (error) {
      toast.error(error.message || "Profile update failed");
      return;
    }

    toast.success("Profile Updated");
  };


  const handleSignOut = async () => {
    const { error } = await signOut();

    if (error) {
      toast.error("Sign out failed");
      return;
    }

    toast.success("Successfully signed out");
    router.push("/signin");
  };


  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F5F0]">
        <ProgressCircle aria-label="Loading" isIndeterminate>
          <ProgressCircle.Track>
            <ProgressCircle.TrackCircle />
            <ProgressCircle.FillCircle />
          </ProgressCircle.Track>
        </ProgressCircle>
      </div>
    );
  }


  if (!user) {
    router.push("/signin");
    return null;
  }

  return (
    <main className="min-h-screen bg-[#F0F5F0] px-4 py-10 sm:py-14">
      <div className="max-w-[850px] mx-auto space-y-7">
        {/* Profile Heading */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202B24]">
            আমার প্রোফাইল
          </h1>

          <p className="text-sm text-[#758078]">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Profile Information Card */}
        <Card className="w-full rounded-[20px] border border-[#DFE7DF] bg-[#FBFCFB] shadow-none p-5 sm:p-7">
          <Card.Content className="flex flex-col sm:flex-row items-center gap-5">
            {/* User Image */}
            <div className="relative w-[92px] h-[92px] shrink-0 overflow-hidden rounded-[20px] bg-[#F0F1F0] flex items-center justify-center">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  fill
                  sizes="92px"
                  className="object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-[#078A43]">
                  {(user.name || "U").charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            {/* User Details */}
            <div className="flex-1 text-center sm:text-left space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-[#202B24]">
                {user.name || "ব্যবহারকারী"}
              </h2>

              <p className="text-sm sm:text-base text-[#758078]">
                {user.email}
              </p>
            </div>

            {/* Sign Out */}
            <Button
              type="button"
              variant="outline"
              onPress={handleSignOut}
              className="h-11 px-5 rounded-xl border border-red-500 bg-transparent text-red-500 hover:bg-red-50 font-semibold text-sm"
            >
              <ArrowLeftRight size={17} />
              সাইন আউট
            </Button>
          </Card.Content>
        </Card>

        {/* Update Information Card */}
        <Card className="w-full rounded-[20px] border border-[#DFE7DF] bg-[#FBFCFB] shadow-none p-5 sm:p-6">
          <Card.Content className="flex flex-col gap-5">
            <h3 className="text-lg font-bold text-[#253129]">তথ্য</h3>

            <Form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 px-1 sm:px-6"
            >
              {/* Name Field */}
              <TextField
                key={user.name || "user-name"}
                name="name"
                type="text"
                isRequired
                defaultValue={user.name || ""}
                className="flex flex-col gap-2 w-full"
              >
                <Label className="text-sm font-medium text-[#253129]">
                  নাম
                </Label>

                <Input
                  placeholder="আপনার নাম লিখুন"
                  className="w-full h-12 px-3.5 rounded-xl border border-[#DFE7DF] bg-transparent text-sm text-[#26332A] placeholder:text-[#89928B] focus:border-[#078A43] focus:outline-none transition-colors"
                />
              </TextField>

              {/* Update Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-full h-12 mt-0.5 rounded-xl bg-[#078A43] hover:bg-[#067638] text-white font-semibold text-sm shadow-[0_3px_4px_rgba(0,100,40,0.25)] transition-colors"
              >
                আপডেট
              </Button>
            </Form>
          </Card.Content>
        </Card>
      </div>
    </main>
  );
};

export default ProfilePage;
