import '@/styles/globals.css'
import '../styles/player.scss';
import '../styles/demo.scss';
import '../styles/control-panel.css';
import '../styles/slider.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
