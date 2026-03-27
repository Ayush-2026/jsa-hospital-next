export default function DoctorsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8 py-10 animate-pulse">
      <div className="h-9 w-44 rounded-lg bg-gray-200" />
      <div className="mt-2 h-4 w-72 rounded bg-gray-200" />

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-3">
            <div className="w-full aspect-[4/5] rounded-xl bg-gray-200" />
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-3 w-1/2 rounded bg-gray-200" />
            <div className="h-9 w-full rounded-xl bg-gray-200 mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
