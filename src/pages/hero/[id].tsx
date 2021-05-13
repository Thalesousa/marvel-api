import { GetServerSideProps } from "next";
import { api } from "../../services/api";
import styles from './styles.module.scss';
import Head from 'next/head';

type HeroMarvel= {
  name: string;
  description: string;
  thumbnail: string;
}

type HeroProps ={
  hero: HeroMarvel,
}

export default function Hero({ hero }: HeroProps) {
  return (
    <>
      <Head>
        <title>Marvel - {hero.name}</title>
      </Head>
      <div className={styles.heroContainer}>
        <article>
          <h1>{hero.name}</h1>
          {hero.description ? (
            <p>{hero.description}</p>
          ) : (
            <p>Sem descrição</p>
          )}
          
        </article>
        <img src={hero.thumbnail} alt={hero.name} />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const {data} = await api.get(`/characters/${id}`)
  const {results} = data.data

  const hero = {
    name: results[0].name,
    description: results[0].description,
    thumbnail: results[0].thumbnail.path + '.' + results[0].thumbnail.extension
  }
  
  return {
    props: {hero},
  }
}