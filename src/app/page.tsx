import HeroSection from "@/components/hero-section";
import RecommendedCourses from "@/components/recommended-courses";
import Testimonial from "@/components/testimonial";
import WhoAmI from "@/components/whoami";

export default function Home() {
  return (
    <>
      <HeroSection />
      <RecommendedCourses />
      <WhoAmI />
      <Testimonial />
    </>
  );
}
