import Home from "@/components/Home";
import { NextSeo } from "next-seo";

export default function HomePage() {
  return (
    <article className="duration-700 animate-in fade-in-10">
      <NextSeo title="Home | Dooist" description="Create your todo list" />
      <Home />
    </article>
  );
}
