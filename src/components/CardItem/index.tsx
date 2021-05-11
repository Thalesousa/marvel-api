import styles from './styles.module.scss';


export function CardItem({hero}) {
  return (
    <li key={hero.id} className={styles.card}>
        <img
          src={hero.thumbnail.path +'.'+ hero.thumbnail.extension}
          alt={hero.name}
        />
        <div className={styles.overlay}>
          <div className={styles.header}>
            <h2>{hero.name}</h2>
          </div>
          <span>Saiba mais ➞</span>
        </div>
    </li>
  )
}