import HeroSection from "@/components/home/HeroSection";
import BlogSection from "@/components/home/BlogSection";
import React, { Suspense } from "react";
import "@/sass/index.scss";
const HomePage = () => {
  return (
    <div className="mb-14 lg:mb-2">
      <HeroSection />
      <Suspense
        fallback={<div>Loading ...</div>}
      >
        {/* @ts-expect-error */}
        <BlogSection />
      </Suspense>
    </div>
  );
};

export default HomePage;
