import React from 'react'
import Navbar from '../Organisms/Navbar'
import Footer from '../Organisms/Footer'
import TokenViewForm from '../Organisms/TokenViewForm'

export default function TokenCreationLayout() {
  return (
    <>
      <Navbar/>
      <TokenViewForm/>
      <Footer/>
    </>
  )
}