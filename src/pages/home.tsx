import Home from "@/components/Home";
import { NextSeo } from "next-seo";

export default function HomePage() {
  return (
    <>
      <NextSeo title="Home | Dooit" description="Create your todo list" />
      <Home />
    </>
  );
}
