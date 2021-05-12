import { useEffect, useState, FormEvent } from 'react';
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
  const [newHero, setNewHero] = useState('');
  const [inputError, setInputError] = useState('');

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
    if (!newHero) {
      loadCharacters();
    }
  }, [offset]);

  async function handleSearchHeroes(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    if (!newHero) {
      setInputError('Digite o nome do personagem');
      return;
    }
    try {
      const response = await api.get(`/characters`, {
        params: {
          nameStartsWith: newHero,
          limit: 100,
        }
      });

      setInputError('');
      setHeroes(response.data.data.results)
      setTotal(response.data.data.total)
      
    } catch (error) {
      setInputError(`Erro na busca por esse repositório`);
    }
  }

  function handleNextPage(){
    setOffset(offset + limit)
  }

  function handlePreviousPage(){
    setOffset(offset - limit)
  }

  return(
    <div className={styles.homepage}>
      <section className={styles.allHeroes}>
        <form onSubmit={handleSearchHeroes}>
          <input 
            type="text" 
            placeholder="Digite o nome do personagem" 
            value={newHero}
            onChange={(e) => setNewHero(e.target.value)}
          />
          <button type="submit">
            <img src="./search_icon.svg" alt="search icon" />
          </button>
          {inputError && <span>{inputError}</span>}
        </form>
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

        {!newHero && (
          <div className={styles.pagination}>
          {offset <= 0 ? (
            <button disabled>Previous</button>
          ): (
            <button onClick={handlePreviousPage}>Previous</button>
          )}

          {offset > total-limit ? (
            <button disabled>Next</button>
          ):(
            <button onClick={handleNextPage}>Next</button>
          )}
        </div>
        )}
        
      </section>
    </div>
  )
}