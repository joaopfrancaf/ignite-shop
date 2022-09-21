import { AppProps } from "next/app"
import { globaStyles } from "../styles/global"

import logoimg from '../assests/logo.svg'
import { Container, Header } from "../styles/pages/app";

import Image from 'next/future/image'

globaStyles();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoimg} alt=""/>
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
