import React from 'react'
import Navbar from '../Organisms/Navbar'
import Footer from '../Organisms/Footer'
import SignUpForm from '../Organisms/SignUpForm'

export default function SignUpLayout() {
  return (
    <>
      <Navbar/>
      <SignUpForm />
      <Footer/>
    </>
  )
}