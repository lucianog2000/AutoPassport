import Head from 'next/head'
import { Inter } from 'next/font/google'
import Navbar from '@components/components/Navbar'
import HeroSection from '@components/components/HeroSection'
import Footer from '@components/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>AutoPassport</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar/>
        <HeroSection/>
        <Footer/>
      </main>
    </>
  )
}
