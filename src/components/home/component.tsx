"use client";

import { CardGreetings } from "./card-greetings";
import { CardPopularPosts } from "./card-popular-posts";
import { CardPopularTags } from "./card-popular-tags";
import { CardRules } from "./card-rules";
import { CardTipWeekly } from "./card-tip-weekly";
import { ListPost } from "./list-post";

export function HomeComponent() {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-[1600px] w-full h-full grid grid-cols-[250px_1fr_350px] justify-items-center gap-4">
        <div className="w-full max-h-max rounded-md shadow-lg py-6 transition hover:shadow-xl space-y-6">
          <CardGreetings />
          <CardRules />
          <CardPopularTags />
        </div>
        <ListPost />
        <div className="w-full  max-h-max rounded-md shadow-lg py-6 transition hover:shadow-xl space-y-6">
          <CardTipWeekly />
          <CardPopularPosts />
        </div>
      </div>
    </div>
  );
}
