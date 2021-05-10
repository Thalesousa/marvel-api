import styles from './styles.module.scss';


export function Header() {
  return(
    <header className={styles.headerContainer}>
      <img src="/logo.svg" alt="Marvel" />
    </header>
  )
}
