import HeroSection from "@/components/home/HeroSection";
import BlogSection from "@/components/home/BlogSection";
import Loading from "./loading";
import React, { Suspense } from "react";
import { Seo } from "@/components";
import "@/sass/index.scss";
const HomePage = () => {
  return (
    <div>
      <Seo
        data={{
          title: "Sang Home Page",
          description: "This is my Home Page",
          url: process.env.WEB_URL || "",
          thumbnailUrl: "asd",
        }}
      />
      <HeroSection />
      <Suspense fallback={<Loading />}>
        {/* @ts-expect-error */}
        <BlogSection />
      </Suspense>
    </div>
  );
};

export default HomePage;
