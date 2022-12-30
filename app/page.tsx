import HeroSection from "@/components/home/HeroSection";
import BlogSection from "@/components/home/BlogSection";
import Loading from "./loading";
import React, { Suspense } from "react";
import "@/sass/index.scss";
const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Suspense fallback={<Loading />}>
        {/* @ts-expect-error */}
        <BlogSection />
      </Suspense>
    </div>
  );
};

export default HomePage;
