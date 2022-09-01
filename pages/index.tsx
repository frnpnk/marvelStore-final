import type { NextPage } from 'next'
import Head from 'next/head'
import BodySingle from "../components/layouts/body/single/body-single";

const Home: NextPage = () => {
  return (
      <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BodySingle title={"Sample"}>
      </BodySingle>
    </>
  )
}

export default Home