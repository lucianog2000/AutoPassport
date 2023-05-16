import Head from 'next/head'
import HomeLayout from '@components/components/Templates/HomeLayout'

export default function Home() {
  return (
    <>
      <Head>
        <title>AutoPassport</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://gateway.pinata.cloud/ipfs/QmP4vAGyez4524ik18ojJAQuKtxkvwmmpA3Dco2f6ovNsy?filename=AutoPassport.png" />
      </Head>
      <main>
        <HomeLayout/>
      </main>
    </>
  )
}
