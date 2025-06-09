export function EditFormSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 bg-zinc-700 rounded w-1/3" />

      <div className="space-y-5">
        <div className="space-y-2">
          <div className="h-4 bg-zinc-700 rounded w-1/4" />
          <div className="h-10 bg-zinc-800 rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-zinc-700 rounded w-1/4" />
          <div className="h-10 bg-zinc-800 rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-zinc-700 rounded w-1/4" />
          <div className="h-10 bg-zinc-800 rounded" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="h-6 bg-zinc-700 rounded w-1/3" />
        <div className="space-y-2">
          <div className="h-4 bg-zinc-700 rounded w-1/4" />
          <div className="h-10 bg-zinc-800 rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-zinc-700 rounded w-1/4" />
          <div className="h-10 bg-zinc-800 rounded" />
        </div>
        <div className="h-4 bg-zinc-700 rounded w-3/4" />
      </div>

      <div className="h-10 bg-violet-700 rounded" />
    </div>
  );
}
