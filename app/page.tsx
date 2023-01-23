import HeroSection from "@/components/home/HeroSection";
import BlogSection from "@/components/home/BlogSection";
import React, { Suspense } from "react";
import "@/sass/index.scss";
const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Suspense
        fallback={<div className="text-dracula-light">Loading ...</div>}
      >
        {/* @ts-expect-error */}
        <BlogSection />
      </Suspense>
    </div>
  );
};

export default HomePage;
