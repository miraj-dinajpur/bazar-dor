import { Card } from "@heroui/react";

const CategoryLoading = () => {
  return (
    <div className="min-h-screen bg-[#f0f5f0]">
      <section className="container mx-auto space-y-6 px-4 py-6 md:px-6">
        {/* Category Header Skeleton */}
        <Card className="rounded-2xl border border-[#dce7dd] bg-[#fcfdfc] shadow-none">
          <Card.Content className="flex flex-row items-center gap-4 p-5">
            <div className="h-14 w-14 animate-pulse rounded-2xl bg-gray-200" />

            <div className="flex-1 space-y-3">
              <div className="h-6 w-36 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-52 animate-pulse rounded bg-gray-200" />
            </div>
          </Card.Content>
        </Card>

        {/* Sorting Skeleton */}
        <Card className="rounded-2xl border border-[#dce7dd] bg-[#fcfdfc] shadow-none">
          <Card.Content className="p-4">
            <div className="flex animate-pulse justify-end">
              <div className="h-10 w-40 rounded-xl bg-gray-200" />
            </div>
          </Card.Content>
        </Card>

        {/* Product Count Skeleton */}
        <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />

        {/* Product Cards Skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card
              key={item}
              className="animate-pulse rounded-2xl border border-[#dce7dd] bg-[#fcfdfc] shadow-none"
            >
              <Card.Content className="p-4 sm:p-5">
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-14 w-14 shrink-0 rounded-2xl bg-gray-200" />

                  <div className="flex-1 space-y-3">
                    <div className="h-5 w-28 rounded bg-gray-200" />
                    <div className="h-4 w-16 rounded bg-gray-200" />
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div className="space-y-2">
                    <div className="h-4 w-20 rounded bg-gray-200" />
                    <div className="h-6 w-28 rounded bg-gray-200" />
                  </div>

                  <div className="h-7 w-16 rounded-full bg-gray-200" />
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoryLoading;
