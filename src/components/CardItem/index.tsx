import Image from 'next/image'; 
import styles from './styles.module.scss';


export function CardItem({hero}) {
  return (
    <li key={hero.id} className={styles.card}>
      <a href="#">
        <Image
          width={256}
          height={256}
          src={hero.thumbnail}
          alt={hero.name}
          objectFit="cover"
        />
        <div className={styles.overlay}>
          <div className={styles.header}>
            <h2>{hero.name}</h2>
          </div>
          <span>Saiba mais ➞</span>
        </div>
      </a>
    </li>
  )
}