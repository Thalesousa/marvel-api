import { GetStaticProps } from 'next';
import { CardItem } from '../components/CardItem';
import { api } from '../services/api';
import styles from './home.module.scss';

type Hero = {
  id: string;
  name: string;
  thumbnail: string;
}

type HomeProps = {
  heroes: Hero[]
}

export default function Home({ heroes }: HomeProps) {
  return(
    <div className={styles.homepage}>

      <section className={styles.allHeroes}>
        <ul>
          {heroes.map(hero => {
            return (
              <CardItem hero={hero} />
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export  const getStaticProps: GetStaticProps = async () => {
  const {data} = await api.get('/characters')
  
  const {results} = data.data

  const heroes = results.map(hero => {
    return {
      id: hero.id,
      name: hero.name,
      thumbnail: hero.thumbnail.path + '.' + hero.thumbnail.extension
    }
  })

  return {
    props: {
      heroes
    }
  }
}