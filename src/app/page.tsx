"use client"
import React, { useEffect } from 'react'
import RecommendedCourses from '@/components/RecommendedCourses';
import WhoAmI from '@/components/WhoAmI';
import HeroSection from '@/components/HeroSection';
import Testimonial from '@/components/Testimonial';
import SecondHero from '@/components/SecondHero';

const Home = () => {
  useEffect(() => {
    document.title = "Home | The Right Way To Learn Coding"
  }, [])

  return (
    <>
      <HeroSection />
      <RecommendedCourses />
      <SecondHero/>
      <WhoAmI />
      <Testimonial />
    </>
  )
}

export default Home