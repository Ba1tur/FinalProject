import Head from 'next/head'
import Image from 'next/image'
import Regis from './Regis/Regis'
import Login from './Login/Login'
import Main from './Main/Main'


export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main/>
      {/* <Regis/> */}
      {/* <Login/> */}
    </>
  )
}
