'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'
import ReactPlayer from 'react-player'
import trpc from 'trpc'

export default function MoviePage({
  params: { id },
}: {
  params: { id: string | undefined }
}) {
  const router = useRouter()

  const { data, error, isLoading } = trpc.getMovie.useQuery({
    movieId: id as string,
  })

  useEffect(() => {
    if (!id) {
      router.push('/') // redirect to / if no id is found
    }
  }, [id, router])

  if (isLoading) {
    return (
      <div className='flex h-screen flex-col items-center justify-center'>
        <h1 className='text-3xl font-bold'>Loading...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex h-screen flex-col items-center justify-center'>
        <h1 className='text-3xl font-bold'>Error</h1>
        <p className='text-lg'>{error.message}</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className='flex h-screen flex-col items-center justify-center'>
        <h1 className='text-3xl font-bold'>404 - Not Found</h1>
        <p className='text-lg'>The movie you are looking for does not exist.</p>
      </div>
    )
  }

  const { movie, trailers } = data

  return (
    <div className='flex flex-col items-center justify-center py-10'>
      <h1 className='mb-4 text-4xl font-bold'>{movie.title}</h1>
      <p className='mb-4 text-lg'>{movie.overview}</p>

      <div className='flex flex-wrap justify-center'>
        {trailers && trailers?.length > 0 ? (
          trailers?.map((trailer) => (
            <div key={trailer.id} className='m-4'>
              <h3 className='mb-2 text-xl font-semibold'>{trailer.name}</h3>

              <ReactPlayer
                url={`https://www.youtube.com/embed/${trailer.key}`}
                controls={true}
              />
            </div>
          ))
        ) : (
          <p>No trailers available.</p>
        )}
      </div>
    </div>
  )
}
