import { api } from '../services/api';

export default function Home({data}) {
  return(
    <>
      <h1>Marvel</h1>
      <p>{JSON.stringify(data.data.results)}</p>
    </>
  )
}
export async function getServerSideProps() {
  const response = await api.get('/characters')
  const data = await response.data.json()

  return {
    props: {
      data
    }
  }
}