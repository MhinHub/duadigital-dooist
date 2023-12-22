import Welcome from "@/components/Welcome";
import { NextSeo } from "next-seo";

export default function WelcomePage() {
  return (
    <>
      <NextSeo
        title="Welcome to Easy Peasy TodoList | Dooist"
        description="Welcome to Dooist"
      />
      <Welcome />
    </>
  );
}
