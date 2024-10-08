'use client'

import Image from 'next/image'
import Link from 'next/link'
import trpc from 'trpc'

import { Movie } from '@/types'

const imgBasePath = process.env.NEXT_PUBLIC_TMDB_IMG_URL

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export default function Home() {
  const { isLoading, data } = trpc.getMovies.useQuery()

  if (isLoading) return <div>Loading...</div>

  return (
    <div className='py-10'>
      <h4 className='pb-4 text-lg font-semibold'>Popular movies</h4>
      <div className='grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-8'>
        {data?.results?.map((movie: Movie, i: number) => (
          <Link
            href={`/movie/${movie?.id}`}
            key={i}
            className='group relative duration-200 hover:scale-105'
          >
            <Image
              src={`${imgBasePath}/${movie?.poster_path}`}
              alt={movie?.title}
              width={200}
              height={400}
              className='h-auto w-full'
              priority={false}
              placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            />

            <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent px-4 pb-1 pt-6'>
              <p>{movie?.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
