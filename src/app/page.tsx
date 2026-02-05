import HeroSection from "@/components/hero-section";
import RecommendedCourses from "@/components/recommended-courses";
import Testimonial from "@/components/testimonial";
import WhoAmI from "@/components/whoami";
import LatestBlogs from "@/components/latest-blogs";
import { LatestBlogsSkeleton } from "@/components/latest-blogs-skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<LatestBlogsSkeleton />}>
        <LatestBlogs />
      </Suspense>
      <RecommendedCourses />
      <WhoAmI />
      <Testimonial />
    </>
  );
}
