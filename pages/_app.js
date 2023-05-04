import '@components/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from '@components/components/Navbar'

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
