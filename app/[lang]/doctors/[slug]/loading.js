export default function DoctorDetailLoading() {
  return (
    <main className="w-full bg-white animate-pulse">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-8 items-start">
          {/* Photo skeleton */}
          <div className="w-full aspect-[4/5] rounded-3xl bg-gray-200" />

          {/* Info skeleton */}
          <div>
            <div className="h-10 w-3/4 rounded-xl bg-gray-200" />
            <div className="mt-4 h-8 w-48 rounded-full bg-gray-200" />
            <div className="mt-6 space-y-3">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-5/6 rounded bg-gray-200" />
              <div className="h-4 w-4/6 rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />
            </div>
          </div>
        </div>

        {/* CTA skeleton */}
        <div className="mt-10 rounded-2xl bg-gray-100 p-6 sm:p-8 flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-2">
            <div className="h-6 w-56 rounded-lg bg-gray-200" />
            <div className="h-4 w-72 rounded bg-gray-200" />
          </div>
          <div className="h-12 w-40 rounded-xl bg-gray-200" />
        </div>
      </div>
    </main>
  );
}
