import React from 'react'
import Navbar from '../Organisms/Navbar'
import Footer from '../Organisms/Footer'
import TokenUpdateForm from '../Organisms/TokenUpdateForm'

export default function TokenCreationLayout() {
  return (
    <>
      <Navbar/>
      <TokenUpdateForm/>
      <Footer/>
    </>
  )
}