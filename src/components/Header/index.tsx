import styles from './styles.module.scss';

export function Header() {
  return(
    <header className={styles.headerContainer}>
      <a href="/">
        <img src="/logo.svg" alt="Marvel" />
      </a>
    </header>
  )
}
