"use client"
import React, { useEffect } from 'react'

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard - The right way to learn coding'
  }, [])
  return (
    <div className='dark:bg-dark py-5 bg-gray-50 md:p-4'>
      <div className="max-w-screen-lg min-h-screen mx-auto bg-white dark:text-white dark:bg-black/[0.3]  rounded-lg shadow-md p-6 lg:p-10">
        <h1 className="sm:text-3xl text-center pb-2 border-b text-2xl font-medium title-font dark:text-white text-gray-900 uppercase ">Dashboard</h1>
        <div className='my-4'>

          <p>
            Welcome to the dashboard! We&apos;re thrilled to have you here. This dynamic space is your hub for streamlined navigation, insightful data visualization, and seamless interaction with our platform&apos;s features. Whether you&apos;re managing projects, tracking progress, or exploring new insights, this dashboard is designed to empower you with the tools and information you need to succeed. From monitoring key metrics to accessing personalized recommendations, our goal is to provide you with a user-friendly experience that enhances productivity and facilitates informed decision-making. Dive in, explore, and make the most of your dashboard journey. We&apos;re here to support you every step of the way. Welcome aboard!
          </p>

        </div>
      </div>
    </div>
  )
}

export default Dashboard