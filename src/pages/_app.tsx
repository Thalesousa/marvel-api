import {AppProps} from 'next/app';
import { Header } from '../components/Header';
import styles from '../styles/app.module.scss';
import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  )
}

export default MyApp
