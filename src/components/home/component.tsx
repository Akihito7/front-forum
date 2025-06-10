"use client";
import { useFeed } from "@/app/(home)/hooks/use-feed";
import { CardGreetings } from "./card-greetings";
import { CardPopularPosts } from "./card-popular-posts";
import { CardPopularTags } from "./card-popular-tags";
import { CardPost } from "./card-post";
import { CardRules } from "./card-rules";
import { CardTipWeekly } from "./card-tip-weekly";

export function HomeComponent() {
  const { posts, tip } = useFeed();

  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-[1600px] w-full h-full grid grid-cols-[250px_1fr_350px] justify-items-center gap-4">
        <div className="w-full max-h-max rounded-md shadow-lg py-6 transition hover:shadow-xl space-y-6">
          <CardGreetings />
          <CardRules />
          <CardPopularTags />
        </div>
        <div className="w-full rounded-md shadow-lg p-6 transition hover:shadow-xl space-y-4">
          {posts && posts.length > 0 ? (
            posts.map((post: any) => <CardPost key={post.id} {...post} />)
          ) : (
            <p className="text-zinc-400 text-center">Nenhum post encontrado.</p>
          )}
        </div>
        <div className="w-full  max-h-max rounded-md shadow-lg py-6 transition hover:shadow-xl space-y-6">
          {tip && <CardTipWeekly tip={tip} />}
          <CardPopularPosts />
        </div>
      </div>
    </div>
  );
}
