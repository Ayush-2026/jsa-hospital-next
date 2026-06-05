export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div
        className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
        style={{ borderColor: "#1e7a62 transparent #2c608e transparent" }}
      />
      <p className="text-sm font-semibold tracking-wide" style={{ color: "#1e7a62" }}>
        Loading…
      </p>
    </div>
  );
}
