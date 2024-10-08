'use client'

import trpc from 'trpc'

import CardMovie from '@/components/card-movie'

import { Movie } from '@/types'

export default function Home() {
  const { isLoading, data } = trpc.getMovies.useQuery()

  if (isLoading) return <div>Loading...</div>

  return (
    <div className='py-10'>
      <h4 className='pb-4 text-lg font-semibold'>Popular movies</h4>
      <div className='grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-8'>
        {data?.results?.map((movie: Movie, i: number) => (
          <CardMovie key={i} movie={movie} />
        ))}
      </div>
    </div>
  )
}
