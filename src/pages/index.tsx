import { GetStaticProps } from 'next';
import { api } from '../services/api';
import styles from './home.module.scss';
import Image from 'next/image'; 

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

      <section className="allHeroes">
        <ul>
          {heroes.map(hero => {
            return (
              <li key={hero.id}>
                <a href="#">
                  <Image 
                    width={256} 
                    height={256} 
                    src={hero.thumbnail} 
                    alt={hero.name} 
                    objectFit="cover" 
                  />
                  <div className="overlay">
                    <div className="header">
                      <h2>{hero.name}</h2>
                    </div>
                    <span>Saiba mais ➞</span>
                  </div>
                </a>
              </li>
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