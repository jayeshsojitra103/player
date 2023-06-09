import '../styles/player.scss';

import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Player from '@/components/player';
import Header from '@/components/Header';
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Player />
      <Component {...pageProps} />
    </>
  )
}
