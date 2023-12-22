import Welcome from "@/components/Welcome";
import { NextSeo } from "next-seo";

export default function WelcomePage() {
  return (
    <>
      <NextSeo
        title="Welcome to Easy Peasy TodoList | Dooit"
        description="Welcome to Dooit"
      />
      <Welcome />
    </>
  );
}
