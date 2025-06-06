import { CardGreetings } from "./components/home/card-greetings";
import { CardPopularTags } from "./components/home/card-popular-tags";
import { CardPost } from "./components/home/card-post";
import { CardRules } from "./components/home/card-rules";
import { CardTipWeekly } from "./components/home/card-tip-weekly";

export default function Home() {
  return (
    <div className="h-screen w-screen flex justify-center">
      <div className="max-w-[1600px] w-full h-full grid grid-cols-[250px_1fr_350px] justify-items-center gap-4">
        <div className="w-full max-h-max rounded-md shadow-lg py-6 transition hover:shadow-xl space-y-6">
          <CardGreetings />
          <CardRules />
          <CardPopularTags />
        </div>
        <div className="w-full  rounded-md shadow-lg p-6 transition hover:shadow-xl space-y-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <CardPost key={index} />
          ))}
        </div>
        <div className="w-full  max-h-max rounded-md shadow-lg py-6 transition hover:shadow-xl">
          <CardTipWeekly />
        </div>
      </div>
    </div>
  );
}
