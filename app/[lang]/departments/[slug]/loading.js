export default function DepartmentDetailLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 py-10 animate-pulse">
      {/* Back link */}
      <div className="h-4 w-36 rounded bg-gray-200" />

      {/* Hero image skeleton */}
      <div className="mt-4 h-44 sm:h-56 md:h-64 w-full rounded-2xl bg-gray-200" />

      {/* Icon + title */}
      <div className="mt-6 flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gray-200" />
        <div className="h-8 w-56 rounded-lg bg-gray-200" />
      </div>

      {/* Description lines */}
      <div className="mt-5 space-y-2">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-5/6 rounded bg-gray-200" />
        <div className="h-4 w-4/6 rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-3/4 rounded bg-gray-200" />
      </div>

      {/* Doctors heading */}
      <div className="mt-10 h-6 w-52 rounded-lg bg-gray-200" />

      {/* Doctor cards */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-xl border bg-white p-4 shadow-sm space-y-2">
            <div className="h-5 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-1/2 rounded bg-gray-200" />
            <div className="h-40 w-full rounded-lg bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
