import { Card } from "@heroui/react";

const Footer = () => {
  return (
    <footer className="bg-[#f0f5f0] ">
      <Card className=" border rounded-none  border-[#dce7dd] bg-[#fcfdfc] shadow-none">
        <Card.Content className="container mx-auto flex flex-col items-center justify-between gap-3 px-5 py-5 text-center sm:flex-row sm:text-left">
          {/* Left Side */}
          <p className="text-sm font-medium text-[#39483c]">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>

          {/* Right Side */}
          <p className="text-xs leading-6 text-[#68736b] sm:text-right">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </Card.Content>
      </Card>
    </footer>
  );
};

export default Footer;
