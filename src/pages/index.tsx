import { useEffect, useState } from 'react';
import Link from 'next/link';
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
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadCharacters() {
      const response = await api.get(`/characters`, {
        params: {
          offset,
          limit,
        }
      })
      setHeroes(response.data.data.results)
      setTotal(response.data.data.total)
    }

    loadCharacters();
  }, [offset]);

  function handleNextPage(){
    setCurrentPage(currentPage + 1)
    setOffset(offset + limit)
  }


  return(
    <div className={styles.homepage}>
      <section className={styles.allHeroes}>
        <ul>
          {heroes.map(hero => {
            return (
              <Link href={`/hero/${hero.id}`} key={hero.id}>
                <a>
                  <CardItem hero={hero} />
                </a>
              </Link>
            )
          })}
        </ul>

        <div className={styles.pagination}>
          <button>Previous</button>
          <button onClick={handleNextPage}>Next</button>
        </div>
      </section>
    </div>
  )
}