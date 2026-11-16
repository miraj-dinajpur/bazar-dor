const HomeLoading = () => {
  return (
    <div className="min-h-screen animate-pulse space-y-10 bg-[#f0f5f0] px-4 py-6">
      {/* Hero Section Skeleton */}
      <section className="container mx-auto">
        <div className="flex flex-col items-center justify-between gap-8 rounded-2xl bg-[#fcfdfc] p-6 md:flex-row md:p-10">
          <div className="w-full space-y-5 md:w-1/2">
            <div className="h-8 w-3/4 rounded-lg bg-gray-200" />
            <div className="h-5 w-full rounded bg-gray-200" />
            <div className="h-5 w-4/5 rounded bg-gray-200" />
            <div className="h-11 w-36 rounded-xl bg-gray-200" />
          </div>

          <div className="h-52 w-full rounded-2xl bg-gray-200 md:h-64 md:w-1/2" />
        </div>
      </section>

      {/* Price Increase & Decrease Skeleton */}
      {[1, 2].map((section) => (
        <section key={section} className="container mx-auto space-y-5">
          <div className="h-7 w-48 rounded bg-gray-200" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[#dce7dd] bg-[#fcfdfc] p-5"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-14 w-14 rounded-2xl bg-gray-200" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 w-28 rounded bg-gray-200" />
                    <div className="h-4 w-20 rounded bg-gray-200" />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="h-6 w-24 rounded bg-gray-200" />
                  <div className="h-7 w-16 rounded-full bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* All Products Skeleton */}
      <section className="container mx-auto space-y-5">
        <div className="h-7 w-40 rounded bg-gray-200" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[#dce7dd] bg-[#fcfdfc] p-5"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="h-14 w-14 rounded-2xl bg-gray-200" />
                <div className="flex-1 space-y-3">
                  <div className="h-5 w-28 rounded bg-gray-200" />
                  <div className="h-4 w-20 rounded bg-gray-200" />
                </div>
              </div>

              <div className="flex justify-between">
                <div className="h-6 w-24 rounded bg-gray-200" />
                <div className="h-7 w-16 rounded-full bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeLoading;
