import React from 'react'
import Navbar from '../Organisms/Navbar'
import Footer from '../Organisms/Footer'
import TokenCreationForm from '../Organisms/TokenCreationForm'

export default function TokenCreationLayout() {
  return (
    <>
      <Navbar/>
      <TokenCreationForm/>
      <Footer/>
    </>
  )
}