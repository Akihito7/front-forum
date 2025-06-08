export function PostSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 w-1/3 bg-zinc-700 rounded-md" />

      <div className="space-y-2">
        <div className="h-4 w-1/4 bg-zinc-700 rounded" />
        <div className="h-12 w-full bg-zinc-800 rounded-md" />
      </div>

      <div className="space-y-2">
        <div className="h-4 w-1/4 bg-zinc-700 rounded" />
        <div className="h-48 w-full bg-zinc-800 rounded-md" />
      </div>

      <div className="space-y-2">
        <div className="h-4 w-1/4 bg-zinc-700 rounded" />
        <div className="flex gap-2">
          <div className="h-12 w-full bg-zinc-800 rounded-md" />
          <div className="h-12 w-24 bg-violet-800 rounded-md" />
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-20 bg-violet-900 rounded-md" />
          <div className="h-8 w-16 bg-violet-900 rounded-md" />
        </div>
      </div>

      <div className="h-12 w-40 bg-violet-700 rounded-md" />
    </div>
  );
}
