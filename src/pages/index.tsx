import { useEffect, useState } from 'react';
import { CardItem } from '../components/CardItem';
import { api } from '../services/api';
import styles from './home.module.scss';

type Hero = {
  id: string;
  name: string;
  thumbnail: {
    path: string;
    extension: string
  };
}

export default function Home() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    async function loadProducts() {
      const response = await api.get(`/characters`, {
        params: {
          offset,
        }
      })
      setHeroes(response.data.data.results)
    }

    loadProducts();
  }, [offset]);


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

// export  const getStaticProps: GetStaticProps = async () => {
  // const {data} = await api.get('/characters')
