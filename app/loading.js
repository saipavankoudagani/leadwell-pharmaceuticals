export default function Loading() {
  return (
    <main
      className="min-h-[75vh] bg-[#f8fbff] px-[5%] py-16"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="mx-auto max-w-7xl">
        {/* Screen-reader status */}

        <p className="sr-only">Loading page content...</p>

        {/* Header skeleton */}

        <div className="mb-14 text-center">
          <div className="mx-auto mb-5 h-8 w-52 animate-pulse rounded-full bg-slate-200" />

          <div className="mx-auto mb-5 h-12 w-full max-w-2xl animate-pulse rounded-2xl bg-slate-200" />

          <div className="mx-auto h-5 w-full max-w-xl animate-pulse rounded-lg bg-slate-200" />
        </div>

        {/* Content skeleton */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <article
              key={index}
              className="overflow-hidden rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm"
            >
              <div className="mb-6 h-56 animate-pulse rounded-[24px] bg-slate-100" />

              <div className="mb-4 h-5 w-28 animate-pulse rounded-full bg-slate-200" />

              <div className="mb-4 h-8 w-3/4 animate-pulse rounded-xl bg-slate-200" />

              <div className="mb-3 h-4 w-full animate-pulse rounded-lg bg-slate-100" />

              <div className="mb-7 h-4 w-5/6 animate-pulse rounded-lg bg-slate-100" />

              <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200" />
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}