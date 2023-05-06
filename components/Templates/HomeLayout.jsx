import React from 'react'
import Navbar from '../Organisms/Navbar'
import HeroSection from '../Organisms/HeroSection'
import Technology from '../Organisms/Technology'
import Footer from '../Organisms/Footer'

export default function HomeLayout() {
  return (
    <>
      <Navbar/>
      <HeroSection/>
      <Technology/>
      <Footer/>
    </>
  )
}
