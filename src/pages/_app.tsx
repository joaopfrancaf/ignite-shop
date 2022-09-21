import { AppProps } from "next/app"
import { globaStyles } from "../styles/global"

import logoimg from '../assests/logo.svg'
import { Container, Header } from "../styles/pages/app";

globaStyles();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <img src={logoimg.src} alt=""/>
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
