import HeroSection from "@/components/hero-section";
import RecommendedCourses from "@/components/recommended-courses";
import Testimonial from "@/components/testimonial";
import WhoAmI from "@/components/whoami";
import LatestBlogs from "@/components/latest-blogs";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LatestBlogs />
      <RecommendedCourses />
      <WhoAmI />
      <Testimonial />
    </>
  );
}
